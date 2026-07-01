"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import styles from "./SpringCleaningQuotePage.module.scss";

export default function QuotePhotoGrid({ images }) {
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
      <div className={styles.photoGrid}>
        {images.map((image, index) => (
          <button
            className={styles.photoCard}
            key={image.fileName}
            type="button"
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              sizes="(max-width: 640px) 50vw, (max-width: 1080px) 33vw, 25vw"
            />
          </button>
        ))}
      </div>

      {activeImage && (
        <div
          className={styles.photoLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Spring cleaning photo viewer"
          onClick={controls.close}
        >
          <IconButton
            className={`${styles.photoLightboxButton} ${styles.photoCloseButton}`}
            aria-label="Close photo viewer"
            onClick={controls.close}
            disableRipple
          >
            <CloseRoundedIcon />
          </IconButton>

          <IconButton
            className={`${styles.photoLightboxButton} ${styles.photoPreviousButton}`}
            aria-label="Previous photo"
            onClick={(event) => {
              event.stopPropagation();
              controls.previous();
            }}
            disableRipple
          >
            <ChevronLeftRoundedIcon />
          </IconButton>

          <figure
            className={styles.photoLightboxFigure}
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
            className={`${styles.photoLightboxButton} ${styles.photoNextButton}`}
            aria-label="Next photo"
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
