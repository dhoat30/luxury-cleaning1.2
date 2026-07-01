import Container from "@mui/material/Container";
import CenterAlignHeadings from "../../../Headings/CenterAlignHeadings";
import Image from "next/image";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import styles from "./ServicesSection.module.scss";

export default function ServicesSection({ title, subtitle, cards }) {
  if (!cards) return null;

  const cardsJSX = cards.map((card, index) => {
    const imgPadding = (card.image.height / card.image.width) * 100;

    return (
      <div key={index} className={styles.card}>
        <Container maxWidth="xl" className={styles.container}>
          <div
          className={`${styles.imageWrapper} image-wrapper`}
            style={{ paddingBottom: `${imgPadding}%` }}
          >
            <Image
              src={card.image.url}
              alt={card.image.alt}
              fill
              quality={100}
              sizes="(max-width: 1100px) 100vw, 50vw"
            />
          </div>
          <div className={styles.contentWrapper}>
            <Typography variant="h6" component="div" className={styles.subtitle}>
              {card?.subtitle}
            </Typography>
            <Typography variant="h4" component="h3" className={styles.title}>
              {card?.title}
            </Typography>

            {/* set html dangerously  */}
            <div
              className={`${styles.description} body1`}
              dangerouslySetInnerHTML={{ __html: card?.description }}
            />
            {card.cta_group.cta && (
              <Link href={card.cta_group.cta.url} className={styles.cta}>
                <Button variant={card.cta_group.cta_type} color="primary">
                  {card.cta_group.cta.title}
                </Button>
              </Link>
            )}
          </div>
        </Container>
      </div>
    );
  });
  return (
    <section id="our-services" className={styles.section}>
      <Container maxWidth="xl" className={styles.container}>
        <CenterAlignHeadings title={title} subtitle={subtitle} />
      </Container>
      <div className={styles.cardsWrapper}>{cardsJSX}</div>
    </section>
  );
}
