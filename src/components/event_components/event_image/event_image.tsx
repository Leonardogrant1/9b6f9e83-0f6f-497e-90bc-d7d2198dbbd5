import { Suspense, useState } from "react";
import { LuPartyPopper } from "react-icons/lu";
import "./event_image.scss";
// interface EventImageProps extends HTMLImageElement

export default function EventImage(
  props: React.ImgHTMLAttributes<HTMLImageElement>
) {
  const [hasErrored, setHasErrored] = useState(false);

  const emptyPlaceholder = (
    <div
      id="empty-placeholder"
      className="flex items-center w-100 h-100 justify-center"
    >
      {" "}
      <LuPartyPopper className="text-main" />{" "}
    </div>
  );

  return (
    <div id="image_wrapper" onError={() => setHasErrored(true)}>
      <Suspense fallback={<h2>Loading</h2>}>
        {!!props.src && !hasErrored ? <img {...props} /> : emptyPlaceholder}
      </Suspense>
    </div>
  );
}
