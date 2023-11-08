import React, { useState } from 'react';
import axios from 'axios';
import SubjectBanners from '../components/home/SubjectBanners';


// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import 'highlight.js/styles/monokai-sublime.css';
import 'react-quill/dist/quill.snow.css';

// Components
import GuidelineSideBar from '../components/right-sidebar/guidelineSideBar';
import ProfileDropdown from '../components/right-sidebar/profileDropdown';

function CommunityRequests() {

  const [image, setImage] = useState();
  const [imageName, setImageName] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageBackground, setImageBackground] = useState('');
  const [imageProfile, setImageProfile] = useState();
  const [color, setColor] = useState('#343434');

  const [submittedData, setSubmittedData] = useState(null);

  // const DEFAULT_BACKGROUND_IMAGE = 'https://cdna.artstation.com/p/assets/images/images/048/451/446/medium/etienne-bednarz-04e-wabi-wide.jpg?1650055991';
  // const DEFAULT_PROFILE_IMAGE = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSXb5IkeSjOFnOPx7AaGsAB_wuOrxJKHe4Tf41gDYqe3dU83YhEYrWqaaIUzbSDlXxJ6E&usqp=CAU';
  
  const [showModal, setShowModal] = useState(false);

  const colorOptions = [
    { name: 'Black', value: '#000000' },
    { name: 'Navy', value: '#003366' },
    { name: 'Green', value: '#006600' },
    { name: 'Purple', value: '#660066' },
    { name: 'Red', value: '#990000' },
    { name: 'Blue', value: '#336699' },
    { name: 'Teal', value: '#009999' },
    { name: 'Brown', value: '#5C3E2A' },
    { name: 'Lavender', value: '#666699' },
    { name: 'Olive', value: '#336633' }
  ];



//image change
  // const handleImageChange = (e) => {
  //   if (e.target.files && e.target.files[0]) {
  //     let img = URL.createObjectURL(e.target.files[0]);
  //     setImage(img);
  //     setImageName(e.target.files[0].name);
  //   }
  // };

  const handleFileChange = (e) => {
    // Change the type to "text" and update the state variable
    const value = e.target.value;
    setImageBackground(value);
  };
  const handleProfileImageChange = (e) => {
    // Change the type to "text" and update the state variable
    const value = e.target.value;
    setImageProfile(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      title: title,
      description: description,
      imageBackground: imageBackground, // Use the state variable
      imageProfile: imageProfile, // Use the state variable
      color: color,
    };
  
    try {
      const response = await axios.post('http://localhost:3001/api/requestCommunity', payload);
      console.log('Post successfully submitted:', response.data);
      setShowModal(true); // Show the modal after successful submission
      setSubmittedData(payload); // Set the submitted data
    } catch (error) {
      console.error('Error submitting Post:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Col id='create-a-post' xs={7} className='pt-5'>

        <Row>
          <Col className='mb-20'>
            <h1>Community Request Form</h1>
            <p className='text-medium'>Your community request will be sent to the community council for review.</p>
          </Col>
        </Row>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Post Submitted</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Your post has been successfully submitted.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control 
                  type="text" 
                  placeholder="Title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}/>
                <p className='post-descriptor'>Try to be as descriptive as possible</p>
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Control 
                  type="text" 
                  placeholder="Description" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}/>
                <p className='post-descriptor'>Try to be as descriptive as possible</p>
              </Form.Group>
              
              <Form.Group className="mb-3 " controlId="formFileInput" >
                  <Form.Label>Upload Image Profile</Form.Label>
                  <Form.Control  
                    className='file-input-Community'
                    type="text"
                    placeholder='Upload URL'
                    value={imageProfile} // Use the state variable
                    onChange={handleProfileImageChange} />
                  <p className='post-descriptor'>Enter the image URL</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formFileInput">
                  <Form.Label>Upload Image Background</Form.Label>
                  <Form.Control 
                    className='file-input-Community'
                    type="text"
                    placeholder='Upload URL'
                    value={imageBackground} // Use the state variable
                    onChange={handleFileChange} />
                  <p className='post-descriptor'>Enter the image URL</p>
                </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                <Form.Label>Bottom Banner Color</Form.Label>
                <Form.Control as="select" value={color} onChange={(e) => setColor(e.target.value)}>
                  {colorOptions.map((colorOption, index) => (
                    <option key={index} value={colorOption.value}>
                      {colorOption.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Label>Community Banner Preview</Form.Label>
              <Col lg={4}>
              <div className="dark-rounded-container mb-20 mt-12 text-start grey-outline">
                <div className="profile-banner" style={{ backgroundImage: `url(${imageBackground})` }}>
                </div>

                <div className="pr-20 pl-20 pb-20" style={{ backgroundColor: color }}>

                  <div className="profile-avatar"  style={{ backgroundImage: `url(${imageProfile})` }}>
                  </div>

                  <div className='d-flex w-100 mt-n20'>
                    <div className='w-100'>
                      <h2 className="text-xlarge">{title}</h2>
                    </div>
                  </div>
                  <p className="text-small post-descriptor" style={{ color: '#ffffff' }}>{description}</p>
                  <p></p>
                  <p className="text-small mb-0"></p>
                </div>

              </div>
              </Col>
              <Button variant="primary text-medium mb-5" type="submit">Send Request</Button>
            </Col>
          </Row>
        </Form>
        
      </Col>
      
      

      <Col xs={2}>
        <div className='sticky-top pt-5'>

          <ProfileDropdown />

          <GuidelineSideBar />

        </div>
      </Col>
    </>
  );
}

export default CommunityRequests;