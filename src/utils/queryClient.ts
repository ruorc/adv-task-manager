import { QueryClient } from '@tanstack/react-query';

/**
 * Global high-performance query client instance managing asynchronous cache state boundaries.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /** Avoid aggressive background re-fetching to maintain layout stability */
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
