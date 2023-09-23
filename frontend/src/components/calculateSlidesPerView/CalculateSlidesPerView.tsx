export const calculateSlidesPerView = (containerWidth: number) => {
  if (containerWidth >= 1400) {
    return 7;
  } else if (containerWidth < 1400 && containerWidth >= 1200) {
    return 6;
  } else if (containerWidth < 1200 && containerWidth >= 800) {
    return 5;
  } else if (containerWidth < 800 && containerWidth >= 500) {
    return 4;
  } else if (containerWidth < 500 && containerWidth >= 300) {
    return 3;
  } else if (containerWidth < 300) {
    return 2;
  }
  return 1;
};
