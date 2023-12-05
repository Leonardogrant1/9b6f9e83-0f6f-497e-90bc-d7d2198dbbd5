import { AlertColor } from "@mui/material/Alert";
import { createContext } from "react";

export type Message = {
  message?: string;
  severity?: AlertColor;
};

type SnackbarContextValue = {
  message?: Message;
  setMessage: (msg: Message) => void;
};

export const SnackbarContext = createContext<SnackbarContextValue>({
  message: undefined,
  setMessage: () => {},
});
