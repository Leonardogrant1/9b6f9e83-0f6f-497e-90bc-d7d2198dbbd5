import { createContext } from "react";
import { Event } from "@lib/api/event";

type CartContextValue = {
  cartEvents: Event[];
  setCartEvents: (events: Event[]) => void;
};

export const CartContext = createContext<CartContextValue>({
  cartEvents: [],
  setCartEvents: () => {},
});
