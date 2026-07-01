import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const galleryDirectory = join(process.cwd(), "public/gallery");
const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

const getJpegSize = (buffer) => {
  let offset = 2;

  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) break;

    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);

    if (marker >= 0xc0 && marker <= 0xc3) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      };
    }

    offset += 2 + length;
  }

  return null;
};

const getPngSize = (buffer) => ({
  width: buffer.readUInt32BE(16),
  height: buffer.readUInt32BE(20),
});

const getImageSize = (fileName) => {
  const filePath = join(galleryDirectory, fileName);
  const buffer = readFileSync(filePath);
  const extension = fileName.toLowerCase().split(".").pop();

  if (extension === "jpg" || extension === "jpeg") {
    return getJpegSize(buffer) || { width: 1600, height: 1000 };
  }

  if (extension === "png") {
    return getPngSize(buffer);
  }

  return { width: 1600, height: 1000 };
};

const getImageAlt = (fileName) => {
  if (fileName.startsWith("B roll")) {
    return "Luxury Cleaning team detail shot";
  }

  return "Luxury Cleaning residential cleaning gallery image";
};

export const getGalleryImages = ({ limit, startsWith } = {}) => {
  let fileNames = readdirSync(galleryDirectory)
    .filter((fileName) =>
      imageExtensions.some((extension) =>
        fileName.toLowerCase().endsWith(extension)
      )
    )
    .sort((a, b) => a.localeCompare(b));

  if (startsWith) {
    fileNames = fileNames.filter((fileName) => fileName.startsWith(startsWith));
  }

  if (limit) {
    fileNames = fileNames.slice(0, limit);
  }

  return fileNames.map((fileName, index) => ({
    fileName,
    src: `/gallery/${fileName}`,
    alt: getImageAlt(fileName),
    priority: index < 4,
    ...getImageSize(fileName),
  }));
};
