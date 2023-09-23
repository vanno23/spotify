import { tracksData } from "./Track";
import { artistDataProps } from "./Artist";
export interface albumTypes {
  id: string;
  tracks: { items: tracksData[] };
  release_date: string;
  images: { url: string }[];
  name: string;
  type: string;
  artists: artistDataProps[];
  total_tracks: string;
  copyrights: { text: string }[];
}
