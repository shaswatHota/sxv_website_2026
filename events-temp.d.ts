import { EventItems } from "./types/Event";

declare module "@/events-temp.json" {
  export interface EventsData {
    eventMeta: {
      name: string;
      days: string[];
      categories: string[];
    };
    events: EventItems[];
  }
  
  const data: EventsData;
  export default data;
}

