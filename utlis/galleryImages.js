const galleryImageManifest = [
  {
    fileName: "B roll nested .00_00_14_38.Still006 1.jpg",
    width: 3840,
    height: 2160,
  },
  {
    fileName: "B roll nested .00_03_19_48.Still007 1.jpg",
    width: 3840,
    height: 2160,
  },
  {
    fileName: "B roll nested .00_03_37_38.Still005 1.jpg",
    width: 3840,
    height: 2160,
  },
  {
    fileName: "B roll nested .00_03_45_18.Still004 1.jpg",
    width: 3840,
    height: 2160,
  },
  {
    fileName: "B roll nested .00_14_08_38.Still009 1.jpg",
    width: 3840,
    height: 2160,
  },
  {
    fileName: "B roll nested .00_14_46_33.Still010 1.jpg",
    width: 3840,
    height: 2160,
  },
  {
    fileName: "B roll nested .00_19_20_39.Still011 1.jpg",
    width: 3840,
    height: 2160,
  },
  {
    fileName: "B roll nested .00_22_39_18.Still012 1.jpg",
    width: 3840,
    height: 2160,
  },
  {
    fileName: "B roll nested .00_23_23_40.Still013 1.jpg",
    width: 3840,
    height: 2160,
  },
  {
    fileName: "B roll nested .00_24_40_49.Still016 1.jpg",
    width: 3840,
    height: 2160,
  },
  {
    fileName: "B roll nested .00_28_39_43.Still018 1.jpg",
    width: 3840,
    height: 2160,
  },
  {
    fileName: "B roll nested .00_32_13_08.Still020 1.jpg",
    width: 3840,
    height: 2160,
  },
  {
    fileName: "B roll nested .00_35_32_33.Still021 1.jpg",
    width: 3840,
    height: 2160,
  },
  {
    fileName: "B roll nested .00_38_58_42.Still022 1.jpg",
    width: 3840,
    height: 2160,
  },
  { fileName: "IMG_4956.jpg", width: 4096, height: 2731 },
  { fileName: "IMG_4965.jpg", width: 4096, height: 2731 },
  { fileName: "IMG_4973.jpg", width: 4096, height: 2731 },
  { fileName: "IMG_4983.jpg", width: 4096, height: 2731 },
  { fileName: "IMG_4989.jpg", width: 4096, height: 2731 },
  { fileName: "IMG_4995.jpg", width: 4096, height: 2731 },
  { fileName: "IMG_4998.jpg", width: 4096, height: 2731 },
  { fileName: "IMG_5003.jpg", width: 4096, height: 2731 },
  { fileName: "IMG_5006.jpg", width: 4096, height: 2731 },
  { fileName: "IMG_5012.jpg", width: 4096, height: 2731 },
  { fileName: "IMG_5021.jpg", width: 4096, height: 2731 },
  { fileName: "IMG_5033.jpg", width: 2731, height: 4096 },
];

const getImageAlt = (fileName) => {
  if (fileName.startsWith("B roll")) {
    return "Luxury Cleaning team detail shot";
  }

  return "Luxury Cleaning residential cleaning gallery image";
};

export const getGalleryImages = ({ limit, startsWith } = {}) => {
  let images = galleryImageManifest;

  if (startsWith) {
    images = images.filter((image) => image.fileName.startsWith(startsWith));
  }

  if (limit) {
    images = images.slice(0, limit);
  }

  return images.map((image, index) => ({
    ...image,
    src: `/gallery/${image.fileName}`,
    alt: getImageAlt(image.fileName),
    priority: index < 4,
  }));
};
