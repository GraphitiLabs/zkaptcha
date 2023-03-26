import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

function Accordion({
  children,
  tag = 'li',
  title,
  active
}) {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const accordion = useRef(null);
  const Component = tag;

  useEffect(() => {
    setAccordionOpen(active)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accordion])

  return (
    <Component>
      <button
        className="h4 font-playfair-display flex items-center justify-between w-full text-left py-5"
        onClick={(e) => { e.preventDefault(); setAccordionOpen(!accordionOpen); }}
        aria-expanded={accordionOpen}
      >
        <span>{title}</span>
        <svg className={`w-4 h-4 fill-current text-blue-600 shrink-0 ml-8 ${accordionOpen && 'rotate-180'}`} viewBox="0 0 16 16">
          <path d="m3 5 5 6 5-6z" />
        </svg>
      </button>
      <div
        ref={accordion}
        className="text-slate-500 overflow-hidden transition-all duration-300 ease-in-out"
        style={accordionOpen ? { maxHeight: accordion.current.scrollHeight, opacity: 1 } : { maxHeight: 0, opacity: 0 }}
      >
        <p className="pb-5">{children}</p>
      </div>
    </Component>
  );
}

export default Accordion;

Accordion.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string.isRequired
  ]),
  tag: PropTypes.string,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool,
};
