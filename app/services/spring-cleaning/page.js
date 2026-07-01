import Footer from "@/components/UI/Footer/Footer";
import Header from "@/components/UI/Header/Header";
import Layout from "@/components/UI/Layout/Layout";
import { uspStripData } from "@/utlis/uspStripData";

export const metadata = {
  title: "Spring Cleaning Tauranga | Fixed-Price Deep Cleaning",
  description:
    "Book a meticulous spring cleaning service in Tauranga and the Bay of Plenty. Fixed-price quote, completed checklist, money-back guarantee, and fully insured local team.",
  metadataBase: new URL("https://luxurycleaning.nz"),
  alternates: {
    canonical: "https://luxurycleaning.nz/services/spring-cleaning",
  },
  openGraph: {
    title: "Spring Cleaning Tauranga | Fixed-Price Deep Cleaning",
    description:
      "A meticulous, top-to-bottom spring clean of your home with fixed pricing and a completed checklist.",
    url: "https://luxurycleaning.nz/services/spring-cleaning",
    siteName: "Luxury Cleaning",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
      },
    ],
    type: "website",
  },
};

const springCleaningSections = [
  {
    acf_fc_layout: "hero",
    eyebrow: "SERVING TAURANGA · MOUNT MAUNGANUI · PĀPĀMOA",
    headline_variant: "A",
    headline_variants: {
      A: "<strong>Spring Cleaning</strong> in Tauranga — One Price, No Hidden Fees",
      B: "The deep clean your home's been waiting for — without lifting a finger",
      C: "Spring cleaning, fixed price, fully checklisted. No surprises.",
    },
    subhead:
      "A meticulous, top-to-bottom deep clean of your home — fixed price, no surprises, and a completed checklist so you can see exactly what's been done. Let us handle it while you reclaim your weekend.",
    primary_cta: {
      label: "Get My Fixed-Price Quote",
      url: "/services/spring-cleaning/get-a-quote",
    },
    secondary_cta: {
      label: "Call 07 572 2255",
      url: "tel:075722255",
    },
    trust_items: [
      "Fixed-price quote",
      "Money-back guarantee",
      "Fully insured local team",
    ],
    summary: {
      title: "A visible reset for every room, finished with a completed checklist.",
    },
    graphic: {
      src: "/spring-cleaning/hero.png",
      alt: "Luxury spring cleaning service graphic",
      priority: true,
    },
  },
  uspStripData,
  {
    acf_fc_layout: "video",
    placeholder_image: "/spring-cleaning/video-placeholder.jpg",
    youtube_id: "0fkTuoruqMs",
  },
   {
    acf_fc_layout: "problem_section",
    headline:
      "We understand the frustration of trying to find <strong>a cleaner you can actually trust</strong>.",
    points: [
      "The deep-down jobs — oven, grout, skirting boards, window tracks — <strong>never quite get done</strong>.",
      "You've been let down before by cleaners who <strong>cancel, no-show, or cut corners</strong>.",
      "The quote you agreed to quietly <strong>turns into a bigger bill</strong> at the end.",
      "You never really know <strong>what got cleaned</strong> — and what got skipped.",
      "Something isn't right, and suddenly <strong>no one will come back</strong> to fix it.",
      "Another weekend <strong>vanishes into cleaning</strong> you never wanted to do anyway.",
    ],
    closing:
      "A spotless home shouldn't come with surprise invoices, no-shows, or crossed fingers.<br><strong>No surprises. No guesswork. Just a clean you can see — guaranteed.</strong>",
    primary_cta: {
      label: "Get My Fixed-Price Quote",
      url: "/services/spring-cleaning/get-a-quote",
    },
  },
  {
    acf_fc_layout: "solution_bento",
    eyebrow: "WHY TAURANGA TRUSTS US",
    headline: "Every detail covered — <strong>nothing left to chance</strong>.",
    tiles: [
      {
        size: "feature",
        column_span: 6,
        row_span: 4,
        aspect_ratio: "1 / 1",
        media_type: "image",
        image: { src: "/spring-cleaning/checklist.jpg", alt: "Completed cleaning checklist left after a clean" },
      },
      {
        size: "standard",
        column_span: 3,
        row_span: 2,
        
        title: "A completed checklist, every clean",
        body: "We leave a finished, room-by-room checklist behind — so you can see <strong>exactly what's been done</strong>, not just hope it was.",
      },
           {
        size: "feature",
        column_span: 3,
        row_span: 4,
        aspect_ratio: "4 / 8",
        media_type: "image",
        hide_on_mobile: true, 
        image: { src: "/spring-cleaning/noor-image.png", alt: "Noor cleaning oven" },
      },
      {
        size: "wide",
        tone: "dark",
        column_span: 4,
        row_span: 2,
        media_type: "icon",
        // icon: "shield",
        title: "$5 million liability insurance",
        body: "Fully insured up to <strong>$5 million</strong> — your home and everything in it is completely protected, always.",
      },
   
      {
        size: "standard",
        column_span: 4,
        row_span: 4,
        aspect_ratio: "1/1",
        object_fit: "cover",
        object_position: "center bottom",
        media_type: "image",
        graphicTitle: "Professional Team", 
        image: { src: "/spring-cleaning/team.png", alt: "Luxury Cleaning trained team at work" },
      },
 
      
      {
        size: "standard",
        column_span: 3,
        row_span: 2,
        media_type: "icon",
        // icon: "calendar-check",
                tone: "dark",
        title: "Free home visit & fixed quote",
        body: "We visit your home, free of charge, and give you <strong>one fixed price</strong> — no obligation, no surprises.",
      },
       {
        size: "standard",
        column_span: 4,
        row_span: 4,
        aspect_ratio: "1 / 1",
        object_fit: "contain",
        media_type: "image",
        graphicTitle: "Premium products",
        graphic_title_color: "rgba(22, 87, 112, 0.68)",
        background: "radial-gradient(ellipse at 50% 72%, rgba(56, 91, 118, 0.2) 0%, rgba(56, 91, 118, 0.08) 28%, rgba(56, 91, 118, 0) 56%), radial-gradient(circle at 50% 42%, rgba(255, 255, 255, 0.94) 0%, rgba(236, 243, 247, 0.74) 34%, rgba(211, 224, 232, 0.46) 62%, rgba(184, 202, 214, 0.22) 100%), linear-gradient(180deg, #f7fafb 0%, #e7eef2 58%, #d4e0e7 100%)",

        image: { src: "/spring-cleaning/products.png", alt: "Premium cleaning products used by Luxury Cleaning" },
      },
      {
        size: "standard",
        column_span: 4,
        row_span: 2,
    
        title: "Premium products only",
        body: "We use <strong>premium, surface-safe products</strong> — tough on grime, gentle on your home and finishes.",
      },
    ],
  },
{
    acf_fc_layout: "process",
    eyebrow: "HOW IT WORKS",
    headline: "Getting started is simple",
    steps: [
      {
        numeral: "I",
        title: "Get in touch",
        body: "Call, email, or request a quote online — and we'll get straight back to you, in person.",
      },
      {
        numeral: "II",
        title: "Your free home visit",
        body: "We come to you, walk through the home together, and leave you with <strong>one fixed price</strong> — no obligation.",
      },
      {
        numeral: "III",
        title: "Sit back — we clean",
        body: "Approve your quote and pick a time. We handle every detail, then leave a <strong>completed checklist</strong> so you can see it all.",
      },
    ],
    primary_cta: {
      label: "Get My Fixed-Price Quote",
      url: "/services/spring-cleaning/get-a-quote",
    },
  },
  {
    acf_fc_layout: "testimonials",
    eyebrow: "Trusted locally",
    headline: "What clients notice after the clean.",
  },
  {
    acf_fc_layout: "guarantee_band",
    theme: "dark",                       // near-black #0A0807, gold accents
    badge: {
      src: "/money-back.png",   // the transparent PNG
      alt: "100% money-back guarantee badge",
    },
    image: { 
   src: "/money-back-graphic.jpg",  
      alt: "Team cleaning the basin"
    }, 
    eyebrow: "OUR PROMISE TO YOU",
    headline: "Don't love your clean? <strong>You don't pay.</strong>",
    body: "We're confident you'll be delighted — and we back every clean completely. Here's exactly how our money-back guarantee works:",
    steps: [
      {
        n: "1",
        text: "Let us know within <strong>24 hours</strong> of your clean.",
      },
      {
        n: "2",
        text: "We'll send the team straight back to <strong>put it right — free of charge</strong>.",
      },
      {
        n: "3",
        text: "If we still can't meet your expectations, you get a <strong>full refund</strong>. No fuss.",
      },
    ],
    reassurance: "No awkward conversations. No risk to you. Just a clean you can trust — or your money back.",
    primary_cta: {
      label: "Get My Fixed-Price Quote",
      url: "/services/spring-cleaning/get-a-quote",
    },
  },
];

export default function SpringCleaningRoute() {
  return (
    <>
      <Header />
      <main>
        <Layout sections={springCleaningSections} />
      </main>
      <Footer showCTA={false} />
    </>
  );
}
