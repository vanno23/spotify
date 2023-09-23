export interface playlistTypes {
  id: string;
  images: { url: string }[];
  followers: { total: number };
  tracks: { total: number };
  type: string;
  name: string;
  owner: { id: string; type: string; display_name: string };
}
