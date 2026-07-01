import Container from "@mui/material/Container";
import CenterAlignHeadings from "../../../Headings/CenterAlignHeadings";
import Image from "next/image";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import styles from "./ZigZagCardsSection.module.scss";

export default function ZigZagCardsSection({ title, subtitle, cards }) {
  if (!cards) return null;

  const cardsJSX = cards.map((card, index) => {
    return (
      <div key={index} className={styles.card}>
        <div   className={`${styles.imageWrapper} image-wrapper`}style={{ paddingBottom: "500px" }}>
          <Image
            src={card.image.url}
            alt={card.image.alt}
            fill
            sizes="(max-width: 1100px) 100vw, 50vw"
          />
        </div>
        <div className={styles.contentWrapper}>
          <Typography variant="h6" component="div" className={styles.subtitle}>
            {card.content.subtitle}
          </Typography>
          <Typography variant="h4" component="h3" className={styles.title}>
            {card.content.title}
          </Typography>

          {/* set html dangerously  */}
          <div
            className={`${styles.description} body1`}
            dangerouslySetInnerHTML={{ __html: card.content.description }}
          />
          {card.cta_group.cta && (
            <Link href={card.cta_group.cta.url} className={styles.cta}>
              <Button variant={card.cta_group.cta_type} color="primary">
                {card.cta_group.cta.title}
              </Button>
            </Link>
          )}
        </div>
      </div>
    );
  });
  return (
    <section id="who-we-serve" className={styles.section}>
      <Container maxWidth="xl" className={styles.container}>
        <CenterAlignHeadings title={title} subtitle={subtitle} />
        <div className={styles.cardsWrapper}>{cardsJSX}</div>
      </Container>
    </section>
  );
}
