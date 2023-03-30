import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Illustration from '../images/hero-illustration.svg';
import HeroImage from '../images/hero-image.png';
// import ImageModal from '../utils/KaptchaModal';
import Modal from "../utils/Modal";
// import ThreeDModel from '../utils/ThreeDModel';
import TerminalWindow from '../utils/TerminalWindow';
const codeString = "// implement ZKaptcha anti-bot in your smart contract\nzkaptcha = ZKaptchaInterface.at(\"0cnkjrng30tgn\"); \nfunction mint() {\n\tassert(verify.verifyCaptcha(params)); \n\t// ...\n}";
// const modelPath = "../spherebot.glb"



function Hero() {
  // useEffect(() => {
  //   if (typeof window.Turnstile !== 'undefined') {
  //     const turnstile = new window.Turnstile({
  //       // Your Turnstile configuration options go here
  //     });
  //   }
  // }, []);


  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [checked, setCheck] = useState(false);
  return (
    <section className="relative">
      {/* Illustration */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none -z-10" aria-hidden="true">
        <img src={Illustration} className="max-w-none" width="1440" height="1265" alt="Hero Illustration" />
      </div>

      {/* <ThreeDModel modelUrl={modelPath} /> */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 md:pt-40">
          {/* Hero content */}
          <div className="max-w-3xl mx-auto text-center">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-hkgrotesk mb-6 text-white inline-block bg-gradient-to-r from-purple-800/75 via-teal-500/75 to-purple-800/75 px-4 py-1.5 rounded-lg"
              data-aos="fade-up"
            >
              Protecting smart contracts from bots.
            </h1>
            <p className="text-xl text-slate-400 mb-10" data-aos="fade-up" data-aos-delay="100">
               ZKaptcha uses zero knowledge proofs to create sybil-resistant smart contracts.
            </p>
            <div
              className="max-w-xs mx-auto sm:max-w-none sm:inline-flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className='grid grid-cols-2 gap-4 mb-4'>
                <div>
                  <Link className="btn text-white bg-indigo-500 hover:bg-indigo-600 w-full shadow-sm group rounded-full" to="/Developers">
                    For Developers 👩‍💻
                    <span className="tracking-normal text-sky-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                    </span>
                  </Link>
                </div>
                <div>
                  <Link className="btn text-white bg-indigo-500 hover:bg-indigo-600 w-full shadow-sm group rounded-full" to="/Users">
                    For Users 🙋‍♂️
                    <span className="tracking-normal text-sky-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
