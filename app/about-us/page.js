import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Footer from "@/components/UI/Footer/Footer";
import Header from "@/components/UI/Header/Header";
import Image from "next/image";
import Link from "next/link";
import styles from "./AboutUsPage.module.scss";

export const metadata = {
  title: "About Luxury Cleaning | Tauranga Premium Cleaning Team",
  description:
    "Meet Hardeep and Noor, the friends behind Luxury Cleaning in Tauranga. Built on meticulous detail, fixed pricing, and genuine care for local homes.",
  metadataBase: new URL("https://luxurycleaning.nz"),
  alternates: {
    canonical: "https://luxurycleaning.nz/about-us",
  },
  openGraph: {
    title: "About Luxury Cleaning | Tauranga Premium Cleaning Team",
    description:
      "Luxury Cleaning was founded in Tauranga in 2025 by two friends with one obsession: the details most people miss.",
    url: "https://luxurycleaning.nz/about-us",
    siteName: "Luxury Cleaning",
    images: [
      {
        url: "/spring-cleaning/team.png",
        width: 1200,
        height: 1200,
      },
    ],
    type: "website",
  },
};

const aboutSections = [
  {
    acf_fc_layout: "about_hero",
    eyebrow: "OUR STORY",
    headline: "Two friends, one <strong>obsession with detail</strong>.",
    subhead:
      "Luxury Cleaning was founded in Tauranga in 2025 — built on a simple belief that a truly clean home is in the details most people miss.",
  },
  {
    acf_fc_layout: "about_story",
    heading: "How it started",
    photo: {
      src: "/home/about-us.png",
      alt: "Hardeep and Noor, founders of Luxury Cleaning",
    },
    body: [
      "In April 2025, two friends — Hardeep and Noor — started Luxury Cleaning with one frustration in common: it was surprisingly hard to find a cleaning service that genuinely cared about the details. The skirting boards. The window tracks. The inside of the oven. The little things that separate a house that looks clean from a home that truly feels clean.",
      "Both of them shared the same eye for detail — the kind that notices the spot everyone else walks past — so they decided to build the service they'd want in their own homes: meticulous, honest, and genuinely premium, for the people of Tauranga.",
      "From the very first clean, the standard has stayed the same: leave every home better than we found it, down to the smallest detail. No shortcuts, no surprises — just the kind of care you'd give your own place.",
    ],
  },
  {
    acf_fc_layout: "about_values",
    heading: "What we stand for",
    values: [
      {
        title: "Attention to detail",
        body: "It's the whole reason we exist. We clean the spots others skip — and leave a <strong>completed checklist</strong> so you can see every one.",
      },
      {
        title: "Honesty, always",
        body: "One <strong>fixed price</strong> agreed upfront. No hidden fees, no surprise invoices — ever.",
      },
      {
        title: "Genuine care",
        body: "We treat your home like our own, and stand behind every clean with our <strong>money-back guarantee</strong>.",
      },
      {
        title: "Proudly local",
        body: "Based in the Bay, serving <strong>Tauranga and surrounding areas</strong> — your neighbours, not a call centre.",
      },
    ],
  },
  {
    acf_fc_layout: "about_cta",
    headline: "Let us care for your home.",
    body: "Experience the difference attention to detail makes. Request your free home visit and fixed-price quote today.",
    primary_cta: { label: "Get My Fixed-Price Quote", url: "/get-a-quote" },
  },
];

const heroSection = aboutSections.find(
  (section) => section.acf_fc_layout === "about_hero"
);
const storySection = aboutSections.find(
  (section) => section.acf_fc_layout === "about_story"
);
const valuesSection = aboutSections.find(
  (section) => section.acf_fc_layout === "about_values"
);
const ctaSection = aboutSections.find(
  (section) => section.acf_fc_layout === "about_cta"
);

const getPublicImageSrc = (src, fallback) => src || fallback;

export default function AboutUsPage() {
  const storyPhotoSrc = getPublicImageSrc(
    storySection?.photo?.src,
    "/spring-cleaning/team.png"
  );

  return (
    <>
      <Header showBackgroundColor={1} />
      <main className={styles.page}>
        <section className={styles.hero}>
          <Container maxWidth="xl" className={styles.heroContainer}>
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>{heroSection.eyebrow}</p>
              <h1
                dangerouslySetInnerHTML={{ __html: heroSection.headline }}
              />
              <p>{heroSection.subhead}</p>
            </div>

            <div className={styles.heroAside} aria-label="Company details">
              <span>Founded</span>
              <strong>2025</strong>
              <small>Tauranga & the Bay of Plenty</small>
            </div>
          </Container>
        </section>

        <section className={styles.story}>
          <Container maxWidth="xl" className={styles.storyContainer}>
            <div className={styles.storyImage}>
              <Image
                src={"/spring-cleaning/team.png"}
                alt={storySection.photo.alt}
                fill
                sizes="(max-width: 900px) 92vw, 42vw"
                quality={95}
              />
            </div>

            <div className={styles.storyContent}>
              <p className={styles.sectionLabel}>Founders</p>
              <h2>{storySection.heading}</h2>
              {storySection.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Container>
        </section>

        <section className={styles.values}>
          <Container maxWidth="xl" className={styles.valuesContainer}>
            <div className={styles.valuesHeader}>
              <p className={styles.sectionLabel}>Our standard</p>
              <h2>{valuesSection.heading}</h2>
            </div>

            <div className={styles.valuesGrid}>
              {valuesSection.values.map((value) => (
                <article className={styles.valueCard} key={value.title}>
                  <CheckCircleOutlineRoundedIcon aria-hidden="true" />
                  <h3>{value.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: value.body }} />
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className={styles.cta}>
          <Container maxWidth="lg" className={styles.ctaContainer}>
            <p className={styles.sectionLabel}>Ready when you are</p>
            <h2>{ctaSection.headline}</h2>
            <p>{ctaSection.body}</p>
            <Link href={ctaSection.primary_cta.url}>
              <Button variant="contained" color="primary" size="large">
                {ctaSection.primary_cta.label}
              </Button>
            </Link>
          </Container>
        </section>
      </main>
      <Footer showCTA={false} />
    </>
  );
}
