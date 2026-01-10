import { useCallback, useTransition } from 'react';
import { useNavigate, NavigateOptions, To } from 'react-router-dom';

/**
 * Hook that wraps useNavigate with startTransition
 * Prevents navigation from blocking user input
 * Zero visual change - same navigation, better responsiveness
 */
export const useDeferredNavigation = () => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const deferredNavigate = useCallback(
    (to: To, options?: NavigateOptions) => {
      startTransition(() => {
        navigate(to, options);
      });
    },
    [navigate]
  );

  return {
    navigate: deferredNavigate,
    isPending,
  };
};

/**
 * Simple wrapper for navigate that uses startTransition
 * Use when you don't need isPending state
 */
export const useTransitionNavigate = () => {
  const navigate = useNavigate();
  const [, startTransition] = useTransition();

  return useCallback(
    (to: To, options?: NavigateOptions) => {
      startTransition(() => {
        navigate(to, options);
      });
    },
    [navigate]
  );
};

export default useDeferredNavigation;
