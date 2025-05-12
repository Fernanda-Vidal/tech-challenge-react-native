import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { postService } from '../services/api';
import type { Post } from '../types';

export function usePost(id: string | number) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['post', id],
    queryFn: () => postService.getPostById(id),
    initialData: () => {
      // Tenta recuperar o post do cache da listagem
      const posts = queryClient.getQueryData<Post[]>(['posts']);
      return posts?.find(post => post.id_postagem === id);
    },
  });
}

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: postService.getPosts,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postService.createPost,
    onSuccess: (newPost) => {
      // Atualiza o cache da listagem de posts
      queryClient.setQueryData<Post[]>(['posts'], (oldPosts) => {
        if (!oldPosts) return [newPost];
        return [...oldPosts, newPost];
      });
    },
  });
} 