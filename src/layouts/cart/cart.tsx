import { Dialog } from "@mui/material";
import EventCard from "@src/components/event_components/event_card/event_card";
import { CartContext } from "@src/context/cart_context/cart_context";
import { useContext } from "react";

export default function Cart() {
  const { cartEvents, showCart, setShowCart } = useContext(CartContext);

  return (
    <Dialog
      onClose={(e: React.MouseEvent) => setShowCart(false)}
      open={showCart}
      maxWidth="lg"
    >
      <div className="event_grid">
        {(cartEvents || []).map((event) => (
          <EventCard event={event} />
        ))}
      </div>

      <button
        className="rounded bg-[#232323] text-white p-2 w-full"
        onClick={() => {
          setShowCart(false);
        }}
      >
        {" "}
        OK{" "}
      </button>
    </Dialog>
  );
}
