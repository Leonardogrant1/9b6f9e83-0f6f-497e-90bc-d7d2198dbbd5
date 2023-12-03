import "./event_grid.scss";
import { useContext, useEffect, useState } from "react";
import EventCard from "@src/components/event_components/event_card/event_card";
import { Event } from "@lib/api/event";
import { IntersectingDatesContext } from "@src/context/intersecting_dates_context/intersecting_dates_context";
import { SearchContext } from "@src/context/search_context/search_context";
import { Dialog } from "@mui/material";
import { CartContext } from "@src/context/cart_context/cart_context";

export default function EventGrid() {
  const [events, setEvents] = useState<Event[]>([]);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const { intersectingDates } = useContext(IntersectingDatesContext);
  const { cartEvents } = useContext(CartContext);

  const { search } = useContext(SearchContext);

  const current_date = intersectingDates.sort(
    (date_1, date_2) => date_2.toMillis() - date_1.toMillis()
  )[0];

  useEffect(() => {
    Event.getAllEvents({ searchBy: search }).then((events) => {
      // setTimeout(() => {
      setEvents(events);
      // }, 200000);
    });
  }, [search]);

  return (
    <>
      {current_date && (
        <div id="current_date">
          {" "}
          <h2> {current_date.toFormat("DDD")} </h2>{" "}
        </div>
      )}
      <div id="event_grid_wrapper">
        <h1 className="py-xl">Public Events</h1>
        <div className="event_grid">
          {(events || []).map((event) => (
            <EventCard event={event} />
          ))}
        </div>
        ;
      </div>

      <Dialog
        onClose={(e: React.MouseEvent) => setShowDialog(false)}
        open={showDialog}
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
            setShowDialog(false);
          }}
        >
          {" "}
          OK{" "}
        </button>
      </Dialog>
    </>
  );
}
