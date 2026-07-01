"use client";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import styles from "./ProblemSection.module.scss";

export default function ProblemSection({
  headline,
  points = [],
  closing,
  primaryCta,
}) {
  return (
    <section className={styles.section}>
      <Container maxWidth="lg" className={styles.container}>
    

        <Typography
          component="h2"
          className={styles.headline}
          dangerouslySetInnerHTML={{ __html: headline }}
        />

        <ul className={styles.points}>
          {points.map((point) => (
            <li key={point}>
              <span className={styles.check} aria-hidden="true" />
              <span dangerouslySetInnerHTML={{ __html: point }} />
            </li>
          ))}
        </ul>

        {closing && (
          <div
            className={styles.closing}
            dangerouslySetInnerHTML={{ __html: closing }}
          />
        )}

        {primaryCta && (
          <Link href={primaryCta.url} className={styles.cta}>
            <Button variant="contained" color="primary" size="large">
              {primaryCta.label}
            </Button>
          </Link>
        )}
      </Container>
    </section>
  );
}
