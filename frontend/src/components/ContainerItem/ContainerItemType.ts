export interface ContainerItemProps {
  item: {
    id: string;
    type: string;
    name: string;
    images?: { url: string }[];
    album_type: string;
    description: string;
    owner: any;
    release_date: string;
    artists: { name: string }[];
    album?: { images: { url: string }[] };
  };
  page: string;
}
