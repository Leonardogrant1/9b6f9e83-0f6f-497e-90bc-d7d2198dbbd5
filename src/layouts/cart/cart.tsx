import { Dialog } from "@mui/material";
import { CartContext } from "@src/context/cart_context/cart_context";
import { useContext } from "react";
import CartItem from "./cart_item/cart_item";
import "./cart.scss";

export default function Cart() {
  const { cartEvents, showCart, setShowCart } = useContext(CartContext);

  return (
    <Dialog
      onClose={(e: React.MouseEvent) => setShowCart(false)}
      open={showCart}
      fullWidth
      maxWidth="lg"
    >
      <div id="cart">
        <ul className="items-start">
          {cartEvents.length > 0 ? (
            cartEvents.map((event) => <CartItem event={event} />)
          ) : (
            <p> Cart is empty </p>
          )}
        </ul>

        <div id="button-wrapper">
          {cartEvents.length > 0 && (
            <button
              className="btn-main"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                alert("HERE COULD BE STRIPE OR PAYPAL");
              }}
            >
              To Checkout
            </button>
          )}

          <button
            className="btn-secondary"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setShowCart(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </Dialog>
  );
}
