import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
// import Footer from '../Footer/Footer'

export default function Layout() {
    return (
        <>
            <div className='flex flex-col min-h-screen'>
                <Navbar />
                <div className="container flex items-center mb-24 justify-center  flex-grow px-5">
                    <Outlet className="flex-grow"></Outlet>
                </div>
                {/* <Footer /> */}
            </div>

            {/* <Footer/> */}
        </>
    )
}
8