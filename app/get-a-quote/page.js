import Footer from "@/components/UI/Footer/Footer";
import Header from "@/components/UI/Header/Header";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Container from "@mui/material/Container";
import { getGalleryImages } from "@/utlis/galleryImages";
import { testimonialData } from "@/utlis/testimonialData";
import QuotePhotoGrid from "../services/spring-cleaning/get-a-quote/QuotePhotoGrid";
import SpringCleaningQuoteForm from "../services/spring-cleaning/get-a-quote/SpringCleaningQuoteForm";
import styles from "../services/spring-cleaning/get-a-quote/SpringCleaningQuotePage.module.scss";

export const metadata = {
  title: "Get a Custom Cleaning Quote | Luxury Cleaning Tauranga",
  description:
    "Request a personalised regular or spring cleaning quote from Luxury Cleaning in Tauranga. Free home visit, clear pricing, and no obligation.",
  metadataBase: new URL("https://luxurycleaning.nz"),
  alternates: {
    canonical: "https://luxurycleaning.nz/get-a-quote",
  },
  openGraph: {
    title: "Get a Custom Cleaning Quote | Luxury Cleaning Tauranga",
    description:
      "Request a personalised regular or spring cleaning quote from Luxury Cleaning in Tauranga.",
    url: "https://luxurycleaning.nz/get-a-quote",
    siteName: "Luxury Cleaning",
    images: [
      {
        url: "/black-logo.jpg",
        width: 800,
        height: 600,
      },
    ],
    type: "website",
  },
};

const quoteContent = {
  eyebrow: "CLEANING QUOTE · TAURANGA",
  headline: "Get your <strong>fixed-price</strong> cleaning quote",
  subhead:
    "Whether it's a one-off spring clean or regular ongoing cleaning, tell us a little about your home and we'll arrange your free home visit. One clear price — no surprises, no obligation.",
  trust_items: [
        "Fixed-price quote before we start",
        "No lock-in contracts", 
      "Completed checklist after every clean",
      "Money-back guarantee",
      "$5 million liability insurance",
      "The same trusted cleaners every visit", 
            "Free home visit across Tauranga & surrounding areas",

  ],
  what_next: {
    title: "What happens next",
    steps: [
        "We'll call to arrange your <strong>free home visit</strong>, at a time that suits.",
        "We see your home and give you <strong>one fixed price</strong> — in writing.",
        "Happy with it? We book you in. <strong>No obligation either way.</strong>",
    ],
  },
};

const quoteForm = {
  title: "Request your quote",
  subtitle: "We'll get back to you personally — usually within a few hours.",
  fields: [
    {
      name: "service",
      label: "Service",
      type: "select",
      required: true,
      placeholder: "Select service",
      options: ["Regular Cleaning", "Spring Cleaning"],
    },
    {
      name: "service_frequency",
      label: "Frequency",
      type: "select",
      required: true,
      placeholder: "Select frequency",
      options: ["Weekly", "Fortnightly", "Monthly", "Flexible"],
      showWhen: {
        field: "service",
        equals: "Regular Cleaning",
      },
    },
    { name: "first_name", label: "First name", type: "text", required: true },
    { name: "last_name", label: "Last name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true },
    { name: "suburb", label: "Property address", type: "text", required: false },
    {
      name: "message",
      label: "Anything we should know? (optional)",
      type: "textarea",
      required: false,
    },
  ],
  submit_label: "Get My Cleaning Quote",
  fine_print: "🔒 Your details are safe & never shared",
};
const quotePhotos = getGalleryImages({ limit: 12, startsWith: "IMG_" });

export default function GetQuotePage() {
  const phoneDisplay = process.env.PHONE || "07 572 2255";
  const phoneHref = `tel:${phoneDisplay.replace(/[^\d+]/g, "")}`;

  return (
    <>
      <Header showBackgroundColor={1} />
      <main className={styles.page}>
        <section className={styles.hero}>
          <Container maxWidth="xl" className={styles.container}>
            <div className={styles.content}>
              <p className={styles.eyebrow}>{quoteContent.eyebrow}</p>
              <h1 dangerouslySetInnerHTML={{ __html: quoteContent.headline }} />
              <p className={styles.lede}>{quoteContent.subhead}</p>

              <ul className={styles.trustList}>
                {quoteContent.trust_items.map((item) => (
                  <li key={item}>
                    <CheckCircleOutlineIcon aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.nextSteps}>
                <h2>{quoteContent.what_next.title}</h2>
                <ol>
                  {quoteContent.what_next.steps.map((step) => (
                    <li key={step}>
                      <span dangerouslySetInnerHTML={{ __html: step }} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className={styles.formCard}>
              <SpringCleaningQuoteForm
                title={quoteForm.title}
                subtitle={quoteForm.subtitle}
                fields={quoteForm.fields}
                submitLabel={quoteForm.submit_label}
                finePrint={quoteForm.fine_print}
                phoneDisplay={phoneDisplay}
                phoneHref={phoneHref}
                googleApiKey={
                  process.env.NEXT_PUBLIC_GOOGLE_API_KEY || process.env.GOOGLE_API_KEY
                }
                formName="Website Cleaning Quote Form"
                formType="general_cleaning_quote"
                promiseText="Regular cleaning · spring cleaning · no obligation"
              />
            </div>
          </Container>
        </section>

        <section className={styles.testimonials}>
          <Container maxWidth="xl">
            <div className={styles.testimonialHeader}>
              <p>Trusted locally</p>
              <h2>What clients notice after the clean.</h2>
            </div>
            <div className={styles.testimonialContainer}>
              {testimonialData.slice(0, 3).map((item) => (
                <figure className={styles.testimonial} key={item.name}>
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

        <section className={styles.photoProofSection}>
          <Container maxWidth="xl">
            <div className={styles.photoHeader}>
              <p>Real Tauranga homes</p>
              <h2>A closer look at the detail.</h2>
            </div>
            <QuotePhotoGrid images={quotePhotos} />
          </Container>
        </section>
      </main>
      <Footer showCTA={false} />
    </>
  );
}
