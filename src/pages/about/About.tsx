import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeroAbout from "../../components/about/HeroAbout";
import HistoryAbout from "../../components/about/HistoryAbout";
import VisionAbout from "../../components/about/VisionAbout";
import IdentityAbout from "../../components/about/IdentityAbout";

export default function About() {
    return(
        <>
            <Navbar />
            <main>
                <HeroAbout />
                <HistoryAbout />
                <VisionAbout />
                <IdentityAbout />
            </main>
            <Footer />
        </>
    )
}
