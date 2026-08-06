import {
  useState,
  useEffect,
  useMemo,
  type RefObject,
  type JSX,
  type MouseEvent,
} from 'react';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

/**
 * Structural contract defining anchor tracking nodes for viewport boundary transitions.
 */
interface ScrollToTopProps {
  /** Immutable reference pointing to the DOM node acting as the top visibility trigger */
  readonly targetRef: RefObject<HTMLElement | null>;
}

/**
 * Universal Shared High-Performance Anchor Component.
 * Leverages native IntersectionObserver API to safely trigger visibility state transitions
 * without polluting the main execution thread with continuous synchronous scroll event listeners.
 */
export const ScrollToTop = ({ targetRef }: ScrollToTopProps): JSX.Element => {
  const [isAnchorVisible, setIsAnchorVisible] = useState(false);

  useEffect(() => {
    const triggerElement = targetRef.current;

    if (!triggerElement) return;

    const observerOptions = {
      root: null,
      threshold: 0,
    };

    const handleViewportIntersection = (
      entries: readonly IntersectionObserverEntry[]
    ): void => {
      const [entry] = entries;

      if (entry) {
        setIsAnchorVisible(!entry.isIntersecting);
      }
    };

    const intersectionObserver = new IntersectionObserver(
      handleViewportIntersection,
      observerOptions
    );

    intersectionObserver.observe(triggerElement);

    return () => {
      intersectionObserver.unobserve(triggerElement);
      intersectionObserver.disconnect();
    };
  }, [targetRef]);

  const handleSmoothScrollExecution = (
    event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ): void => {
    (event.currentTarget as HTMLElement).blur();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const inertAttributes = useMemo(() => {
    return !isAnchorVisible ? { inert: true } : {};
  }, [isAnchorVisible]);

  return (
    <Zoom in={isAnchorVisible}>
      <Fab
        onClick={handleSmoothScrollExecution}
        color="primary"
        size="small"
        aria-label="Scroll back to global application navigation apex"
        tabIndex={isAnchorVisible ? 0 : -1}
        {...inertAttributes}
        sx={{
          position: 'fixed',
          bottom: { xs: 20, sm: 32 },
          right: { xs: 20, sm: 32 },
          zIndex: (theme) => theme.zIndex.speedDial,
          boxShadow: 3,
          '&.Mui-focusVisible': {
            outline: '3px solid',
            outlineColor: 'primary.dark',
            outlineOffset: 2,
          },
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};
