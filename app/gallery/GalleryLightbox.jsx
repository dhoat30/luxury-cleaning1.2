"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import styles from "./GalleryPage.module.scss";

export default function GalleryLightbox({ images }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const activeImage = activeIndex === null ? null : images[activeIndex];
  const imageCount = images.length;

  const controls = useMemo(
    () => ({
      previous: () =>
        setActiveIndex((current) =>
          current === null ? current : (current - 1 + imageCount) % imageCount
        ),
      next: () =>
        setActiveIndex((current) =>
          current === null ? current : (current + 1) % imageCount
        ),
      close: () => setActiveIndex(null),
    }),
    [imageCount]
  );

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        controls.close();
      }
      if (event.key === "ArrowLeft") {
        controls.previous();
      }
      if (event.key === "ArrowRight") {
        controls.next();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, controls]);

  return (
    <>
      <div className={styles.galleryGrid}>
        {images.map((image, index) => (
          <button
            className={styles.imageCard}
            key={image.fileName}
            type="button"
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw"
              priority={image.priority}
            />
          </button>
        ))}
      </div>

      {activeImage && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image viewer"
          onClick={controls.close}
        >
          <IconButton
            className={`${styles.lightboxButton} ${styles.closeButton}`}
            aria-label="Close gallery"
            onClick={controls.close}
            disableRipple
          >
            <CloseRoundedIcon />
          </IconButton>

          <IconButton
            className={`${styles.lightboxButton} ${styles.previousButton}`}
            aria-label="Previous image"
            onClick={(event) => {
              event.stopPropagation();
              controls.previous();
            }}
            disableRipple
          >
            <ChevronLeftRoundedIcon />
          </IconButton>

          <figure
            className={styles.lightboxFigure}
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activeImage.src}
              width={activeImage.width}
              height={activeImage.height}
              alt={activeImage.alt}
              sizes="100vw"
              priority
            />
            <figcaption>
              {activeIndex + 1} / {imageCount}
            </figcaption>
          </figure>

          <IconButton
            className={`${styles.lightboxButton} ${styles.nextButton}`}
            aria-label="Next image"
            onClick={(event) => {
              event.stopPropagation();
              controls.next();
            }}
            disableRipple
          >
            <ChevronRightRoundedIcon />
          </IconButton>
        </div>
      )}
    </>
  );
}
