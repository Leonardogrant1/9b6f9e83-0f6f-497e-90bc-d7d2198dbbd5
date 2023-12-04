import EventImage from "@src/components/event_components/event_image/event_image";
import { Event } from "@lib/api/event";
import { useContext } from "react";
import { CartContext } from "@src/context/cart_context/cart_context";
import { IoMdRemove } from "react-icons/io";
import "./cart_item.scss";

type CartItemProps = {
  event: Event;
};

export default function CartItem({ event }: CartItemProps) {
  const { cartEvents, setCartEvents } = useContext(CartContext);

  return (
    <li className="cart-item">
      <div className="data-wrapper">
        <div className="cart-item-image-wrapper">
          <EventImage src={event.flyerFront} alt={event.title} />
        </div>

        <div className="cart-item-info">
          <h4>{event.title}</h4>
          <p>{event.formattedStarttime}</p>
        </div>
      </div>

      <div
        className="add_button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!cartEvents.includes(event)) return;
          setCartEvents([...cartEvents.filter((e) => e._id != event._id)]);
        }}
      >
        <IoMdRemove className="text-white" />
      </div>
    </li>
  );
}
