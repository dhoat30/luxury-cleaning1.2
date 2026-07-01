import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import { darkSurfaceTheme } from "@/utlis/themeSettings";
import styles from "./ProcessSection.module.scss";

export default function ProcessSection({
  eyebrow,
  headline,
  title,
  description,
  cards,
  steps,
  primaryCta,
}) {
  const items =
    steps ||
    cards?.map((card, index) => ({
      numeral: `0${index + 1}`,
      title: card?.title,
      body: card?.description,
    }));

  if (!items?.length) return null;

  return (
    <section className={styles.section}>
      <Container maxWidth="xl" className={styles.container}>
        <div className={styles.heading}>
          {eyebrow && (
            <Typography component="p" className={styles.eyebrow}>
              {eyebrow}
            </Typography>
          )}
          <Typography component="h2" className={styles.headline}>
            {headline || title}
          </Typography>
          {description && (
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>

        <div className={styles.steps}>
          {items.map((step, index) => (
            <article className={styles.step} key={step.title || index}>
              <div className={styles.numeral}>{step.numeral || index + 1}</div>
              <div className={styles.content}>
                <Typography component="h3" className={styles.title}>
                  {step.title}
                </Typography>
                <div
                  className={styles.body}
                  dangerouslySetInnerHTML={{ __html: step.body }}
                />
              </div>
            </article>
          ))}
        </div>

        {primaryCta && (
          <ThemeProvider theme={darkSurfaceTheme}>
            <Link href={primaryCta.url} className={styles.cta}>
              <Button variant="contained" size="large">
                {primaryCta.label}
              </Button>
            </Link>
          </ThemeProvider>
        )}
      </Container>
    </section>
  );
}
