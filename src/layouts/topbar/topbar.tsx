import { useContext } from "react";
import Searchbar from "../searchbar/searchbar";
import "./topbar.scss";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "@src/context/cart_context/cart_context";

export default function Topbar() {
  const { cartEvents, setShowCart } = useContext(CartContext);

  return (
    <>
      <div id="topbar_wrapper">
        <div id="logo_wrapper"></div>

        <Searchbar />

        <div
          id="cart_icon_wrapper"
          onClick={() => setShowCart((prev) => !prev)}
        >
          <FaShoppingCart />

          {cartEvents.length > 0 && (
            <div id="badge_count">{cartEvents.length}</div>
          )}
        </div>
      </div>
    </>
  );
}
