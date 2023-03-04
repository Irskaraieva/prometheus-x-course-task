import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return ( 
        <>
        <Header />
        <main className="main">
            <Outlet />
        </main>
        <Footer />
        </>
     );
}
 
export default Layout;