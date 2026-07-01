"use client";
import React from "react";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";

import Link from "next/link";
import { theme } from "@/utlis/themeSettings";
import styles from "./HeroContent.module.scss";

export default function HeroContent({
  title,
  subtitle,
  description,
  ctaLabel,
  ctaLink,
  className,
}) {
  return (
    <div className={`${styles.heroContent} ${className || ""}`}>
      <div className={styles.contentWrapper}>
        <Typography
          className={styles.subtitle}
          component="h2"
          variant="h4"
          color="secondary.main"
        >
          {subtitle}
        </Typography>
        <Typography component="h1" variant="h2" color="white" className={styles.title}>
          {title}
        </Typography>
        <Typography component="p" variant="h5" color="white">
          {description}
        </Typography>
        {ctaLink && (
          <div className={styles.buttonWrapper}>
            <Link href={ctaLink}>
              <ThemeProvider theme={theme}>
                <Button variant="contained" size="large">
                  {ctaLabel}
                </Button>
              </ThemeProvider>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
