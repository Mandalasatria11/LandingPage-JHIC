import HeroHome from "../../components/home/HeroHome";
import IntroHome from "../../components/home/IntroHome";
import WhyHome from "../../components/home/WhyHome";
import MajorsHome from "../../components/home/MajorsHome";
import ProgramsHome from "../../components/home/ProgramsHome";
import FacilitiesHome from "../../components/home/FacilitiesHome";
import NewsHome from "../../components/home/NewsHome";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Home() {
    return(
        <>
            <Navbar />
            <HeroHome />
            {/* Section setelah hero wajib "relative z-10" + background supaya bisa menutupi video */}
            <IntroHome />
            <WhyHome />
            <MajorsHome />
            <ProgramsHome />
            <FacilitiesHome />
            <NewsHome />
            <Footer />
        </>
    )
}
