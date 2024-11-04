import React, { useEffect, useState, useContext } from 'react'
import {
    PlusIcon,
    HomeIcon,
    QuestionMarkCircleIcon,
    DocumentMagnifyingGlassIcon,
    ArrowRightCircleIcon,
    ArrowRightEndOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { House, Plus, CircleHelp, ChartNoAxesCombined , Codepen } from 'lucide-react';
import { Link, useLocation  } from 'react-router-dom';
import { SpaceNameContext } from '../hooks/useContext'

const NavLinks = ({ navFlag, handleClick }) => {
    const { spaceName, setSpaceName } = useContext(SpaceNameContext);
    const [location, setLocation] = useState(useLocation());
    const [navFlag2, setNavFlag2] = useState(true);
    const hasSpaceWord = location.pathname.includes('space');
    useEffect(() => {
        console.log("spaceName in NavLinks", spaceName);
    }, [name]);
    const HomeLinks = [
        { name: 'Home', href: '/dashboard', icon: House },
    ];
    const dashBoardLinks = [
        { name: 'New Space', href: '/new', icon: Plus },
        // { name: 'Analytics', href: '/analytics', icon: DocumentMagnifyingGlassIcon },
        {
            name: 'Help',
            href: '/help',
            icon: CircleHelp,
        },
        { name: 'Test', href: '/space/testimonialGrid?spaceId=11', icon: CircleHelp },
    ];
    const spaceLinks = [
        // { name: 'New Space', href: '/new', icon: PlusIcon },
        {
            name: 'Back to Space', href: `/space/${spaceName}`, icon: Codepen
        },
        { name: 'Analytics', href: `/space/analytics/${spaceName}`, icon: ChartNoAxesCombined },
        // {
        //     name: 'Help',
        //     href: '/help',
        //     icon: QuestionMarkCircleIcon,
        // },
        // { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
    ];
    return (
        <>
            {HomeLinks.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        to={link.href}
                        onClick={(e) => handleClick(e)}
                        className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
            {navFlag && dashBoardLinks.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        to={link.href}
                        className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
            {!navFlag && spaceLinks.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        to={link.href}
                        className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                );
            })}
        </>
    )
}

export default NavLinks