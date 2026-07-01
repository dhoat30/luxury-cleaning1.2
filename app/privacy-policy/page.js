import HtmlPageTemplate from '@/components/Pages/HtmlPageTemplate/HtmlPageTemplate'
import Footer from '@/components/UI/Footer/Footer'
import Header from '@/components/UI/Header/Header'
import { getPageData } from '@/utlis/fetchData'



export async function generateMetadata({ params, searchParams }, parent) {


    // fetch data
    const data = await getPageData("privacy-policy")
    if (data.length > 0) {
        const seoData = data[0].yoast_head_json
        return {
            title: seoData.title,
            description: seoData.description,
            metadataBase: new URL('https://luxurycleaning.nz'),
            openGraph: {
                title: seoData.title,
                description: seoData.description,
                url: 'https://luxurycleaning.nz',
                siteName: 'Luxury Cleaning',
                images: [
                    {
                        url: seoData.og_image[0] && seoData.og_image[0].url,
                        width: 800,
                        height: 600,
                    },
                    {
                        url: seoData?.og_image[0] && seoData.og_image[0].url,
                        width: 1800,
                        height: 1600,
                    },
                ],
                type: 'website',
            },
        }
    }

}

export default async function Page() {



    const data = await getPageData("privacy-policy")
    return (
        <>
            <Header showBackgroundColor={1} />
            <main >
                <HtmlPageTemplate pageData={data[0]} />
            </main>
            <Footer showCTA={false} />
        </>

    )
}
