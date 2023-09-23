import { useState, useEffect, useCallback, useRef } from "react";
import spotifyApi from "../../api/spotifyApi";
import ContainerItem from "../ContainerItem/ContainerItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "./Container.scss";
import { ContainerProps } from "./ContainerType";
import { ContainerData } from "./ContainerType";
import { calculateSlidesPerView } from "../calculateSlidesPerView/CalculateSlidesPerView";

const Container = ({ title, api, page, data }: ContainerProps) => {
  const [fetchedData, setFetchedData] = useState<ContainerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      if (page !== "profile") {
        const response = await spotifyApi.getBrowse(api);
        let data = [];

        if (page === "homePageArtist") {
          data = response.artists.items || [];
        } else if (page === "artist") {
          data = response.artists || [];
        } else if (page === "playlist") {
          data = response.playlists.items;
        } else if (page === "track" || page === "album") {
          data = response.items;
        } else if (page === "searchedDataPage" && title) {
          data = response[title?.toLocaleLowerCase()].items;
        }

        setFetchedData(data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [api, page, title]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderData =
    (page === "profile" || page === "search") && data ? data : fetchedData;

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      setSlidesPerView(calculateSlidesPerView(width));
    }
  }, []);

  const handleResize = useCallback(() => {
    if (containerRef.current) {
      const containerWidth: number | undefined =
        containerRef.current?.clientWidth;
      setSlidesPerView(calculateSlidesPerView(containerWidth));
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const swiperOptions = {
    slidesPerView: slidesPerView,
    spaceBetween: 24,
  };
  return (
    <div className="container">
      <div ref={containerRef}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {renderData.length > 0 && <h2>{title}</h2>}
            <Swiper {...swiperOptions}>
              {renderData?.map((item: any) => (
                <SwiperSlide key={item.id} className="swiperContainer">
                  <ContainerItem item={item} page={page} />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
    </div>
  );
};

export default Container;
