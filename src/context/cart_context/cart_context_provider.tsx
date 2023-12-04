import { useEffect, useState } from "react";
import { CartContext } from "./cart_context";
import { Event } from "@lib/api/event";
import { getLocalItem, setLocalItem } from "@src/utils/storage_utils";

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // let initialLoaded = false;
  const [loaded, setLoaded] = useState<boolean>(false);

  const [cartEvents, setCartEvents] = useState<Event[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);

  useEffect(() => {
    // get Events from LocalStorage on first Load

    const storedEvents = getLocalItem("cart");

    setCartEvents(
      ((storedEvents as object[]) || []).map((event) => Event.fromJson(event))
    );
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) setLocalItem("cart", cartEvents);
  }, [cartEvents, loaded]);

  return (
    <CartContext.Provider
      value={{
        cartEvents,
        setCartEvents,
        showCart,
        setShowCart,
        loaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
