import { Event } from "@lib/api/event";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";

import { motion } from "framer-motion";

import "./event_card.scss";
import EventImage from "../event_image/event_image";
import { useContext, useEffect, useRef } from "react";
import { CartContext } from "@src/context/cart_context/cart_context";
import { IntersectingDatesContext } from "@src/context/intersecting_dates_context/intersecting_dates_context";
import { SnackbarContext } from "@src/context/snackbar_context/snackbar_context";

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  const targetRef = useRef(null);
  const { cartEvents, setCartEvents } = useContext(CartContext);
  const { intersectingDates, setIntersectingDates } = useContext(
    IntersectingDatesContext
  );

  const { setMessage } = useContext(SnackbarContext);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const addDate = () => {
      if (
        !event.startTime ||
        intersectingDates.includes(event.startTime.startOf("day"))
      )
        return;

      setIntersectingDates([
        ...intersectingDates,
        event.startTime.startOf("day"),
      ]);
    };

    const removeDate = () => {
      if (
        !event.startTime ||
        !intersectingDates.includes(event.startTime.startOf("day"))
      )
        return;

      const newIntersectingDates = intersectingDates.filter(
        (d) => d == event.startTime.startOf("day")
      );

      setIntersectingDates([...newIntersectingDates]);
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          addDate();
        } else {
          removeDate();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    // Cleanup the observer when the component unmounts
    return () => {
      observer.disconnect();

      removeDate();
    };
  }, []); //

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 50 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
    >
      <a href={event.venue.direction} target="_blank">
        <div id="event_card_wrapper" ref={targetRef}>
          <div className="event-image">
            <EventImage src={event.flyerFront} alt={event.title} />
          </div>

          <div className="event-info-box">
            <div className="padding-box date-box">
              <h3> {event.startTime?.day} </h3>
              <p> {event.startTime && event.startTime.toFormat("LLL")} </p>
            </div>

            <div className="seperator"></div>
            <div className="flex-row items-center padding-box">
              <IoLocationSharp className="text-main" />
              <p>{event.venue.name}</p>
            </div>
            <div id="title_wrapper" className="padding-box">
              <h2 className="text-ellipsis">{event.title}</h2>
              <p>
                {" "}
                {event.startTime?.toFormat("t")} -{" "}
                {event.endTime?.toFormat("t")} Uhr
              </p>
            </div>

            <div
              className="add_button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (cartEvents.includes(event)) return;
                setCartEvents([...cartEvents, event]);
                setMessage({
                  message: "Event added to Cart",
                  severity: "success",
                });
              }}
            >
              <IoMdAdd className="text-white" />
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}
