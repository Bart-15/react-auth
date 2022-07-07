import {Outlet} from 'react-router-dom';
import Navbar from '../Navbar/NavBar';
import Footer from '../Footer/Footer';
const HomeLayout = () => {
    return (
        <>
         <section>
            <Navbar />
                <Outlet />
            <Footer />
         </section>
        </>
    )
}

export default HomeLayout;