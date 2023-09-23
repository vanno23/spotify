interface albumImage {
  url: string;
}

export interface artistDataProps {
  id: string;
  name: string;
  type: string;
  followers: { total: number };
  images: albumImage[];
}
