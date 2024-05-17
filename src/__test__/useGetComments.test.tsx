import { expect, test, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import useGetComments from '../hooks/Comment/useGetComments';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: false,
    },
  },
});

test('gives an empty list with no postId provided', async () => {
  const { result } = renderHook(() => useGetComments(), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });
  const { data, isLoading } = result.current;

  expect(data).toHaveLength(0);
  expect(isLoading).toBe(true);
});

const commentsList = [
  { id: 1, comment: '안녕' },
  { id: 2, comment: '안녕2' },
];

vi.mock('../api/Comment/apiComment', async () => {
  return {
    fetchComments: () => commentsList,
  };
});

test('gives back comments when given an postId', async () => {
  const { result } = renderHook(() => useGetComments(), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });
  await waitFor(() => expect(result.current.status).toBe('success'));

  const { data } = result.current;
  expect(data).toEqual(commentsList);
});
