import React, { useState, useContext, useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate, useLocation, useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import Heading from '../myComponets/Heading'
import Navbar from '../myComponets/Navbar'
import Home from './Home'
import Analytics from './Analytics'
import Help from './Help'
import Space from './Space'
import NewSpace from './NewSpace'
import Test from '../myComponets/test'
import Account from './Account'
import LoginSignup from './LoginSignup'
import { SpaceNameContext, SpaceContext, userContext } from '../hooks/useContext'
import Testimonials from './Testimonials'
import TestimonialGrid from './TestimonialGrid'
import NotFound from './404'
import SocialTwitterCard from '../myComponets/SocialTwitterCard'
// import Topbar from '../myComponets/Topbar'

// const spaces = [
//     {
//         link: "loremipsum"
//     },
//     {
//         link: "ipsumlorem"
//     }
// ];

const Dashboard = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const { user, setUser } = useContext(userContext);
    const [dashboardNavFlag, setDashboardNavFlag] = useState(true);
    const { spaceName, setSpaceName } = useContext(SpaceNameContext);
    const { spaces, setSpaces } = useContext(SpaceContext);
    // var spaces = [];
    // console.log(spaces);

    useEffect(() => {
        // if (user.email === undefined) {
        //     console.log(user);
        // }
        // setTimeout(() => { console.log(user); }, 1000);
        // console.log(location.pathname.includes(`/new`));

        if (location.pathname.includes(`/new`) || location.pathname.includes(`/testimonialGrid`)) {
            // console.log(1);
            // navigate(`/space/${id}/new`);
        }
        else if (user.email === undefined) {
            // console.log(2);
            navigate("/");
        } else {
            // console.log(3);
            // navigate("/dashboard");
        }

        // console.log(spaceName);
        if (location.pathname.includes("space")) {
            setDashboardNavFlag(false);
        } else {
            setDashboardNavFlag(true);
        }
    }, [])

    useEffect(() => {
        // spaces = space;
        setTimeout(() => {
            // console.log(spaces);
        }, 1000);
        // console.log(space);

    }, [spaces])

    const gotoSpace = (spaceName) => {
        console.log("clicked", spaceName);
        setDashboardNavFlag(!dashboardNavFlag);
        setSpaceName(spaceName);
    }

    const gotoHome = () => {
        setDashboardNavFlag(true);
    }

    return (
        <>
            {/* <BrowserRouter basename="/"> */}
            <div className="relative w-full min-h-[100dvh] bg-gradient-to-br from-blue-100 via-white to-gray-200 ">
            {/* <div className="relative w-full min-h-[100dvh] bg-gradient-to-br from-[#e0f2fe]/50 to-[#bae6fd]/50 overflow-hidden"> */}
                {/* <div className="relative w-full min-h-[100dvh] bg-gradient-to-br from-[#e1f0ff] to-[#d1e7ff] overflow-hidden" > */}
                {/* blur-[100px] */}
                <div className="flex h-screen flex-col md:flex-row md:overflow-hidden p-2">
                    {user.email !== undefined &&
                        // <></>
                        <div className="w-full md:w-64 md:flex-shrink-0">
                            <Navbar navFlag={dashboardNavFlag} handleClick={gotoHome} />
                            {/* <Navbar/> */}
                        </div>
                    }
                    <div className="flex-grow p-1 md:overflow-y-auto">
                        <Routes>
                            {/* <div className='flex h-16 w-full grow rounded-md bg-gray-100'>
                            <Topbar />
                        </div> */}

                            <Route path='/' element={<LoginSignup />} />
                            <Route path='/dashboard' element={<Home handleClick={gotoSpace} />} />
                            <Route path='/test' element={<Test />} />
                            <Route path='/new' element={<NewSpace setDashboardNavFlag={setDashboardNavFlag} />} />

                            <Route path='/help' element={<SocialTwitterCard />} />
                            <Route path='/' element={<Navigate to="/dashboard" />} />
                            <Route path='/space/test' element={<Space name="test" />} />
                            <Route path='/account' element={<Account />} />
                            <Route path={`/space/new`} element={<Testimonials />} />
                            <Route path={`/space/testimonialGrid`} element={<TestimonialGrid />} />
                            {
                                spaces.map((space, index) => {

                                    return (
                                        <React.Fragment key={space.link}>
                                            <Route path={`/space/${space.sname}`} element={<Space value={space} setDashboardNavFlag={setDashboardNavFlag} />} />
                                            <Route path={`/space/analytics/${space.sname}`} element={<Analytics name={space.sname} />} />
                                        </React.Fragment>
                                    )
                                })
                            }
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </div>
                </div>
            </div >
            {/* </BrowserRouter > */}
        </>
    )
}

export default Dashboard