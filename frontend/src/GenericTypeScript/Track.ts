import { artistDataProps } from "./Artist";
import { albumTypes } from "./Album";

export interface tracksData {
  id: string;
  name: string;
  duration_ms: number;
  album?: albumTypes;
  artists: artistDataProps[];
  type?: string;
}
