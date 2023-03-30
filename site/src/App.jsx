import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import 'aos/dist/aos.css';
import './css/style.css';

import AOS from 'aos';

import Home from './pages/Home';
import Developers from './pages/Developers';
import Users from './pages/Users';
import ResetPassword from './pages/ResetPassword';
import LinkWalletButton from './utils/LinkWalletButton';
import { WalletProvider, useWallet} from './utils/WalletContext';

function App() {

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 500,
      easing: 'ease-out-cubic',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
    <WalletProvider>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Developers" element={<Developers />} />
        <Route path="/Users" element={<Users />} />
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
      </Routes>
    </WalletProvider>
    </>
  );
}

export default App;
