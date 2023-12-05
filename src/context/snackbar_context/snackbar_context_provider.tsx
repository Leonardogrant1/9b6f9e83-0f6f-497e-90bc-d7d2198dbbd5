import { useState } from "react";
import { Message, SnackbarContext } from "./snackbar_context";

export default function SnackbarContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [message, setMessage] = useState<Message>();

  return (
    <SnackbarContext.Provider value={{ message, setMessage }}>
      {children}
    </SnackbarContext.Provider>
  );
}
