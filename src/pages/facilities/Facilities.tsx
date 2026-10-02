import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeroFacilities from "../../components/facilities/HeroFacilities";
import PracticeFacilities from "../../components/facilities/PracticeFacilities";
import SupportFacilities from "../../components/facilities/SupportFacilities";

export default function Facilities() {
    return(
        <>
            <Navbar />
            <main>
                <HeroFacilities />
                <PracticeFacilities />
                <SupportFacilities />
            </main>
            <Footer />
        </>
    )
}
