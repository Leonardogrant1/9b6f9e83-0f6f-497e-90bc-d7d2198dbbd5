import "./event_grid.scss";
import { useContext, useEffect, useState } from "react";
import EventCard from "@src/components/event_components/event_card/event_card";
import { Event } from "@lib/api/event";
import { SearchContext } from "@src/context/search_context/search_context";
import { CartContext } from "@src/context/cart_context/cart_context";
import StickyDate from "../sticky_date/sticky_date";

type EventDateDict = {
  [key: string]: Event[];
};

export default function EventGrid() {
  const [eventsDict, setEventsDict] = useState<EventDateDict>({});

  const { loaded, cartEvents } = useContext(CartContext);

  const { search } = useContext(SearchContext);

  useEffect(() => {
    // Make sture local storage was checked and initial load is complete
    if (!loaded) return;

    // get ids of events in cart and use them the filter them out from the
    // search results

    const cartEventIds = cartEvents.map((e) => e._id);
    Event.getAllEvents({ searchBy: search }).then((events) => {
      let dict = {} as EventDateDict;

      for (const event of events.filter((e) => !cartEventIds.includes(e._id))) {
        if (dict[event.date.toISO()!]) {
          dict[event.date.toISO()!].push(event);
        } else {
          dict[event.date.toISO()!] = [event];
        }
      }

      setEventsDict(dict);
    });
  }, [search, cartEvents]);

  if (!loaded) return <h2>Loading</h2>;
  return (
    <>
      <div id="event_grid_wrapper">
        <h1 className="py-xl">Public Events</h1>

        {Object.entries(eventsDict).map((entry) => {
          const date = entry[0];
          const events = entry[1];

          return (
            <>
              <StickyDate iso_string={date} />

              <div className="event_grid">
                {events.map((event) => (
                  <EventCard event={event} />
                ))}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
