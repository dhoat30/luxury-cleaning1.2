"use client";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { footerLinks, footerPolicies } from "./FooterLinks";
import Copyright from "./Copyright";
import ContactInfo from "./ContactInfo";
import GetQuotePage2 from "@/components/Pages/GetQuotePage2/GetQuotePage";
import styles from "./Footer.module.scss";

export default function Footer({ showCTA = true }) {
  return (
    <>
      {showCTA && (
        <GetQuotePage2
          title="Get a Custom Cleaning Quote"
          description="Tell us a bit about your home and cleaning needs, and we'll provide you with a tailored quote. Our team of experts will create a bespoke cleaning plan designed to meet your exact preferences, ensuring your space is always immaculate. Simply fill out the form below, and we'll get back to you promptly with a personalised quote that reflects the luxury and quality you deserve."
        />
      )}

      <div className={styles.footerContainer}>
        <Container maxWidth="xl" className={`${styles.container} row`}>
          <Box className={styles.footerWrapper}>
            <Box className={styles.logoWrapper}>
              <Link href="/" className={styles.logoLink} aria-label="Luxury Cleaning home">
                <Image
                  src="/logo.png"
                  width={86}
                  height={96}
                  quality={90}
                  alt="Luxury Cleaning logo"
                />
              </Link>
              <span className={styles.brandLabel}>Luxury Cleaning Tauranga</span>
              <Typography
                variant="body1"
                component="p"
                className={styles.brandText}
              >
                Luxury Cleaning offers premium cleaning services tailored for
                homeowners, busy professionals, and luxury rental hosts in
                Tauranga.
              </Typography>
              <Link href="/get-a-quote" className={styles.footerCta}>
                Get a fixed-price quote
              </Link>
            </Box>
            <div className={`${styles.footerUsefulLinks} ${styles.linksContainer}`}>
              <Typography
                variant="h6"
                component="div"
                className={styles.columnTitle}
              >
                Useful Links
              </Typography>
              <Box component="ul" className={styles.linkList}>
                {footerLinks.map((link, index) => {
                  return (
                    <li key={index}>
                      <Link href={link.url}>
                        <Typography
                          variant="body1"
                          component="span"
                        >
                          {link.label}
                        </Typography>
                      </Link>
                    </li>
                  );
                })}
              </Box>
            </div>
            <div className={`${styles.footerUsefulLinks} ${styles.linksContainer}`}>
              <Typography
                variant="h6"
                component="div"
                className={styles.columnTitle}
              >
                Legal
              </Typography>
              <Box component="ul" className={styles.linkList}>
                {footerPolicies.map((link, index) => {
                  return (
                    <li key={index}>
                      <Link href={link.url}>
                        <Typography
                          variant="body1"
                          component="span"
                        >
                          {link.label}
                        </Typography>
                      </Link>
                    </li>
                  );
                })}
              </Box>
            </div>
            <Box className={styles.contactWrapper}>
              <div className={styles.contactSection}>
                <Typography
                  variant="h6"
                  component="div"
                  className={styles.columnTitle}
                >
                  Contact
                </Typography>
                <ContactInfo />
              </div>
              {/* 
              <div className="social-wrapper">
                <Typography
                  variant="h6"
                  component="div"
                  color="white"
                  sx={{ marginBottom: "8px" }}
                >
                  Follow Us
                </Typography>
                <Box className="social-links">
                  <Link
                    aria-label="Facebook Link"
                    href="https://www.facebook.com/Luxury Cleaning"
                    target="_blank"
                  >
                    <FacebookIcon sx={{ fontSize: 32, color: "#959DA5" }} />
                  </Link>
                  <Link href="https://www.facebook.com/Luxury Cleaning">
                  <Instagram sx={{ fontSize: 32, color: "#959DA5" }} />
                  </Link>
                  <Link
                    aria-label="Youtube Link Link"
                    href="https://www.youtube.com/@Luxury Cleaning"
                    target="_blank"
                  >
                    <YouTube sx={{ fontSize: 32, color: "#959DA5" }} />
                  </Link>
                  <Link
                    aria-label="Github Link"
                    href="https://github.com/dhoat30"
                    target="_blank"
                  >
                    <GitHub sx={{ fontSize: 32, color: "#959DA5" }} />
                  </Link>
                </Box>
              </div> */}
            </Box>
          </Box>
        </Container>
      </div>
      {/* copyright container */}
      <Copyright />
    </>
  );
}
