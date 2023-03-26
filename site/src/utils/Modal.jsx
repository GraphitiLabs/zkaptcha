import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Transition from '../utils/Transition';

function Modal({
  children,
  id,
  ariaLabel,
  show,
  handleClose,
  onMerkleProof
}) {

  const modalContent = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [merkleProof, setMerkleProof] = useState(null);

  useEffect(() => {
    if (!show) return;

    const fetchImage = async () => {
      try {
        const response = await fetch('https://sx2mbwnkk9.execute-api.us-east-2.amazonaws.com/default/zkaptcha-py');
        const json = await response.json();
        console.log(json);
        const pngData = json.png.replace(/-/g, '+').replace(/_/g, '/');
        const image = new Image();
        image.src = "data:image/png;base64," + pngData;

        setImageSrc(image.src);
        setMerkleProof(json.merklepath);
        onMerkleProof(json.merklepath);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImage();
  }, [show, onMerkleProof]);

  // close the modal on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!show || modalContent.current.contains(target)) return;
      handleClose();
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close the modal if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (keyCode !== 27) return;
      handleClose();
    };
    document.addEventListener('keydown', keyHandler);

    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 z-50 bg-black bg-opacity-75 transition-opacity"
        show={show}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />

      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabel}
        show={show}
        enter="transition ease-out duration-200"
        enterStart="opacity-0 scale-95"
        enterEnd="opacity-100 scale-100"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100 scale-100"
        leaveEnd="opacity-0 scale-95"
      >
        <div className="bg-gray-700 overflow-auto max-w-lg w-full max-h-full flex flex-col justify-center items-center rounded-xl" ref={modalContent}>


          <div class="flex content-center items-start justify-between p-4 rounded-full dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-100">
              Prove you're not a bot.
            </h3>
            <div data-aos="fade-up" data-aos-delay="400" className='ml-4'>
              <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-600 hover:text-gray-900 rounded-xl text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={(e) => handleClose()}>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </button>
            </div>
          </div>


          {imageSrc && <img className="mx-auto rounded-lg" src={imageSrc} alt="PNG" />}
          {children}
        </div>


      </Transition>
    </>
  );
}

export default Modal;
Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired
  ]),
  id: PropTypes.string,
  ariaLabel: PropTypes.string,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onMerkleProof: PropTypes.func.isRequired // Add this line
};
