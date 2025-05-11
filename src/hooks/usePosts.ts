import { useQuery } from '@tanstack/react-query';
import { postService } from '../services/api';

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: postService.getPosts,
  });
} 