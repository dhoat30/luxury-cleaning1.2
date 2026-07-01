"use client";

import Container from "@mui/material/Container";
import styles from "./FrequencyOptionsSection.module.scss";

export default function FrequencyOptionsSection({
  eyebrow,
  headline,
  intro,
  options = [],
  note,
}) {
  return (
    <section className={styles.section}>
      <Container maxWidth="xl" className={styles.container}>
        <div className={styles.heading}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          {headline && <h2>{headline}</h2>}
          {intro && <p className={styles.intro}>{intro}</p>}
        </div>

        <div className={styles.content}>
          {!!options.length && (
            <div className={styles.options}>
              {options.map((option, index) => (
                <article
                  className={[
                    styles.option,
                    option.tone ? styles[option.tone] : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={option.title}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{option.title}</h3>
                    <p>{option.body}</p>
                  </div>
                </article>
              ))}
            </div>
          )}

          {note && <p className={styles.note}>{note}</p>}
        </div>
      </Container>
    </section>
  );
}
