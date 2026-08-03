/**
 * Static internationalization text token dictionary resource.
 * Serves as the single comprehensive source of truth for semantic application prose strings.
 */
export const APPLICATION_LOCALE = Object.freeze({
  auth: {
    welcome: (operatorName: string) => `Welcome back, ${operatorName}!`,
    goodbye: 'Session terminated successfully. Goodbye!',
    accessibility: {
      closeModal: 'Close authentication dialog',
    },
    fields: {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email address',
      password: 'Secure password',
      confirmPassword: 'Confirm password',
    },
    texts: {
      SUBMIT_PROCESSING: 'Processing request...',
      SUBMIT_LOGIN: 'Login',
      SUBMIT_REGISTER: 'Create Account',
      TOGGLE_PROMPT_REGISTER: 'Already hold an active identity? ',
      TOGGLE_PROMPT_LOGIN: 'New to our tracking platform? ',
      ERROR_MATCH:
        'The validation credential confirmation matrix does not match.',
      ERROR_EMAIL_ALLOCATED:
        'The specified email identity address is already allocated.',
      ERROR_INVALID_CREDENTIALS: 'Invalid transactional credentials supplied.',
      ERROR_GENERIC:
        'An unhandled error degraded the security transport stream.',
      LOGGER_SIGN_UP:
        'User identity records established via email sign-up matrix with extended profiles',
      LOGGER_SIGN_IN:
        'User credentials validated successfully via cloud auth engine',
      LOGGER_ERROR: 'Firebase cloud identity interaction failure intercepted',
    },
  },
  theme: {
    updated: (themeMode: string) => `Theme preference updated to: ${themeMode}`,
    labels: {
      light: 'Light',
      dark: 'Dark',
      colorful: 'Colorful',
      system: 'System',
    },
  },
  snack: {
    accessibility: {
      region: 'System Notifications',
      dismiss: 'Dismiss notification',
    },
  },
  confirmModal: {
    closeModal: 'Close confirmation dialog',
    defaultLabels: {
      CONFIRM: 'Confirm',
      CANCEL: 'Cancel',
    },
  },
  ui: {
    loaderLabel:
      'Synchronizing system matrix architecture data, please remain active',
    scrollToTopLabel: 'Scroll back to global application navigation apex',
    sidebar: {
      accessibility: {
        navigation: 'Workspace boards navigation structure',
      },
    },
    header: {
      accessibility: {
        openSidebar: 'Open sidebar workspace boards menu',
        logoLabel: 'Global application navigation apex',
      },
      account: {
        welcomeUser: (name: string) => `Welcome, ${name}`,
        welcomeGuest: 'Welcome, Guest',
        logout: 'Logout',
        login: 'Login',
      },
      navigation: {
        accessibility: {
          primary: 'Primary Application Navigation',
        },
      },
      themeSelector: {
        accessibility: {
          openMenu: 'Open visual interface theme configuration menu',
        },
      },
    },
  },
  pages: {
    authWall: {
      title: 'Authentication Required',
      description:
        'You have encountered a protected workspace domain checkpoint. Sign in to your active supervisor profile or register a decentralized identity node to synchronize task tracking streams.',
      buttons: {
        signIn: 'Sign In Profile',
        register: 'Create Account',
      },
    },
    notFound: {
      title: 'Page Not Found',
      description:
        'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
      backHomeButtonLabel: 'Back to Dashboard',
    },
  },
} as const);
