import React from "react";
import Typography from "@mui/material/Typography";
import styles from "./CenterAlignHeadings.module.scss";

export default function CenterAlignHeadings({ title, subtitle }) {
  return (
    <>
      <div className={styles.titleWrapper}>
        <Typography
          variant="h6"
          component="h3"
          className={styles.subtitle}
          align="center"
          color="primary"
        >
          {subtitle}
        </Typography>
        <Typography
          variant="h3"
          component="h2"
          className="title"
          align="center"
        >
          {title}
        </Typography>
      </div>
    </>
  );
}
