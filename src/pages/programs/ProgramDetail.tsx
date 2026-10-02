import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ArticleProgram from "../../components/programs/ArticleProgram";
import MorePrograms from "../../components/programs/MorePrograms";
import DetailPageState from "../../components/DetailPageState";
import NotFound from "../notfound/NotFound";
import { useProgramDetail } from "../../lib/content";

export default function ProgramDetail() {
    const { slug } = useParams();
    // others = tiga program setelahnya sesuai urutan di beranda, kembali ke awal setelah program terakhir (disusun server)
    const { data, error, reload } = useProgramDetail(slug);

    if (error?.status === 404) return <NotFound />;
    if (!data) return <DetailPageState error={error} onRetry={reload} />;

    const program = data.data;

    return(
        <>
            <Navbar />
            {/* key: animasi & coretan diulang saat pindah dari satu program ke program lain */}
            <main key={program.slug}>
                <ArticleProgram program={program} />
                <MorePrograms items={data.others} />
            </main>
            <Footer />
        </>
    )
}
