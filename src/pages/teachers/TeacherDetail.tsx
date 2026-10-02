import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProfileTeacher from "../../components/teachers/ProfileTeacher";
import DetailTeacher from "../../components/teachers/DetailTeacher";
import MoreTeachers from "../../components/teachers/MoreTeachers";
import NotFound from "../notfound/NotFound";
import { allTeachers, teacherGroup } from "../../data/teachers";

export default function TeacherDetail() {
    const { id } = useParams();
    const teacher = allTeachers.find((t) => t.id === id);

    if (!teacher) return <NotFound />;

    // Guru sekelompok (jurusan yang sama, mapel umum, atau pimpinan) didahulukan, sisanya menyusul sesuai urutan data
    // (sort bersifat stabil, jadi urutan asli tetap terjaga di dalam tiap kelompok)
    const group = teacherGroup(teacher);
    const others = allTeachers
        .filter((t) => t !== teacher)
        .sort((a, b) => Number(teacherGroup(b) === group) - Number(teacherGroup(a) === group))
        .slice(0, 4);

    return(
        <>
            <Navbar />
            {/* key: animasi & coretan diulang saat pindah dari satu profil guru ke profil lain */}
            <main key={teacher.id}>
                <ProfileTeacher teacher={teacher} />
                <DetailTeacher teacher={teacher} />
                <MoreTeachers items={others} />
            </main>
            <Footer />
        </>
    )
}
