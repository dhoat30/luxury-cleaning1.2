import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Video from "../../../Video/Video";
import styles from "./VideoSection.module.scss";

export default function VideoSection({
  videoID,
  placeholderImage,
  eyebrow, 
  title, 
  description 
}) {
  return (
    <section className={styles.section}>
      <Container maxWidth="xl" className={styles.container}>
        {(eyebrow || title || description) && (
          <div className={styles.heading}>
            {eyebrow && (
              <Typography component="p" className={styles.eyebrow}>
                {eyebrow}
              </Typography>
            )}
            {title && (
              <Typography component="h2" className={styles.title}>
                {title}
              </Typography>
            )}
            {description && (
              <Typography component="p" className={styles.description}>
                {description}
              </Typography>
            )}
          </div>
        )}

        <Video
          videoID={videoID}
          placeholderImage={placeholderImage}
          className={styles.video}
        />
      </Container>
    </section>
  );
}
