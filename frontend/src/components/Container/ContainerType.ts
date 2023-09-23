export interface ContainerProps {
  title?: string;
  api?: string;
  page: string;
  data?: any;
}

export interface ContainerData {
  id: string;
  type: string;
  name: string;
  images?: { url: string }[];
  album_type: string;
  description: any;
  owner: string;
  release_date: string;
  artists: { name: string }[];
}
