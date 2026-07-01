import { Suspense } from "react";
import Skeleton from "../../Skeleton/Skeleton";
import { getPageData } from "@/utlis/fetchData";
import HeroContent from "./HeroContent";
import styles from './Hero.module.css'
import HeroImage from "./HeroImage";
export default async function OptimizedHero({ slug }) {
    // add timout to simulate loading

    const data = await getPageData(slug);

    // if (!data.length) return null
    const heroData = {
        subtitle: data[0].acf?.hero_slider[0]?.subtitle,
        title: data[0].acf.hero_slider[0]?.title,
        description: data[0].acf.hero_slider[0]?.description,
        desktopImage: data[0].acf.hero_slider[0]?.desktop_image,
        mobileImage: data[0].acf.hero_slider[0]?.mobile_image,
        ctaLabel: data[0].acf.hero_slider[0]?.link?.title,
        ctaLink: data[0].acf.hero_slider[0]?.link?.url,
    };

    return (
        <>
            <section className={`${styles.heroSection}`}>
                <div className={`${styles.container} `}>
                    <HeroContent title={heroData.title} subtitle={heroData.subtitle} description={heroData.description} ctaLabel={heroData.ctaLabel} ctaLink={heroData.ctaLink} />
                    <Suspense fallback={<Skeleton
                        variant="dark"
                        position="absolute"
                        height="100%"
                    />}>
                        <HeroImage slug={slug} />
                    </Suspense>
                </div>

            </section>


        </>

    )
}