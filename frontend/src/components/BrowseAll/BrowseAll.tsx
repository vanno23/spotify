import { useState, useEffect, useRef, useCallback } from "react";
import spotifyApi from "../../api/spotifyApi";
import { Link } from "react-router-dom";
import "./BrowseAll.scss";
import { BrowseAllType } from "./BrowseAllType";
import { calculateSlidesPerView } from "../calculateSlidesPerView/CalculateSlidesPerView";
const BrowseAll = () => {
  const [browseAllData, setBrowseAllData] = useState<BrowseAllType[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [slidesPerView, setSlidesPerView] = useState<number>(0);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await spotifyApi.getBrowse("browse/categories");
      setBrowseAllData(response.categories.items);
    };

    fetchCategory();
  }, []);

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

  return (
    <div className="browseAll">
      <h2 className="browseAllTitle">Browse all</h2>
      <div
        className="browseAllContainer"
        ref={containerRef}
        style={{ gridTemplateColumns: `repeat(${slidesPerView}, 1fr)` }}
      >
        {browseAllData?.map((item) => {
          const { id, name, icons } = item;
          return (
            <Link to={`/genre/${id}`} key={id}>
              <div className="item">
                <div
                  style={{ backgroundImage: `url(${icons[0].url})` }}
                  className="backgroundCategory"
                ></div>
                <p className="itemTitle">{name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BrowseAll;
