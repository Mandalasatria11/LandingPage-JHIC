import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import MajorDetail from "./pages/majors/MajorDetail";
import NotFound from "./pages/notfound/NotFound";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return(
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tentang" element={<About />} />
        <Route path="/jurusan/:slug" element={<MajorDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
