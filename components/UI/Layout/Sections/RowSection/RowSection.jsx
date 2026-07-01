import React from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Button from "@mui/material/Button";
import Link from "next/link";
import Container from "@mui/material/Container";
import styles from "./RowSection.module.scss";
export default function RowSection({
  title,
  subtitle,
  description,
  imageAlignment,
  image,
  ctaGroup,
}) {
  const imgPadding = (image.height / image.width) * 100;
  const contentAlignment = imageAlignment === "left" ? "2 / 3" : "1 / 2";
  return (
    <section className={styles.section}>
      <Container maxWidth="xl">
        <div className={styles.wrapper}>
          <div
            className={styles.contentWrapper}
            style={{ gridColumn: contentAlignment }}
          >
            <Typography variant="h6" component="div" className={styles.subtitle}>
              {subtitle}
            </Typography>
            <Typography variant="h3" component="h2" className={styles.title}>
              {title}
            </Typography>

            <div
              className={`${styles.description} body1`}
              dangerouslySetInnerHTML={{ __html: description }}
            />

            {ctaGroup.cta && (
              <Link href={ctaGroup.cta.url} className={styles.cta}>
                <Button variant={ctaGroup.cta_type} color="primary">
                  {ctaGroup.cta.title}
                </Button>
              </Link>
            )}
          </div>

          {/* image wrapper */}
          <div
            className={`${styles.imageWrapper} image-wrapper`}
            style={{ paddingBottom: `${imgPadding}%` }}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="(max-width: 1100px) 100vw, 50vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
