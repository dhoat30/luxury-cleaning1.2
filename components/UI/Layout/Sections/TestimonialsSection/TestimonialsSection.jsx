"use client";

import Container from "@mui/material/Container";
import { testimonialData } from "@/utlis/testimonialData";
import styles from "./TestimonialsSection.module.scss";

export default function TestimonialsSection({
  eyebrow = "Trusted locally",
  headline = "What clients notice after the clean.",
  testimonials = testimonialData,
}) {
  return (
    <section className={styles.section}>
      <Container maxWidth="xl">
        <div className={styles.header}>
          <p>{eyebrow}</p>
          <h2>{headline}</h2>
        </div>

        <div className={styles.grid}>
          {testimonials.slice(0, 3).map((item) => (
            <figure className={styles.card} key={item.name}>
              <div className={styles.rating} aria-label="Five star review">
                <span aria-hidden="true">★★★★★</span>
              </div>
              <blockquote>“{item.testimonial}”</blockquote>
              <figcaption>
                <span>{item.name}</span>
                <small>Luxury Cleaning client</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
