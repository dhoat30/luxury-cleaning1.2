import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Footer from "@/components/UI/Footer/Footer";
import Header from "@/components/UI/Header/Header";
import HeroSection from "@/components/UI/Layout/Sections/HeroSection/HeroSection";
import UspStripSection from "@/components/UI/Layout/Sections/UspStripSection/UspStripSection";
import { getGalleryImages } from "@/utlis/galleryImages";
import { uspStripData } from "@/utlis/uspStripData";
import Image from "next/image";
import Link from "next/link";
import styles from "./HomePage.module.scss";

export const metadata = {
  title: "Luxury Cleaning Tauranga | Premium Home Cleaning",
  description:
    "Boutique home cleaning for Tauranga and the Bay of Plenty. Fixed-price quotes, completed checklists, money-back guarantee, and fully insured local cleaners.",
  metadataBase: new URL("https://luxurycleaning.nz"),
  alternates: {
    canonical: "https://luxurycleaning.nz",
  },
  openGraph: {
    title: "Luxury Cleaning Tauranga | Premium Home Cleaning",
    description:
      "Premium spring deep cleans and regular ongoing cleaning for Tauranga homes.",
    url: "https://luxurycleaning.nz",
    siteName: "Luxury Cleaning",
    images: [
      {
        url: "/spring-cleaning/hero.png",
        width: 1200,
        height: 1200,
      },
    ],
    type: "website",
  },
};

const homeSections = [
  {
    acf_fc_layout: "home_hero",
    eyebrow: "PREMIUM CLEANING · TAURANGA & THE BAY OF PLENTY",
    headline: "Let us handle the cleaning, while you reclaim your time.",
    headline_variants: {
      A: "Let us handle the cleaning, while you reclaim your time.",
      B: "Your home, immaculate — down to the last detail.",
      C: "Cleaning, done with obsessive attention to detail.",
    },
    subhead:
      "Boutique home cleaning for Tauranga and the Bay of Plenty — one fixed price, a completed checklist after every clean, and a money-back guarantee. Spring deep cleans and regular ongoing cleaning.",
    primary_cta: { label: "Get a Quote", url: "/get-a-quote" },
    secondary_cta: { label: "Explore our services", url: "#services" },
    trust_strip: [
      "Fixed price",
      "Money-back guarantee",
      "$5M insured",
      "Free home visit",
    ],
  },
  uspStripData,
  {
    acf_fc_layout: "services_fork",
    eyebrow: "OUR SERVICES",
    headline: "Two ways we keep your home immaculate.",
    services: [
      {
        tag: "ONE-OFF",
        title: "Spring & Deep Cleaning",
        body: "A top-to-bottom seasonal reset — oven, grout, skirting boards, window tracks and every detail in between.",
        points: [
          "Fixed price, no surprises",
          "Completed checklist",
          "Perfect before guests, after renovations, or at season's turn",
        ],
        cta: {
          label: "Explore spring cleaning",
          url: "/services/spring-cleaning",
        },
        image: {
          src: "/home/spring-cleaning.jpg",
          fallback: "/spring-cleaning/video-placeholder.jpg",
          alt: "Spring deep cleaning in a Tauranga home",
        },
      },
      {
        tag: "ONGOING",
        title: "Regular Cleaning",
        body: "Reliable weekly, fortnightly or monthly cleaning that keeps your home effortlessly spotless, all year round.",
        points: [
          "The same trusted team every visit",
          "No lock-in contracts",
          "Fits around your routine",
        ],
        cta: { label: "Get a regular cleaning quote", url: "/get-a-quote" },
        image: {
          src: "/home/regular-cleaning.jpg",
          fallback: "/gallery/IMG_5003.jpg",
          alt: "Regular ongoing cleaning in a Tauranga home",
        },
      },
    ],
  },
  // {
  //   acf_fc_layout: "who_we_serve_teaser",
  //   eyebrow: "WHO WE SERVE",
  //   headline: "Tailored to your home and your life.",
  //   segments: [
  //     {
  //       title: "Luxury homeowners",
  //       body: "Meticulous care for high-end residences, with respect for fine finishes and furnishings.",
  //     },
  //     {
  //       title: "Busy professionals",
  //       body: "Hassle-free cleaning so you can focus on what matters — and come home to calm.",
  //     },
  //     {
  //       title: "Holiday homes & Airbnb",
  //       body: "Guest-ready turnarounds that earn five-star reviews and repeat bookings.",
  //     },
  //   ],
  //   cta: { label: "See who we serve", url: "#who-we-serve" },
  // },
  {
    acf_fc_layout: "about_teaser",
    eyebrow: "OUR STORY",
    headline:
      "Founded by two friends, on one <strong>obsession with detail</strong>.",
    body: "In 2025, Hardeep and Noor started Luxury Cleaning to build the service they'd want in their own homes — meticulous, honest, and genuinely premium. That standard hasn't changed since.",
    cta: { label: "Read our story", url: "/about-us" },
    photo: {
      src: "/home/about-us.png",
      fallback: "/spring-cleaning/team.png",
      alt: "Hardeep and Noor, founders of Luxury Cleaning",
    },
  },
  {
    acf_fc_layout: "gallery_teaser",
    eyebrow: "OUR WORK",
    headline: "See the difference for yourself.",
    cta: { label: "View the gallery", url: "/gallery" },
  },
  {
    acf_fc_layout: "home_cta",
    headline: "Ready for a spotless home?",
    body: "Request your free home visit and fixed-price quote today — no obligation.",
    primary_cta: { label: "Get a Quote", url: "/get-a-quote" },
    secondary_cta: { label: "Call 07 572 2255", url: "tel:075722255" },
  },
];

const getSection = (layout) =>
  homeSections.find((section) => section.acf_fc_layout === layout);

const getPublicImageSrc = (src, fallback) => src || fallback;

export default function Home() {
  const hero = getSection("home_hero");
  const uspStrip = getSection("usp_strip");
  const servicesFork = getSection("services_fork");
  // const whoWeServe = getSection("who_we_serve_teaser");
  const aboutTeaser = getSection("about_teaser");
  const galleryTeaser = getSection("gallery_teaser");
  const finalCta = getSection("home_cta");
  const galleryImages = getGalleryImages({ limit: 4, startsWith: "IMG_" });

  return (
    <>
      <Header />
      <main className={styles.page}>
        <HeroSection
          eyebrow={hero.eyebrow}
          title={hero.headline}
          headlineVariants={hero.headline_variants}
          subhead={hero.subhead}
          primaryCta={hero.primary_cta}
          secondaryCta={hero.secondary_cta}
          trustItems={hero.trust_strip}
          graphic={{
            src: getPublicImageSrc("/home/hero.jpg", "/spring-cleaning/hero.png"),
            alt: "Luxury Cleaning premium home cleaning service",
            priority: true,
          }}
        />

        <UspStripSection items={uspStrip.items} />

        <section id="services" className={styles.servicesFork}>
          <Container maxWidth="xl" className={styles.servicesContainer}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>{servicesFork.eyebrow}</p>
              <h2>{servicesFork.headline}</h2>
            </div>

            <div className={styles.serviceGrid}>
              {servicesFork.services.map((service) => (
                <article className={styles.serviceCard} key={service.title}>
                  <div className={styles.serviceImage}>
                    <Image
                      src={getPublicImageSrc(
                        service.image.src,
                        service.image.fallback
                      )}
                      alt={service.image.alt}
                      fill
                      sizes="(max-width: 900px) 92vw, 44vw"
                    />
                  </div>
                  <div className={styles.serviceContent}>
                    <span>{service.tag}</span>
                    <h3>{service.title}</h3>
                    <p>{service.body}</p>
                    <ul>
                      {service.points.map((point) => (
                        <li key={point}>
                          <CheckCircleOutlineRoundedIcon aria-hidden="true" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <Link href={service.cta.url}>
                      {service.cta.label}
                      <ArrowForwardRoundedIcon aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        

        <section className={styles.aboutTeaser}>
          <Container maxWidth="xl" className={styles.aboutContainer}>
            <div className={styles.aboutPhoto}>
              <Image
                src={getPublicImageSrc(
                  aboutTeaser.photo.src,
                  aboutTeaser.photo.fallback
                )}
                alt={aboutTeaser.photo.alt}
                fill
                sizes="(max-width: 900px) 92vw, 38vw"
              />
            </div>

            <div className={styles.aboutContent}>
              <p className={styles.eyebrow}>{aboutTeaser.eyebrow}</p>
              <h2 dangerouslySetInnerHTML={{ __html: aboutTeaser.headline }} />
              <p>{aboutTeaser.body}</p>
              <Link href={aboutTeaser.cta.url}>
                {aboutTeaser.cta.label}
                <ArrowForwardRoundedIcon aria-hidden="true" />
              </Link>
            </div>
          </Container>
        </section>

        <section className={styles.galleryTeaser}>
          <Container maxWidth="xl" className={styles.galleryContainer}>
            <div className={styles.galleryHeader}>
              <div>
                <p className={styles.eyebrow}>{galleryTeaser.eyebrow}</p>
                <h2>{galleryTeaser.headline}</h2>
              </div>
              <Link href={galleryTeaser.cta.url}>
                {galleryTeaser.cta.label}
                <ArrowForwardRoundedIcon aria-hidden="true" />
              </Link>
            </div>

            <div className={styles.photoStrip}>
              {galleryImages.map((image) => (
                <div className={styles.photo} key={image.src}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 760px) 80vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className={styles.finalCta}>
          <Container maxWidth="lg" className={styles.finalCtaContainer}>
            <h2>{finalCta.headline}</h2>
            <p>{finalCta.body}</p>
            <div className={styles.finalActions}>
              <Link href={finalCta.primary_cta.url}>
                <Button variant="contained" color="primary" size="large">
                  {finalCta.primary_cta.label}
                </Button>
              </Link>
              <Link href={finalCta.secondary_cta.url}>
                <Button variant="outlined" color="primary" size="large">
                  {finalCta.secondary_cta.label}
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <Footer showCTA={false} />
    </>
  );
}
