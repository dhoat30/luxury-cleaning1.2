import Footer from "@/components/UI/Footer/Footer";
import Header from "@/components/UI/Header/Header";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Container from "@mui/material/Container";
import { getGalleryImages } from "@/utlis/galleryImages";
import { testimonialData } from "@/utlis/testimonialData";
import QuotePhotoGrid from "./QuotePhotoGrid";
import SpringCleaningQuoteForm from "./SpringCleaningQuoteForm";
import styles from "./SpringCleaningQuotePage.module.scss";

export const metadata = {
  title: "Spring Cleaning Quote Tauranga | Fixed-Price Deep Clean",
  description:
    "Request a fixed-price spring cleaning quote for your Tauranga or Bay of Plenty home. Free home visit, completed checklist, and money-back guarantee.",
  metadataBase: new URL("https://luxurycleaning.nz"),
  alternates: {
    canonical: "https://luxurycleaning.nz/services/spring-cleaning/get-a-quote",
  },
  openGraph: {
    title: "Spring Cleaning Quote Tauranga | Fixed-Price Deep Clean",
    description:
      "Get a fixed-price spring cleaning quote from Luxury Cleaning's insured Tauranga team.",
    url: "https://luxurycleaning.nz/services/spring-cleaning/get-a-quote",
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

const quotePageSections = [
  {
    acf_fc_layout: "quote_content",
    eyebrow: "SPRING CLEANING QUOTE · TAURANGA",
    headline: "Get your <strong>fixed-price</strong> spring cleaning quote in Tauranga",
    subhead:
      "Tell us a little about your home and we'll arrange your free home visit. You'll receive one clear price — no surprises, no obligation.",
  
    trust_items: [
      "Fixed-price quote before we start",
            "Money-back guarantee",

      "Completed checklist after every clean",
      "$5 million liability insurance",
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

  },
  {
    acf_fc_layout: "quote_form",
    title: "Request your quote",
    subtitle: "We'll get back to you personally — usually within a few hours.",
    fields: [
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
    submit_label: "Get My Fixed-Price Quote",
    fine_print: "🔒 Your details are safe & never shared",
  },
];

const quoteContent = quotePageSections.find(
  (section) => section.acf_fc_layout === "quote_content"
);
const quoteForm = quotePageSections.find(
  (section) => section.acf_fc_layout === "quote_form"
);
const quotePhotos = getGalleryImages({ limit: 12, startsWith: "IMG_" });

export default function SpringCleaningQuotePage() {
  const phoneDisplay =
    process.env.PHONE || quoteContent?.call_prompt?.phone_display;
  const phoneHref = phoneDisplay
    ? `tel:${phoneDisplay.replace(/[^\d+]/g, "")}`
    : quoteContent?.call_prompt?.phone_href;

  return (
    <>
      <Header showBackgroundColor={1} />
      <main className={styles.page}>
        <section className={styles.hero}>
          <Container maxWidth="xl" className={styles.container}>
            {quoteContent && (
              <div className={styles.content}>
                <p className={styles.eyebrow}>{quoteContent.eyebrow}</p>
                <h1 dangerouslySetInnerHTML={{ __html: quoteContent.headline }} />
                <p className={styles.lede}>{quoteContent.subhead}</p>


                {!!quoteContent.trust_items?.length && (
                  <ul className={styles.trustList}>
                    {quoteContent.trust_items.map((item) => (
                      <li key={item}>
                        <CheckCircleOutlineIcon aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {quoteContent.what_next && (
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
                )}
                {quoteContent.call_prompt && (
                  <div className={styles.phoneBox}>
                    <span>{quoteContent.call_prompt.label}</span>
                    <a href={phoneHref}>
                      Call {phoneDisplay}
                    </a>
                  </div>
                )}
              </div>
            )}

            {quoteForm && (
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
                    process.env.NEXT_PUBLIC_GOOGLE_API_KEY ||
                    process.env.GOOGLE_API_KEY
                  }
                />
              </div>
            )}
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
