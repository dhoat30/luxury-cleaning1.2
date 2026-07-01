"use client";
import React from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Container } from "@mui/material";
import styles from "./USP.module.scss";

export default function USP({ data, showTitle = false, marginTop = 0 }) {
  const { section_title, description, cards } = data;
  const marginTopCalc = marginTop ? "70px" : "0";
  if (!cards.length) return null;
  return (
    <section className={styles.section} style={{ marginTop: marginTopCalc }}>
      <Container maxWidth="xl">
        {showTitle && (
          <div className={styles.titleWrapper}>
            <Typography variant="h5" component="h2" className={styles.title}>
              {section_title}
            </Typography>
            <Typography variant="body1" component="p" className={styles.description}>
              {description}
            </Typography>
          </div>
        )}
        <div className={styles.cardsWrapper}>
          {cards.map((card, index) => (
            <div key={index} className={styles.card}>
              <Image
                src={card.icon.url}
                alt={card.icon.alt}
                width="80"
                height="80"
                className={styles.image}
              />
              <div className={styles.content}>
                <Typography variant="h6" component="h3" className={styles.title}>
                  {card.title}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  className={styles.description}
                >
                  {card.description}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
