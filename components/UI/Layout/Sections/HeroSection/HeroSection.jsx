"use client";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import { darkSurfaceTheme } from "@/utlis/themeSettings";
import styles from "./HeroSection.module.scss";

export default function HeroSection({
  eyebrow,
  title,
  headlineVariants,
  headlineVariant = "A",
  subhead,
  primaryCta,
  secondaryCta,
  trustItems = [],
  summary,
  graphic,
}) {
  const headline = headlineVariants?.[headlineVariant] || title;

  return (
    <section className={styles.hero}>
      <Container maxWidth="xl" className={styles.container}>
        <div className={styles.content}>
          {eyebrow && (
            <Typography component="p" className={styles.eyebrow}>
              {eyebrow}
            </Typography>
          )}

          <Typography
            component="h1"
            className={styles.title}
            dangerouslySetInnerHTML={{ __html: headline }}
          />

          {subhead && (
            <Typography component="p" className={styles.subhead}>
              {subhead}
            </Typography>
          )}

          {(primaryCta || secondaryCta) && (
            <ThemeProvider theme={darkSurfaceTheme}>
              <div className={styles.actions}>
                {primaryCta && (
                  <Link href={primaryCta.url}>
                    <Button variant="contained" size="large">
                      {primaryCta.label}
                    </Button>
                  </Link>
                )}
                {secondaryCta && (
                  <Link href={secondaryCta.url}>
                    <Button variant="outlined" size="large">
                      {secondaryCta.label}
                    </Button>
                  </Link>
                )}
              </div>
            </ThemeProvider>
          )}

          {!!trustItems.length && (
            <ul className={styles.trustStrip} aria-label="Service guarantees">
              {trustItems.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          )}

          {summary?.title && (
            <p className={styles.summaryLine}>{summary.title}</p>
          )}
        </div>

        {graphic && (
          <div className={styles.mediaColumn}>
            <div className={styles.graphicFrame}>
              <Image
                src={graphic.src}
                alt={graphic.alt}
                fill
                priority={graphic.priority}
                sizes="(max-width: 1000px) 90vw, 50vw"
              />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
