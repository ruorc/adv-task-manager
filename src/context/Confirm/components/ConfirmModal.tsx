import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';

/**
 * Structural communication contract defining data properties required to render the confirmation dialog.
 */
interface ConfirmModalProps {
  /** Reactive state flag determining if the overlay view is visible */
  readonly isOpen: boolean;
  /** Primary semantic text rendered as the structural header */
  readonly title: string;
  /** Textual description contextualizing the action */
  readonly description: string;
  /** Interactive action title for the confirm trigger */
  readonly confirmLabel?: string;
  /** Cancellation title for the fallback trigger */
  readonly cancelLabel?: string;
  /** Callback executed on affirmative action confirmation */
  readonly onConfirm: () => void;
  /** Callback executed on dialog dismissal or cancellation */
  readonly onClose: () => void;
  /** Theme vector flag routing layout styles to critical palettes */
  readonly isDanger?: boolean;
}

/**
 * Universal Shared Asynchronous Confirm Modal Component.
 */
export const ConfirmModal = ({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onClose,
  isDanger = false,
}: ConfirmModalProps) => {
  const color = isDanger ? 'error' : 'primary';

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(4px)',
          },
        },
        paper: {
          sx: {
            position: 'relative',
            borderRadius: 3.5,
            p: 1,
            boxShadow: 24,
            backgroundImage: 'none',
          },
        },
      }}
    >
      <IconButton
        aria-label="Close confirmation dialog"
        onClick={onClose}
        size="small"
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          color: 'text.disabled',
          '&:hover': { color: 'text.primary' },
        }}
      >
        <CloseIcon sx={{ fontSize: 18 }} />
      </IconButton>

      <Box sx={{ display: 'flex', gap: 2.5, pt: 3, px: 3, pb: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 1.5,
            borderRadius: 2.5,
            flexShrink: 0,
            bgcolor: `${color}.shimmer`,
            color: `${color}.main`,
          }}
        >
          <WarningAmberIcon sx={{ fontSize: 26 }} />
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <DialogTitle
            sx={{
              p: 0,
              fontWeight: 800,
              fontSize: '1.15rem',
              letterSpacing: '-0.02em',
              mb: 1,
            }}
          >
            {title}
          </DialogTitle>

          <DialogContent sx={{ p: 0 }}>
            <DialogContentText
              sx={{
                fontSize: '0.875rem',
                color: 'text.secondary',
                lineHeight: 1.5,
              }}
            >
              {description}
            </DialogContentText>
          </DialogContent>
        </Box>
      </Box>

      <DialogActions sx={{ p: 3, pt: 2, gap: 1, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={onClose}
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 2,
            px: 2.5,
            color: 'text.secondary',
            borderColor: 'divider',
            '&:hover': { bgcolor: 'action.hover', borderColor: 'divider' },
          }}
        >
          {cancelLabel}
        </Button>

        <Button
          variant="contained"
          color={color}
          onClick={onConfirm}
          disableElevation
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 2,
            px: 2.5,
          }}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
