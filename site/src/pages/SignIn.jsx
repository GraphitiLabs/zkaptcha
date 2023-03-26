import React from 'react';
import { Link } from 'react-router-dom';

import Illustration from '../images/auth-illustration.svg';

function SignIn() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Site header */}
      <header className="absolute w-full z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Site branding */}
            <div className="shrink-0 mr-4">
              {/* Logo */}
              <Link className="block" to="/" aria-label="Cruip">
                <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient x1="0%" y1="32.443%" x2="104.18%" y2="50%" id="hlogo-a">
                      <stop stopColor="#FFF" stopOpacity=".299" offset="0%" />
                      <stop stopColor="#7587E4" stopOpacity="0" offset="100%" />
                    </linearGradient>
                    <linearGradient x1="18.591%" y1="0%" x2="100%" y2="100%" id="hlogo-b">
                      <stop stopColor="#818CF8" offset="0%" />
                      <stop stopColor="#C7D2FE" offset="100%" />
                    </linearGradient>
                  </defs>
                  <g fill="none" fillRule="evenodd">
                    <path fill="#3730A3" d="M16 18.5V32l15.999-9.25V9.25z" />
                    <path fill="#4F46E5" d="m0 23 16 9V18.501L0 9.251z" />
                    <path fillOpacity=".64" fill="url(#hlogo-a)" d="M16 13 0 23l16 9 16-9z" />
                    <path fill="url(#hlogo-b)" d="M16 0 0 9.25l16 9.25 15.999-9.25z" />
                  </g>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="grow">
        <section className="relative">
          {/* Illustration */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none -z-10" aria-hidden="true">
            <img src={Illustration} className="max-w-none" width="1440" height="332" alt="Page Illustration" />
          </div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12">
                <h1 className="h2 font-hkgrotesk">Welcome back!</h1>
              </div>
              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-slate-400 font-medium mb-1" htmlFor="email">
                        Email
                      </label>
                      <input id="email" className="form-input text-sm py-2 w-full" type="email" required />
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <label className="block text-sm text-slate-400 font-medium mb-1" htmlFor="password">
                          Password
                        </label>
                        <Link className="text-sm font-medium text-indigo-500 ml-2" to="/reset-password">
                          Forgot?
                        </Link>
                      </div>
                      <input id="password" className="form-input text-sm py-2 w-full" type="password" autoComplete="on" required />
                    </div>
                  </div>
                  <div className="mt-6">
                    <button className="btn-sm text-sm text-white bg-indigo-500 hover:bg-indigo-600 w-full shadow-sm group">
                      Sign In{' '}
                      <span className="tracking-normal text-sky-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                        -&gt;
                      </span>
                    </button>
                  </div>
                </form>
                {/* Divider */}
                <div className="flex items-center my-6">
                  <div className="border-t border-slate-800 grow mr-3" aria-hidden="true" />
                  <div className="text-sm text-slate-500 italic">Or</div>
                  <div className="border-t border-slate-800 grow ml-3" aria-hidden="true" />
                </div>
                {/* Social login */}
                <button className="btn-sm text-sm text-white bg-rose-500 w-full relative flex after:flex-1">
                  <div className="flex-1 flex items-center">
                    <svg className="w-4 h-4 fill-current text-rose-200 shrink-0" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.679 6.545H8.043v3.273h4.328c-.692 2.182-2.401 2.91-4.363 2.91a4.727 4.727 0 1 1 3.035-8.347l2.378-2.265A8 8 0 1 0 8.008 16c4.41 0 8.4-2.909 7.67-9.455Z" />
                    </svg>
                  </div>
                  <span className="flex-auto text-rose-50 pl-3">Continue With Google</span>
                </button>
                <div className="text-center mt-6">
                  <div className="text-sm text-slate-500">
                    Don't you have an account?{' '}
                    <Link className="font-medium text-indigo-500" to="/signup">
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignIn;