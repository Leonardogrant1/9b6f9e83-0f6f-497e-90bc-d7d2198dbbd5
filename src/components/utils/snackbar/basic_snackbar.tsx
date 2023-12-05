import { Snackbar } from "@mui/material";
import { SnackbarContext } from "@src/context/snackbar_context/snackbar_context";
import { useContext } from "react";

export default function BasicSnackbar() {
  const { message, setMessage } = useContext(SnackbarContext);

  const handleClose = () =>
    setMessage({ message: undefined, severity: undefined });
  return (
    <Snackbar
      open={!!message?.message}
      autoHideDuration={3000}
      onClose={handleClose}
      ContentProps={{
        classes: {
          root: "bgPrimary",
        },
      }}
    >
      <span id="message-id">{message?.message}</span>
    </Snackbar>
  );
}
