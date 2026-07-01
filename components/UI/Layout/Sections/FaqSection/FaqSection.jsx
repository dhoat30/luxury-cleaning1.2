"use client";

import Container from "@mui/material/Container";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import styles from "./FaqSection.module.scss";

export default function FaqSection({ eyebrow, headline, faqs = [] }) {
  return (
    <section className={styles.section}>
      <Container maxWidth="lg" className={styles.container}>
        <div className={styles.heading}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          {headline && <h2>{headline}</h2>}
        </div>

        {!!faqs.length && (
          <div className={styles.faqs}>
            {faqs.map((faq) => (
              <details className={styles.item} key={faq.q}>
                <summary>
                  <span>{faq.q}</span>
                  <ExpandMoreRoundedIcon aria-hidden="true" />
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
