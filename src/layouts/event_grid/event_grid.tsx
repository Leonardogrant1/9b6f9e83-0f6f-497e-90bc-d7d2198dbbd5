import "./event_grid.scss";
import { useContext, useEffect, useState } from "react";
import EventCard from "@src/components/event_components/event_card/event_card";
import { Event } from "@lib/api/event";
import { IntersectingDatesContext } from "@src/context/intersecting_dates_context/intersecting_dates_context";
import { SearchContext } from "@src/context/search_context/search_context";
import { CartContext } from "@src/context/cart_context/cart_context";

export default function EventGrid() {
  const [events, setEvents] = useState<Event[]>([]);

  const { intersectingDates } = useContext(IntersectingDatesContext);
  const { loaded, cartEvents } = useContext(CartContext);

  const { search } = useContext(SearchContext);

  const current_date = intersectingDates.sort(
    (date_1, date_2) => date_2.toMillis() - date_1.toMillis()
  )[0];

  useEffect(() => {
    // Make sture local storage was checked and initial load is complete
    if (!loaded) return;

    // get ids of events in cart and use them the filter them out from the
    // search results

    const cartEventIds = cartEvents.map((e) => e._id);
    Event.getAllEvents({ searchBy: search }).then((events) => {
      setEvents(events.filter((e) => !cartEventIds.includes(e._id)));
    });
  }, [search, cartEvents]);

  if (!loaded) return <h2>Loading</h2>;
  return (
    <>
      {current_date && (
        <div id="current_date">
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
    </>
  );
}
