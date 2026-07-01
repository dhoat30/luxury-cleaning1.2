import Container from "@mui/material/Container";
import Footer from "@/components/UI/Footer/Footer";
import Header from "@/components/UI/Header/Header";
import { getGalleryImages } from "@/utlis/galleryImages";
import GalleryLightbox from "./GalleryLightbox";
import styles from "./GalleryPage.module.scss";

export const metadata = {
  title: "Cleaning Gallery Tauranga | Luxury Cleaning",
  description:
    "Browse Luxury Cleaning's gallery of detailed residential cleaning work across Tauranga and the Bay of Plenty.",
  metadataBase: new URL("https://luxurycleaning.nz"),
  alternates: {
    canonical: "https://luxurycleaning.nz/gallery",
  },
  openGraph: {
    title: "Cleaning Gallery Tauranga | Luxury Cleaning",
    description:
      "A closer look at Luxury Cleaning's residential cleaning work in Tauranga and the Bay of Plenty.",
    url: "https://luxurycleaning.nz/gallery",
    siteName: "Luxury Cleaning",
    images: [
      {
        url: "/gallery/IMG_4956.jpg",
        width: 4096,
        height: 2731,
      },
    ],
    type: "website",
  },
};

const galleryImages = getGalleryImages();

export default function GalleryPage() {
  return (
    <>
      <Header showBackgroundColor={1} />
      <main className={styles.page}>
        <section className={styles.hero}>
          <Container maxWidth="xl">
            <div className={styles.intro}>
              <p className={styles.eyebrow}>Gallery · Tauranga homes</p>
              <h1>See the detail in the clean.</h1>
              <p>
                A look inside the homes, finishes, and careful details our local
                team handles across Tauranga and the Bay of Plenty.
              </p>
            </div>
          </Container>
        </section>

        <section className={styles.gallerySection} aria-label="Cleaning gallery">
          <Container maxWidth="xl">
            <GalleryLightbox images={galleryImages} />
          </Container>
        </section>
      </main>
      <Footer showCTA={false} />
    </>
  );
}
