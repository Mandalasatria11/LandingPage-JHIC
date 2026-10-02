import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeroNews from "../../components/news/HeroNews";
import ArticleNews from "../../components/news/ArticleNews";
import MoreNews from "../../components/news/MoreNews";
import DetailPageState from "../../components/DetailPageState";
import NotFound from "../notfound/NotFound";
import { useNewsDetail } from "../../lib/content";

export default function NewsDetail() {
    const { slug } = useParams();
    // latest = berita terbaru untuk sidebar; related = bagian bawah, kategori yang sama didahulukan
    // tanpa mengulang isi sidebar (keduanya disusun server)
    const { data, error, reload } = useNewsDetail(slug);

    if (error?.status === 404) return <NotFound />;
    if (!data) return <DetailPageState error={error} onRetry={reload} />;

    const item = data.data;

    return(
        <>
            <Navbar />
            {/* key: animasi & coretan diulang saat pindah dari satu berita ke berita lain */}
            <main key={item.slug}>
                <HeroNews item={item} />
                <ArticleNews item={item} latest={data.latest} />
                <MoreNews items={data.related} />
            </main>
            <Footer />
        </>
    )
}
