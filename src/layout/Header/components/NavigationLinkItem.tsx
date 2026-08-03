import {
  type ComponentType,
  type JSX,
  type MouseEvent,
  type ReactNode,
} from 'react';
import Button from '@mui/material/Button';

/**
 * Structural contract defining interface configurations for an individual header navigation link element.
 */
interface NavigationLinkItemProps {
  /** Primary human-readable navigation label displayed to the operator */
  readonly displayLabel: string;
  /** Router-managed abstraction component wrapping the operational navigation target anchor link */
  readonly LinkComponent: ComponentType<{
    /** Explicit render prop function passing router runtime flags to children UI */
    readonly children: (
      /** Contextual snapshot parameter tracking real-time client routing state positions */
      props: {
        /** Reactive status flag confirming if the application url exactly matches this target item pathway */
        readonly isActive: boolean;
      }
    ) => ReactNode;
    /** Optional cascading style layout overrides assigned by the parent tree orchestration layer */
    readonly className?: string;
  }>;
  /** SHARED performance layout cache referencing child element focus and active state styling overrides */
  readonly sharedActionStyles: {
    /** Case transformation indicator controlling title capitalization formatting metrics */
    readonly textTransform: 'none';
    /** Typography weight modifier scale mapped to structural fonts layouts */
    readonly fontWeight: number;
    /** Corner rounding quotient enforced across standard interface components buttons */
    readonly borderRadius: number;
    /** Standard text color hex value applied to inactive buttons options */
    readonly color: string;
    /** Multi-axis structural layout margins dictionary driving adaptive spacing metrics */
    readonly px: {
      /** Base tracking spacing metric allocated to narrow viewport profiles */
      readonly xs: number;
      /** Wide tracking spacing metric scaling layout margins on wide viewport screens */
      readonly sm: number;
    };
    /** Sub-component structural layer overrides injected during active layout matching states */
    readonly '&.active': {
      /** Target active state color indicator overriding core palette selections */
      readonly color: string;
      /** Background layer highlight tint indicating the operational viewport match route */
      readonly bgcolor: string;
    };
    /** Accessibility overlay styling maps injected strictly during explicit keyboard tab passes */
    readonly '&.Mui-focusVisible': {
      /** Dynamic outline border structure rendering around high-visibility keyboard indicators */
      readonly outline: string;
      /** Color code override allocated strictly to keyboard driven outline parameters */
      readonly outlineColor: string;
      /** Safe offset layout boundary spacing standard outline indicators back from text flows */
      readonly outlineOffset: number;
    };
  };
}

/**
 * Isolated structural view snippet rendering a standardized accessible Material UI routing anchor button.
 */
export const NavigationLinkItem = ({
  displayLabel,
  LinkComponent,
  sharedActionStyles,
}: NavigationLinkItemProps): JSX.Element => {
  const handleDisabledClickIntercept = (
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
