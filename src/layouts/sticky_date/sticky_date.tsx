import { DateTime } from "luxon";
import { useEffect, useRef } from "react";
import "./sticky_date.scss";

export default function StickyDate({ iso_string }: { iso_string: string }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const targetRefWatcher = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root: document.getElementById("event_grid_wrapper"),
      rootMargin: "20px 0px 800px 0px",
      threshold: 0,
    };

    const handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
      console.log(entry.boundingClientRect.top, entry.isIntersecting);

      targetRef.current?.classList.toggle("sticking", !entry.isIntersecting);
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (targetRefWatcher.current) {
      observer.observe(targetRefWatcher.current);
    }

    // Cleanup the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={targetRefWatcher}></div>
      <div className="date-sticker" ref={targetRef}>
        <h2>{DateTime.fromISO(iso_string).toFormat("DDD")} </h2>
      </div>
    </>
  );
}
