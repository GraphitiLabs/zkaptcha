import React from 'react';
import { Link } from 'react-router-dom';
import LinkWalletButton from '../utils/LinkWalletButton';
import iconsvg from "../favicon.svg";

function Header() {
  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="flex items-center">
            {/* Logo */}
            <Link className="flex items-center text-2xl" to="/" aria-label="ZKaptcha">
              <img className="w-10 h-10 mr-2 mb-2" src={iconsvg} alt="My SVG" />
              <span className='bg-gradient-to-r from-purple-800/75 to-teal-500/75 text-white transition duration-150 transform hover:text-transparent hover:bg-clip-text bg-clip-text'>
                ZKaptcha
              </span>
            </Link>
          </div>


          {/* Desktop navigation */}
          <nav className="flex grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              {/* <li>
                <Link className="font-medium text-slate-500 hover:text-slate-300 px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out" to="/signin">Sign in</Link>
              </li> */}
              <li className="ml-3">
                {/* <Link className="btn-sm text-white bg-indigo-500 hover:bg-indigo-600 w-full shadow-sm group rounded-full" to="/Connect">
                  Get Started <span className="tracking-normal text-sky-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">-&gt;</span>
                </Link> */}
                <LinkWalletButton title="Connect" className="btn-sm text-white bg-indigo-500 hover:bg-indigo-600 w-full shadow-sm group rounded-full">
                </LinkWalletButton>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
