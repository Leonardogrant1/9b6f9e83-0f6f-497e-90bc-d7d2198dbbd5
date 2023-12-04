import { DateTime } from "luxon";

type SearchOptions = {
  searchBy: string;
};

class Venue {
  public name!: string;
  public direction!: string;

  constructor(data: Record<string, any>) {
    this.name = data.name;
    this.direction = data.direction;
  }
}

export class Event {
  public _id!: string;
  public title!: string;
  public flyerFront!: string;
  public date!: DateTime;
  public startTime!: DateTime;
  public endTime!: DateTime;
  public city!: string;
  public isPrivate!: boolean;
  public country!: string;
  public venue!: Venue;

  public constructor(data: Record<string, any>) {
    this._id = data._id;
    this.title = data.title;
    this.flyerFront = data.flyerFront;
    this.date = data.date;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.city = data.city;
    this.isPrivate = data.isPrivate;
    this.country = data.country;
    this.venue = data.venue;
  }

  public static async getAllEvents(options?: SearchOptions) {
    const res = await fetch(
      "https://teclead-ventures.github.io/data/london-events.json"
    );
    const jsonRes = (await res.json()) as object[];

    // serialization, instantiation and sorting by events start date

    let events = jsonRes.map(
      (eventData) => new Event(this.serialize(eventData))
    );

    if (options?.searchBy) {
      events = events.filter((e) =>
        e.title.toLowerCase().includes(options.searchBy.toLowerCase())
      );
    }

    /* 
      Some events come without time and date data. 
      They were messing with the sorting method, so I decided to spread them 
      to the end of the array
      */

    const eventsWithDate = events.filter((e) => !!e.startTime);

    eventsWithDate.sort((a, b) =>
      !b.startTime || !a.startTime
        ? 0
        : b.startTime.startOf("day").toMillis() -
          a.startTime.startOf("day").toMillis()
    );

    events = [...eventsWithDate, ...events.filter((e) => !e.startTime)];

    return events;
  }

  // helpers

  public static fromJson(jsonObject: object) {
    return new Event(this.serialize(jsonObject));
  }

  // Here I convert the fetched data to the right format

  private static serialize(obj: Record<string, any>) {
    for (const key in obj) {
      const value = obj[key];

      if (typeof value === "string") {
        try {
          const parsedDate = DateTime.fromISO(value);
          if (parsedDate.isValid && !["id", "_id"].includes(key)) {
            obj[key] = parsedDate;
          }
        } catch (error) {
          // Wenn die Umwandlung fehlschlägt, bleibt der Wert unverändert
        }
      } else if (typeof value === "object") {
        // Rekursiver Aufruf für eingebettete Objekte

        if (key == "venue") {
          obj[key] = new Venue(this.serialize(value));
        } else {
          obj[key] = this.serialize(value);
        }
      }
    }

    return obj;
  }

  get formattedStarttime() {
    return !this.startTime
      ? "Keine Zeitangabe"
      : this.startTime.toFormat("dd.MM.yyyy, hh:mm:ss");
  }

  get formattedEndtime() {
    return !this.endTime
      ? "Keine Zeitangabe"
      : this.endTime.toFormat("dd.MM.yyyy, hh:mm:ss");
  }
}
