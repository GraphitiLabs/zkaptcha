// import React, { useState } from 'react';
// import axios from 'axios';
// import { Button, Modal, Form } from 'react-bootstrap';

// const ImageModal = () => {
//   const [show, setShow] = useState(false);
//   const [image, setImage] = useState('');
//   const [inputText, setInputText] = useState('');

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleInputChange = (event) => {
//     setInputText(event.target.value);
//   };

//   const fetchImage = async () => {
//     try {
//       const response = await axios.get('https://sx2mbwnkk9.execute-api.us-east-2.amazonaws.com/default/zkaptcha-py', {
//         params: { text: inputText },
//         responseType: 'arraybuffer',
//       });

//       let base64Image = Buffer.from(response.data, 'binary').toString('base64');
//     base64Image = base64Image.replace('+', '-').replace('/', '_').replace(/=+$/, '');
//       setImage(`data:image/jpeg;base64,${base64Image}`);
//     } catch (error) {
//       console.error('Error fetching image:', error);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     await fetchImage();
//   };

//   return (
//     <>
//       <Button variant="primary" onClick={handleShow}>
//         Open Modal
//       </Button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Image Modal</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group>
//               <Form.Label>Enter Text</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter text"
//                 value={inputText}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Button variant="primary" type="submit">
//               Submit
//             </Button>
//           </Form>
//           {image && <img src={image} alt="Fetched" className="img-fluid mt-3" />}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default ImageModal;
