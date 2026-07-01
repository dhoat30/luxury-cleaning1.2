"use client";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import { darkSurfaceTheme } from "@/utlis/themeSettings";
import styles from "./GuaranteeBand.module.scss";

export default function GuaranteeBand({
  badge,
  image, 
  eyebrow,
  headline,
  body,
  steps = [],
  reassurance,
  primaryCta,
}) {
  return (
    <section className={styles.section}>
      <Container maxWidth="xl" >
        <div className={styles.container}>
        {image?.src && (
          <div className={`${styles.badgeWrap} image-wrapper`}>
            <Image
              src={image.src}
              alt={image.alt || ""}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              quality={100}
            />
          </div>
        )}

        <div className={styles.content}>
          {/* {eyebrow && (
            <Typography component="p" className={styles.eyebrow}>
              {eyebrow}
            </Typography>
          )} */}

              {badge?.src && (
            <Image
              src={badge.src}
              alt={badge.alt || ""}
                width={100 *1.5}
                height={96 *1.5}
                
              quality={100}
            />
        )}

          <Typography
            component="h2"
            className={`${styles.headline} mt-16`}
            dangerouslySetInnerHTML={{ __html: headline }}
          />

          {body && <p className={styles.body}>{body}</p>}

          {!!steps.length && (
            <ol className={styles.steps}>
              {steps.map((step) => (
                <li key={step.n}>
                  <span className={styles.stepNumber}>{step.n}</span>
                  <span dangerouslySetInnerHTML={{ __html: step.text }} />
                </li>
              ))}
            </ol>
          )}

          {reassurance && <p className={styles.reassurance}>{reassurance}</p>}

          {primaryCta && (
            <ThemeProvider theme={darkSurfaceTheme}>
              <Link href={primaryCta.url} className={styles.cta}>
                <Button variant="contained" size="large">
                  {primaryCta.label}
                </Button>
              </Link>
            </ThemeProvider>
          )}
        </div>
        </div>
      </Container>
    </section>
  );
}
