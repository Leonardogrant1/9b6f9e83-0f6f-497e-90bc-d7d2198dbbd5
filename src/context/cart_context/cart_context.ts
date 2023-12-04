import { createContext } from "react";
import { Event } from "@lib/api/event";

type CartContextValue = {
  cartEvents: Event[];
  setCartEvents: React.Dispatch<React.SetStateAction<Event[]>>;

  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CartContext = createContext<CartContextValue>({
  cartEvents: [],
  setCartEvents: () => {},
  showCart: false,
  setShowCart: () => {},
});
