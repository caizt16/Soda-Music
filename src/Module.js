import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

export function ConfirmDialog({ onClose, open }) {
  return (
    <Dialog
      className="confirm_dialog"
      PaperProps={{
        style: {
          backgroundColor: "#505050",
          boxShadow: "none"
        }
      }}
      onClose={onClose}
      open={open}
    >
      <DialogTitle textAlign="center" color="white">
        Mashup saved to Spotify
      </DialogTitle>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button sx={{ color: "#ff5c00" }} onClick={onClose}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
