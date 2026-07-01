import Footer from "@/components/UI/Footer/Footer";
import Header from "@/components/UI/Header/Header";
import Layout from "@/components/UI/Layout/Layout";
import { uspStripData } from "@/utlis/uspStripData";

export const metadata = {
  title: "Regular House Cleaning Tauranga | Luxury Cleaning",
  description:
    "Reliable weekly, fortnightly, or monthly house cleaning in Tauranga. Same trusted team, fixed price, no lock-in contracts, and fully insured local cleaners.",
  metadataBase: new URL("https://luxurycleaning.nz"),
  alternates: {
    canonical: "https://luxurycleaning.nz/services/regular-cleaning",
  },
  openGraph: {
    title: "Regular House Cleaning Tauranga | Luxury Cleaning",
    description:
      "Ongoing home cleaning in Tauranga from the same trusted local team, with fixed pricing and no lock-in contracts.",
    url: "https://luxurycleaning.nz/services/regular-cleaning",
    siteName: "Luxury Cleaning",
    images: [
      {
        url: "/home/regular-cleaning.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

const regularCleaningSections = [
  {
    acf_fc_layout: "hero",
    eyebrow: "SERVING TAURANGA · MOUNT MAUNGANUI · PĀPĀMOA",
    headline_variant: "A",
    headline_variants: {
      A: "<strong>Regular House Cleaning</strong> in Tauranga",
      B: "Never think about cleaning again — reliable, ongoing home cleaning in Tauranga",
      C: "Your home, effortlessly spotless — week after week, no contracts",
    },
    subhead:
      "Reliable weekly, fortnightly or monthly cleaning from a team who get to know your home. The same friendly faces every visit, a fixed price, and no lock-in contracts — just a home that always feels cared for.",
    primary_cta: { label: "Get My Fixed-Price Quote", url: "/get-a-quote" },
    secondary_cta: { label: "Call 07 572 2255", url: "tel:075722255" },
    trust_items: [
      "Same team every clean",
      "No lock-in contracts",
      "Fully insured local team",
    ],
    summary: {
      title: "Reliable cleaning you can set and forget.",
    },
    graphic: {
      src: "/regular-cleaning/hero.png",
      alt: "Regular house cleaning in a Tauranga home",
      priority: true,
    },
  },
  uspStripData,
  {
    acf_fc_layout: "video",
    placeholder_image: "/spring-cleaning/video-placeholder.jpg",
    youtube_id: "IVx0qtpwBJE",
  },
  {
    acf_fc_layout: "problem",
    headline:
      "We understand the frustration of trying to find a cleaner you can <strong>rely on, week after week</strong>.",
    points: [
      "A <strong>different stranger</strong> turns up every visit — and you re-explain everything each time.",
      "You're <strong>locked into a contract</strong> you can't easily get out of.",
      "Quality is <strong>great one week, rushed the next</strong> — you never quite know.",
      "They <strong>cancel or no-show</strong>, and your whole week is thrown out.",
      "One cleaner, <strong>half a day gone</strong> — your home and your schedule tied up.", 
      "The price <strong>creeps up</strong>, or 'extras' appear on the invoice.",
    ],
    closing:
      "Ongoing cleaning should feel effortless and certain — not like something you have to manage.<br><strong>The same team, a fixed price, no contracts. Cleaning you can simply forget about.</strong>",
    primary_cta: { label: "Get My Fixed-Price Quote", url: "/get-a-quote" },
  },
  {
    acf_fc_layout: "solution_bento",
    eyebrow: "WHY TAURANGA TRUSTS US",
    headline: "Cleaning you can rely on — <strong>down to the last detail</strong>.",
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
        row_span: 4,
                media_type: "icon",
        icon:"FactCheckOutlinedIcon", 
        title: "A completed checklist, every clean",
        body: "We leave a finished, room-by-room checklist behind — so you can see <strong>exactly what's been done</strong>, not just hope it was.",
      },
    {
        size: "wide",
        tone: "dark",
        column_span: 3,
        row_span: 4,
        media_type: "icon",
        icon: "VerifiedOutlinedIcon",
          title: "The same trusted team, every clean",
  body: "You'll have a consistent, all-female team who get to know your home and exactly how you like it — never a rotating cast of strangers. Every cleaner is <strong>background-checked through the Ministry of Justice</strong>, with records available on request. <strong>Familiar, trusted, reliable.</strong>",
      },

        {
        size: "wide",
        tone: "dark",
        column_span: 4,
        row_span: 2,
        media_type: "icon",
            icon: "PeopleAltOutlined",
        title: "2 cleaners — twice as fast",
        body: "We send a <strong>team of two</strong> to every clean — so your home is done in a fraction of the time, not one cleaner stretched across half your day.",
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
        column_span: 4,
        row_span: 4,
        aspect_ratio: "1/1",
        object_fit: "cover",
        object_position: "center bottom",
        media_type: "image",
        graphicTitle: "Professional Team", 
        image: { src: "/regular-cleaning/toilet-paper.jpg", alt: "Luxury Cleaning trained team at work" },
      },
   
      {
        size: "standard",
        column_span: 4,
        row_span: 2,
        media_type: "icon",
        icon: "refresh",
        title: "No lock-in contracts",
        body: "Total flexibility — <strong>pause, change or cancel any time</strong>. We earn your business every visit.",
      },
         {
        size: "feature",
        column_span: 4,
        row_span: 2,
        media_type: "image",
       
        image: {
          src: "/regular-cleaning/noor-image-2.jpg",
          alt: "The same trusted cleaning team every visit",
        },
      },
      {
        size: "standard",
        column_span: 4,
        row_span: 2,
        media_type: "icon",
        icon: "shield",
        title: "$5 million insured",
        body: "Fully insured up to <strong>$5 million</strong> — your home is completely protected, every visit.",
      },
      {
        size: "standard",
        column_span: 4,
        row_span: 2,
        media_type: "icon", 
        icon: "WorkspacePremiumOutlined", 
        title: "Premium products only",
        body: "<strong>Surface-safe, premium products</strong> — tough on grime, gentle on your home and finishes.",
      },
    ],
  },
  {
    acf_fc_layout: "frequency_options",
    eyebrow: "FIND YOUR RHYTHM",
    headline: "Cleaning that fits your life.",
    intro:
      "Whatever your home and schedule need, we'll find a rhythm that suits — and you can change it any time.",
    options: [
      {
        title: "Weekly",
        body: "Ideal for busy families and larger homes — a consistently spotless home, all the time.",
      },
      {
        title: "Fortnightly",
        body: "Our most popular choice — the perfect balance of value and a home that always feels fresh.",
      },
      {
        title: "Monthly",
        body: "A regular reset to stay on top of the deeper jobs and keep your home cared for.",
      },
      {
        title: "Flexi cleaning",
        tone: "dark",
        body: "Need us occasionally? Book an on-call clean whenever it is required, subject to team availability.",
      },
    ],
    note: "Every regular clean covers kitchens, bathrooms, living areas and bedrooms — dusted, wiped, vacuumed and mopped, top to bottom. Add extras like interior windows or inside the oven any time.",
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
    acf_fc_layout: "faq",
    eyebrow: "GOOD TO KNOW",
    headline: "Your questions, answered.",
    faqs: [
      {
        q: "Will I really get the same cleaners each time?",
        a: "Yes — we match you with a regular team who get to know your home. If someone's ever away, we'll always introduce a replacement and brief them on your preferences first.",
      },
      {
        q: "Am I locked into a contract?",
        a: "Never. There are no fixed terms — pause, change your frequency, or cancel any time. We'd rather earn your business each visit.",
      },
      {
        q: "Do I need to be home?",
        a: "Whatever suits you. Many clients give us secure access and simply come home to a spotless house.",
      },
      {
        q: "Do I need to provide products or equipment?",
        a: "No — our team arrives fully equipped with premium, surface-safe products every visit.",
      },
      {
        q: "How do you price it?",
        a: "We give you one fixed price after a free home visit, based on your home and how often you'd like us. No hourly surprises.",
      },
      {
        q: "What if I'm not happy with a clean?",
        a: "Tell us within 24 hours and we'll put it right free of charge — backed by our money-back guarantee, every visit.",
      },
    ],
  },
    {
    acf_fc_layout: "guarantee_band",
    theme: "dark",
    badge: { src: "/money-back.png", alt: "100% money-back guarantee badge" },
    image: {
      src: "/money-back-graphic.jpg",
      alt: "Team cleaning a basin",
    },
    eyebrow: "OUR PROMISE TO YOU",
    headline: "Not happy with a clean? <strong>You don't pay.</strong>",
    body: "Every single visit is backed by our money-back guarantee — not just your first. Here's how it works:",
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
        text: "If we still can't meet your expectations, that clean is <strong>on us</strong>. No fuss.",
      },
    ],
    reassurance:
      "Consistent quality, every visit — guaranteed. That's why our clients stay with us.",
    primary_cta: { label: "Get My Fixed-Price Quote", url: "/get-a-quote" },
  },
];

export default function RegularCleaningRoute() {
  return (
    <>
      <Header />
      <main>
        <Layout sections={regularCleaningSections} />
      </main>
      <Footer showCTA={false} />
    </>
  );
}
