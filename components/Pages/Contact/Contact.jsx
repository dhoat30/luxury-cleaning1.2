"use client";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import Container from "@mui/material/Container";
import ServiceAreaMap from "@/components/UI/ServiceAreaMap/ServiceAreaMap";
import React from "react";
import styles from "./Contact.module.scss";

import dynamic from "next/dynamic";

const ContactForm = dynamic(() => import("@/components/UI/Forms/ContactForm"));

const fallbackHero = {
  title: "Let's talk about your home.",
  description:
    "Tell us what you need and we'll get back to you personally. Whether it is a regular clean or a one-off deep clean, we will help you find the right next step.",
};

const phoneNumber = process.env.NEXT_PUBLIC_PHONE || "07 572 2255";
const emailAddress = process.env.NEXT_PUBLIC_EMAIL || "info@luxurycleaning.nz";

const contactMethods = [
  {
    icon: PhoneOutlinedIcon,
    label: "Call us",
    value: phoneNumber,
    href: `tel:${phoneNumber.replace(/\s/g, "")}`,
  },
  {
    icon: EmailOutlinedIcon,
    label: "Email",
    value: emailAddress,
    href: `mailto:${emailAddress}`,
  },
  {
    icon: LocationOnOutlinedIcon,
    label: "Service area",
    value: "Tauranga",
  },
];

export default function Contact({ pageData }) {
  const hero = pageData?.acf?.hero_section || fallbackHero;

  return (
    <>
      <section className={styles.section}>
        <Container maxWidth="xl" className={styles.container}>
          <div className={styles.content}>
            <p className={styles.eyebrow}>CONTACT LUXURY CLEANING</p>
            <h1>{hero.title}</h1>
            <p className={styles.description}>{hero.description}</p>

            <div className={styles.methods} aria-label="Contact details">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                const methodContent = (
                  <>
                    <span className={styles.icon} aria-hidden="true">
                      <Icon />
                    </span>
                    <span>
                      <small>{method.label}</small>
                      <strong>{method.value}</strong>
                    </span>
                  </>
                );

                return method.href ? (
                  <a className={styles.method} href={method.href} key={method.label}>
                    {methodContent}
                  </a>
                ) : (
                  <div className={styles.method} key={method.label}>
                    {methodContent}
                  </div>
                );
              })}
            </div>

            <div className={styles.promise}>
              <strong>What happens next</strong>
              <p>
                We reply personally, ask a few details about your home, then arrange a
                free home visit if a fixed-price quote is the right fit.
              </p>
            </div>
          </div>

          <div className={styles.contactFormWrapper}>
            <div className={styles.formHeading}>
              <p>Send a message</p>
              <h2>We will get back to you shortly.</h2>
            </div>
            <ContactForm />
          </div>
        </Container>
      </section>

      <ServiceAreaMap />
    </>
  );
}
