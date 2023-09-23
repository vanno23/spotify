export interface playlistPageTracksDataTypes {
  added_at: string;
  track: {
    album: {
      images: { url: string }[];
      name: string;
    };
    id: string;
    name: string;
    type: string;
    artists: { id: string; name: string }[];
    duration_ms: number;
  };
}
