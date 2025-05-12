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

export function useUpdatePost(id: string | number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof postService.updatePost>[1]) => 
      postService.updatePost(id, data),
    onSuccess: (updatedPost) => {
      // Atualiza o cache do post específico
      queryClient.setQueryData(['post', id], updatedPost);
      
      // Atualiza o cache da listagem de posts
      queryClient.setQueryData<Post[]>(['posts'], (oldPosts) => {
        if (!oldPosts) return [updatedPost];
        return oldPosts.map(post => 
          post.id_postagem === updatedPost.id_postagem ? updatedPost : post
        );
      });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postService.deletePost,
    onSuccess: (_, deletedId) => {
      // Invalida o cache do post específico
      queryClient.invalidateQueries({ queryKey: ['post', deletedId] });
      
      // Remove o post da listagem em cache
      queryClient.setQueryData<Post[]>(['posts'], (oldPosts) => {
        if (!oldPosts) return [];
        return oldPosts.filter(post => post.id_postagem !== Number(deletedId));
      });
    },
  });
} 