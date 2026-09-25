import { Navigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeroMajor from "../../components/majors/HeroMajor";
import FocusMajor from "../../components/majors/FocusMajor";
import CareerMajor from "../../components/majors/CareerMajor";
import OtherMajors from "../../components/majors/OtherMajors";
import NotFound from "../notfound/NotFound";
import { majors } from "../../data/majors";

export default function MajorDetail() {
    const { slug = "" } = useParams();
    const param = slug.toLowerCase();
    // Bisa dibuka lewat slug (/jurusan/rekayasa-perangkat-lunak) atau kode (/jurusan/rpl)
    const major = majors.find((m) => m.slug === param || m.code.toLowerCase() === param);

    if (!major) return <NotFound />;
    if (major.slug !== slug) return <Navigate to={`/jurusan/${major.slug}`} replace />;

    return(
        <>
            <Navbar />
            {/* key: animasi diulang saat pindah dari satu jurusan ke jurusan lain */}
            <main key={major.slug}>
                <HeroMajor major={major} />
                <FocusMajor major={major} />
                <CareerMajor major={major} />
                <OtherMajors current={major} />
            </main>
            <Footer />
        </>
    )
}
