import React from 'react'
import { PowerIcon } from '@heroicons/react/24/outline';
import { LogOut } from 'lucide-react';
import Heading from './Heading';
import NavLinks from './NavLinks';
import { Link } from 'react-router-dom';
import AccountAvatar from './AccountAvatar';
import { googleLogout } from '@react-oauth/google';

const Navbar = ({ navFlag, spaceName, handleClick }) => {

  const handleLogout = () => {
    console.log("clicked");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("picture");
    googleLogout();
    window.location.reload();
  }

  return (
    <div className="flex h-full flex-col p-1">
      <Link
        className="mb-2 flex h-16 items-end justify-start rounded-md bg-blue-500 hover:bg-blue-600 px-2 py-4"
        to="/dashboard"
        onClick={(e) => handleClick(e)}
      >
        <div className="flex flex-cols gap-2 w-32 text-white md:w-20">
          <img className="h-9" src="sticky-notes.png" alt="Girl in a jacket"  />
          {/* width="500" height="600" */}
          <Heading>Testimonials</Heading>
          {/* TODO: add logo */}
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks navFlag={navFlag} handleClick={handleClick} />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form>
          <div className='flex flex-col gap-2'>
            <Link
              className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 "
              to={'/account'}
            >
              <AccountAvatar />
              <div className="hidden md:block">Account</div>
            </Link>
            <button
              onClick={() => handleLogout()}
              className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 "
            >
              {/* <PowerIcon className="w-6" /> */}
              <LogOut className="w-6" />
              <div className="hidden md:block">Sign Out</div>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Navbar