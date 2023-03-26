import React from 'react';

import favicon from '../favicon.svg';
import op from "../images/op.svg";
import scroll from "../images/scroll.png";
import eth from "../images/eth.svg";
import ape from "../images/ape.svg";

function Integrations() {
  return (
    <section className="relative">
      {/* Bottom vertical line */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-slate-800">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12">
            <h2 className="h2 font-hkgrotesk">An ecosystem of integrations</h2>
          </div>
          {/* Logo animation */}
          <div className="relative flex flex-col items-center p-16">
            {/* Blurred dots */}
            <svg className="absolute top-1/2 -translate-y-1/2" width="557" height="93" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="hlogo-blurreddots-a">
                  <feGaussianBlur stdDeviation="2" in="SourceGraphic" />
                </filter>
                <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="blurreddots-b">
                  <feGaussianBlur stdDeviation="2" in="SourceGraphic" />
                </filter>
                <filter x="-150%" y="-150%" width="400%" height="400%" filterUnits="objectBoundingBox" id="blurreddots-c">
                  <feGaussianBlur stdDeviation="6" in="SourceGraphic" />
                </filter>
                <filter x="-150%" y="-150%" width="400%" height="400%" filterUnits="objectBoundingBox" id="blurreddots-d">
                  <feGaussianBlur stdDeviation="4" in="SourceGraphic" />
                </filter>
                <filter x="-150%" y="-150%" width="400%" height="400%" filterUnits="objectBoundingBox" id="blurreddots-e">
                  <feGaussianBlur stdDeviation="4" in="SourceGraphic" />
                </filter>
                <filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="blurreddots-f">
                  <feGaussianBlur stdDeviation="2" in="SourceGraphic" />
                </filter>
                <filter x="-100%" y="-100%" width="300%" height="300%" filterUnits="objectBoundingBox" id="blurreddots-g">
                  <feGaussianBlur stdDeviation="4" in="SourceGraphic" />
                </filter>
                <filter x="-150%" y="-150%" width="400%" height="400%" filterUnits="objectBoundingBox" id="blurreddots-h">
                  <feGaussianBlur stdDeviation="6" in="SourceGraphic" />
                </filter>
                <filter x="-150%" y="-150%" width="400%" height="400%" filterUnits="objectBoundingBox" id="blurreddots-i">
                  <feGaussianBlur stdDeviation="4" in="SourceGraphic" />
                </filter>
                <filter x="-75%" y="-75%" width="250%" height="250%" filterUnits="objectBoundingBox" id="blurreddots-j">
                  <feGaussianBlur stdDeviation="2" in="SourceGraphic" />
                </filter>
              </defs>
              <g fill="none" fillRule="evenodd">
                <g className="fill-indigo-600" transform="translate(437 8)">
                  <circle fillOpacity=".64" filter="url(#blurreddots-a)" cx="6" cy="66" r="6" />
                  <circle fillOpacity=".32" filter="url(#blurreddots-b)" cx="90" cy="6" r="6" />
                  <circle fillOpacity=".64" filter="url(#blurreddots-c)" cx="90" cy="66" r="6" />
                  <circle fillOpacity=".32" filter="url(#blurreddots-d)" cx="6" cy="36" r="4" />
                  <circle fillOpacity=".32" filter="url(#blurreddots-e)" cx="60" cy="36" r="4" />
                  <circle fillOpacity=".64" cx="34" cy="22" r="2" />
                  <circle fillOpacity=".32" cx="34" cy="50" r="2" />
                  <circle fillOpacity=".64" cx="118" cy="22" r="2" />
                  <circle fillOpacity=".32" cx="118" cy="50" r="2" />
                </g>
                <g className="fill-indigo-600" transform="matrix(-1 0 0 1 120 8)">
                  <circle fillOpacity=".64" filter="url(#blurreddots-f)" cx="6" cy="66" r="6" />
                  <circle fillOpacity=".32" filter="url(#blurreddots-g)" cx="90" cy="6" r="6" />
                  <circle fillOpacity=".64" filter="url(#blurreddots-h)" cx="90" cy="66" r="6" />
                  <circle fillOpacity=".32" filter="url(#blurreddots-i)" cx="6" cy="36" r="4" />
                  <circle fillOpacity=".64" filter="url(#blurreddots-j)" cx="60" cy="36" r="4" />
                  <circle fillOpacity=".32" cx="34" cy="22" r="2" />
                  <circle fillOpacity=".32" cx="34" cy="50" r="2" />
                  <circle fillOpacity=".64" cx="118" cy="22" r="2" />
                  <circle fillOpacity=".32" cx="118" cy="50" r="2" />
                </g>
              </g>
            </svg>
            <div className="relative w-32 h-32 flex justify-center items-center">
              {/* Halo effect */}
              <svg className="absolute inset-0 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none h-auto max-w-[200%]" width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="lg-1">
                    <stop stopColor="#0F172A" stopOpacity="0%" offset="0%" />
                    <stop stopColor="#0F172A" offset="100%" />
                  </linearGradient>
                </defs>
                <g className="fill-indigo-600 opacity-75" fillRule="evenodd">
                  <circle className="pulse" cx="400" cy="400" r="200" />
                  <circle className="pulse pulse-1" cx="400" cy="400" r="200" />
                  <circle className="pulse pulse-2" cx="400" cy="400" r="200" />
                  <circle className="pulse pulse-3" cx="400" cy="400" r="200" />
                  <rect fill="url(#lg-1)" width="800" height="800" />
                </g>
              </svg>
             <img src={favicon} width="128" height="128" alt="Favicon" />
            </div>
          </div>
          {/* Integration boxes */}
          <div className="relative max-w-xs sm:max-w-md mx-auto md:max-w-6xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10 md:mt-20">
            {/* Top vertical line */}
            <div className="hidden md:block absolute w-0.5 h-8 -top-16 -mt-2 bg-slate-600 left-1/2 -translate-x-1/2" aria-hidden="true" />


            <div className="relative flex justify-center items-center bg-slate-800 aspect-square p-2" data-aos="fade-up" data-aos-delay="200">
              {/* Inner lines */}
              <div className="hidden md:block absolute inset-0 w-[calc(100%+24px)] h-6 -top-10 left-1/2 -translate-x-1/2" aria-hidden="true">
                <div className="absolute w-0.5 h-full bg-slate-600 left-1/2 -translate-x-1/2" />
                <div className="absolute w-1/2 h-0.5 right-0 bg-slate-600" />
              </div>
              {/* Circle */}
              <div className="bg-gradient-to-t from-slate-800 to-slate-900 w-36 h-36 rounded-full flex justify-center items-center">
                {/* Icon */}
                <img src={eth} width="60" height="55" alt="Icon 03" />
              </div>
            </div>
            <div className="relative flex justify-center items-center bg-slate-800 aspect-square p-2" data-aos="fade-up" data-aos-delay="300">
              {/* Inner lines */}
              <div className="hidden md:block absolute inset-0 w-[calc(100%+24px)] h-6 -top-10 left-1/2 -translate-x-1/2" aria-hidden="true">
                <div className="absolute w-0.5 h-full bg-slate-600 left-1/2 -translate-x-1/2" />
                <div className="absolute w-full h-0.5 bg-slate-600" />
              </div>
              {/* Circle */}
              <div className="bg-gradient-to-t from-slate-800 to-slate-900 w-36 h-36 rounded-full flex justify-center items-center">
                {/* Icon */}
                <img src={op} width="80" height="65" alt="Icon 04" />
              </div>
            </div>
            <div className="relative flex justify-center items-center bg-slate-800 aspect-square p-2" data-aos="fade-up" data-aos-delay="400">
              {/* Inner lines */}
              <div className="hidden md:block absolute inset-0 w-[calc(100%+24px)] h-6 -top-10 left-1/2 -translate-x-1/2" aria-hidden="true">
                <div className="absolute w-0.5 h-full bg-slate-600 left-1/2 -translate-x-1/2" />
                <div className="absolute w-full h-0.5 bg-slate-600" />
              </div>
              {/* Circle */}
              <div className="bg-gradient-to-t from-slate-800 to-slate-900 w-36 h-36 rounded-full flex justify-center items-center">
                {/* Icon */}
                <img src={scroll} width="110" height="90" alt="Icon 05" />
              </div>
            </div>
            <div className="relative flex justify-center items-center bg-slate-800 aspect-square p-2" data-aos="fade-up" data-aos-delay="500">
              {/* Inner lines */}
              <div className="hidden md:block absolute inset-0 w-[calc(100%+24px)] h-6 -top-10 left-1/2 -translate-x-1/2" aria-hidden="true">
                <div className="absolute w-0.5 h-full bg-slate-600 left-1/2 -translate-x-1/2" />
                <div className="absolute w-1/2 h-0.5 bg-slate-600 left-0" />
              </div>
              {/* Circle */}
              <div className="bg-gradient-to-t from-slate-800 to-slate-900 w-36 h-36 rounded-full flex justify-center items-center">
                {/* Icon */}
                <img src={ape} width="128" height="128" alt="Icon 06" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Integrations;
