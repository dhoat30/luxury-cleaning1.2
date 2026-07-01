import Footer from '@/components/UI/Footer/Footer';
import Header from '@/components/UI/Header/Header';
import ThankYou from '@/components/UI/ThankYou/ThankYou';

export const metadata = {
    metadataBase: new URL('https://luxurycleaning.nz'),
    title: 'Thank You',
    robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
            index: false,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default async function Page() {
    return (
        <>
            <Header showBackgroundColor={1} />
            <main>
                <ThankYou />
            </main>
            <Footer showCTA={false} />
        </>

    )
}
