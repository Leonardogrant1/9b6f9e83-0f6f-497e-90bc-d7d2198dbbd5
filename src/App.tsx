import "./App.scss";
import Topbar from "./layouts/topbar/topbar";
import EventGrid from "./layouts/event_grid/event_grid";
import CartContextProvider from "./context/cart_context/cart_context_provider.tsx";
import IntersectingDatesContextProvider from "./context/intersecting_dates_context/intersecting_dates_context_provider.tsx";
import SearchContextProvider from "./context/search_context/search_context_provider.tsx";
import Cart from "./layouts/cart/cart.tsx";

function App() {
  return (
    <IntersectingDatesContextProvider>
      <CartContextProvider>
        <SearchContextProvider>
          <Topbar />
          <div id="app_wrapper">
            <EventGrid />
          </div>
        </SearchContextProvider>

        <Cart />
      </CartContextProvider>
    </IntersectingDatesContextProvider>
  );
}

export default App;
