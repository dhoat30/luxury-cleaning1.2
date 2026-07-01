"use client";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import { darkSurfaceTheme } from "@/utlis/themeSettings";
import styles from "./NotFoundPage.module.scss";

const quickLinks = [
  {
    href: "/",
    label: "Home",
    description: "Return to the main Luxury Cleaning website.",
  },
  {
    href: "/services/spring-cleaning",
    label: "Spring cleaning",
    description: "See fixed-price deep cleaning for Tauranga homes.",
  },
  {
    href: "/gallery",
    label: "Gallery",
    description: "View real cleaning detail from local homes.",
  },
];

export default function NotFoundPage({ phoneDisplay, phoneHref }) {
  return (
    <section className={styles.section}>
      <Container maxWidth="xl" className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>404 · Page not found</p>
          <h1>This page has been beautifully misplaced.</h1>
          <p className={styles.lede}>
            The page you were looking for may have moved, but the right cleaning
            service is still close by. Start with a quote, head home, or browse
            the work we are known for.
          </p>

          <ThemeProvider theme={darkSurfaceTheme}>
            <div className={styles.actions}>
              <Link href="/get-a-quote">
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardRoundedIcon />}
                >
                  Get a Quote
                </Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<HomeRoundedIcon />}
                >
                  Back Home
                </Button>
              </Link>
            </div>
          </ThemeProvider>

          <div className={styles.helpLine}>
            <CallRoundedIcon aria-hidden="true" />
            <span>Prefer to talk?</span>
            <a href={phoneHref}>{phoneDisplay}</a>
          </div>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.imageFrame}>
            <Image
              src="/spring-cleaning/hero.png"
              alt=""
              fill
              priority
              sizes="(max-width: 900px) 82vw, 38vw"
            />
          </div>
          <span className={styles.errorCode}>404</span>
        </div>

        <nav className={styles.quickNav} aria-label="Helpful pages">
          {quickLinks.map((link) => (
            <Link href={link.href} className={styles.quickLink} key={link.href}>
              <span>{link.label}</span>
              <small>{link.description}</small>
            </Link>
          ))}
        </nav>
      </Container>
    </section>
  );
}
