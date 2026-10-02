import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ListNews from "../../components/news/ListNews";

export default function News() {
    return(
        <>
            <Navbar />
            <main>
                <ListNews />
            </main>
            <Footer />
        </>
    )
}
