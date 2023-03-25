import React from 'react';

import Image from '../images/testimonial-04.jpg';

function SingleTestimonial() {
  return (
    <section data-aos="fade-up">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <div className="relative inline-flex mb-4">
              <img className="rounded-full inline-flex" src={Image} width="64" height="64" alt="Testimonial 04" />
              <svg className="absolute top-0 left-full -ml-2 fill-indigo-500" width="20" height="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 18h6.196L9.448 0H3.252L0 18Zm10.552 0h6.196L20 0h-6.196l-3.252 18Z" />
              </svg>
            </div>
            <div className="text-xl text-slate-500 italic mb-3">
              "I had to work 8 hours a day on one app. With Cube, I only need one or two hours. I just need to work on creatives, because everything
              else is automated."
            </div>
            <div className="text-slate-500 font-medium">
              <a className="text-slate-300">Mirta Jiang</a> -{' '}
              <a className="text-indigo-500" href="#0">
                Paid Apps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleTestimonial;
