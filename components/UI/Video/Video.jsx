"use client";
import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";
import Image from "next/image";
import PlayIcon from "../Icons/PlayIcon";
import styles from "./Video.module.scss";

export default function Video({ videoID, placeholderImage, className }) {
  const [videoLoaded, setVideoLoaded] = useState(false); // New state for tracking video load
  const placeholderSrc =
    typeof placeholderImage === "string" ? placeholderImage : placeholderImage?.url;
  const placeholderAlt =
    typeof placeholderImage === "string"
      ? "Video thumbnail"
      : placeholderImage?.alt || "Video thumbnail";

  // Function to load and play the video
  const handleImageClick = () => {
    setVideoLoaded(true);
  };
  return (
    <div className={`${styles.container} ${className || ""}`}>
      <div className={styles.videoWrapper}>
        {!videoLoaded && (
          <div className={styles.imgWrapper}>
            {placeholderSrc && (
              <Image
                onClick={handleImageClick}
                src={placeholderSrc}
                fill
                alt={placeholderAlt}
              />
            )}
            <button
              className={styles.button}
              onClick={handleImageClick}
              type="button"
              aria-label="Play video"
            >
              <PlayIcon />
            </button>
          </div>
        )}

        {videoLoaded && (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoID}`}
            playing
            controls
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
            width="100%"
            height="100%"
          />
        )}
      </div>
    </div>
  );
}
