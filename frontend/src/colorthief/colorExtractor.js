import ColorThief from "colorthief";

const colorThief = new ColorThief();

const extractColorFromImage = async (imageUrl) => {
  try {
    const img = new Image();
    img.crossOrigin = "Anonymous";

    return new Promise((resolve, reject) => {
      img.addEventListener("load", () => {
        const color = colorThief.getColor(img);
        resolve(`rgb(${color.join(",")})`);
      });

      img.addEventListener("error", (error) => {
        reject(error);
      });

      img.src = imageUrl;
    });
  } catch (error) {
    throw error;
  }
};

export default extractColorFromImage;
