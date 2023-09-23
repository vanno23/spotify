import { useState, useEffect } from "react";
import extractColorFromImage from "../colorthief/colorExtractor";

const useArtistHeader = (imageUrl: string) => {
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    if (imageUrl) {
      extractColorFromImage(imageUrl)
        .then((color) => {
          setBgColor(color);
        })
        .catch((error) => {
          console.error("Error extracting color:", error);
        });
    }
  }, [imageUrl]);

  return {
    bgColor,
  };
};

export default useArtistHeader;
