import { useState } from "react";
import { CartContext } from "./cart_context";
import { Event } from "@lib/api/event";

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartEvents, setCartEvents] = useState<Event[]>([]);

  return (
    <CartContext.Provider value={{ cartEvents, setCartEvents }}>
      {children}
    </CartContext.Provider>
  );
}
