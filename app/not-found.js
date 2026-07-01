import NotFoundPage from "@/components/Pages/NotFoundPage/NotFoundPage";
import Footer from "@/components/UI/Footer/Footer";
import Header from "@/components/UI/Header/Header";

export default function Custom404() {
  const phoneDisplay = process.env.PHONE || "07 572 2255";
  const phoneHref = `tel:${phoneDisplay.replace(/[^\d+]/g, "")}`;

  return (
    <>
      <Header showBackgroundColor={1} />
      <main>
        <NotFoundPage phoneDisplay={phoneDisplay} phoneHref={phoneHref} />
      </main>
      <Footer showCTA={false} />
    </>
  );
}
