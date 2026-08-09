import {
  type ComponentType,
  type JSX,
  type MouseEvent,
  type ReactNode,
} from 'react';
import Button from '@mui/material/Button';
import { type SxProps, type Theme } from '@mui/material';

/**
 * Contextual state parameters tracked during real-time client 
 * routing position changes.
 */
interface RouterLinkStateProps {
  /** Reactive status flag confirming if the application URL matches this item pathway. */
  readonly isActive: boolean;
}

/**
 * Custom properties accepted by the internal structural routing wrapper 
 * component element.
 */
interface NavigationLinkComponentProps {
  /** Explicit render prop function passing router runtime flags to children UI. */
  readonly children: (
    /** Contextual snapshot parameter tracking real-time client routing state positions. */
    props: RouterLinkStateProps
  ) => ReactNode;
  /** Optional cascading style layout overrides assigned by the parent tree orchestration layer. */
  readonly className?: string;
}

/**
 * Structural communication contract specifying configurations for rendering 
 * an individual header navigation anchor element.
 */
interface NavigationLinkItemProps {
  /** Primary human-readable navigation label or complex rich React node displayed to the operator. */
  readonly displayLabel: ReactNode;
  /** Router-managed abstraction component wrapping the operational navigation target anchor link. */
  readonly LinkComponent: ComponentType<NavigationLinkComponentProps>;
  /** System style overrides and layout design system attributes passed to the underlying button. */
  readonly sharedActionStyles: SxProps<Theme>;
}

/**
 * Isolated structural view snippet rendering a standardized accessible Material UI routing anchor button.
 * Intercepts navigation actions when the targeted route matches the current operational path context.
 */
export const NavigationLinkItem = ({
  displayLabel,
  LinkComponent,
  sharedActionStyles,
}: NavigationLinkItemProps): JSX.Element => {
  /**
   * Interception proxy preventing redundant routing re-triggers and default anchor behaviors
   * when the navigation item represents the currently active viewport destination.
   */
  const handleDisabledClickIntercept = (
    /** Synthetic mouse event object intercepted during click execution passes */
    event: MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <LinkComponent>
      {({ isActive }) => (
        <Button
          variant="text"
          disabled={isActive}
          onClick={isActive ? handleDisabledClickIntercept : undefined}
          sx={{
            ...sharedActionStyles,
            '&.Mui-disabled': {
              color: 'primary.main',
              bgcolor: 'action.selected',
              fontWeight: 700,
              pointerEvents: 'none',
              cursor: 'default',
            },
          }}
        >
          {displayLabel}
        </Button>
      )}
    </LinkComponent>
  );
};
