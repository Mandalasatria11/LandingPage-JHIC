import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeroTeachers from "../../components/teachers/HeroTeachers";
import LeadersTeachers from "../../components/teachers/LeadersTeachers";
import KaprogTeachers from "../../components/teachers/KaprogTeachers";
import DirectoryTeachers from "../../components/teachers/DirectoryTeachers";

export default function Teachers() {
    return(
        <>
            <Navbar />
            <main>
                <HeroTeachers />
                {/* Latar section bergantian: putih, gelap, abu-abu */}
                <LeadersTeachers />
                <KaprogTeachers />
                <DirectoryTeachers />
            </main>
            <Footer />
        </>
    )
}
