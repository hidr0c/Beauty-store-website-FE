import { Outlet, useLocation } from "react-router-dom"
import Header from "../../ui/Header/Header"
import Footer from "../../ui/Footer/Footer"
import { useEffect } from "react";
import NProgress from "../../../../../config/nprogress";


export const MainLayout = () => {

    const location = useLocation();
    useEffect(() => {
        NProgress.start()
        NProgress.done()
    },[location.pathname])
    return (
        <>
            <Header />
                <Outlet />
            <Footer />
        </>
    )
}