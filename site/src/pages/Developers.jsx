import React from 'react';

import Header from '../partials/Header';
import DeveloperHero from '../partials/DeveloperHero';
// import Hero from '../partials/Hero';
import Faqs from '../partials/Faqs';

function Developers() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">

        {/*  Page sections */}
        <DeveloperHero />
        {/* <Hero /> */}
        <Faqs />
        {/* <Testimonials /> */}
        {/* <Features /> */}
        {/* <Features02 /> */}
        {/* <Integrations /> */}
        {/* <Pricing /> */}
        {/* <SingleTestimonial /> */}
        {/* <Cta /> */}

      </main>

      {/*  Site footer */}
      {/* <Footer /> */}

    </div>
  );
}

export default Developers;