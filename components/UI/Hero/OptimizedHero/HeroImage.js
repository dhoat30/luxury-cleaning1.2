import { getPageData } from "@/utlis/fetchData";
import Image from "next/image";

export default async function HeroImage({ slug }) {
    const data = await getPageData(slug);

    if (!data.length) return null
    const heroData = {
        desktopImage: data[0].acf.hero_slider[0]?.desktop_image,
        mobileImage: data[0].acf.hero_slider[0]?.mobile_image,
    };
    return (
        <div className="image-wrapper" style={{
            width: "100%", top: 0, left: 0, position: "absolute", height: "100%", zIndex: 1
        }}>
            <Image
                src={heroData.desktopImage?.url}
                alt={heroData.desktopImage?.alt ? heroData.desktopImage.alt : heroData.title}
                fill
                priority={true}
                sizes="100vw"
            />
        </div>

    )
}