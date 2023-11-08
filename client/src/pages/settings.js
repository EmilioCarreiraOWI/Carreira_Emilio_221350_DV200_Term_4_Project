import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


// Components
import Requests from '../components/admin/requests';
import Banned from '../components/admin/banned';
import AdminSidebar from '../components/admin/adminSideBar.js';
import ProfileDropdown from '../components/right-sidebar/profileDropdown';
import jwt_decode from 'jwt-decode';

function Settings() {
    let token = localStorage.getItem('token'); // Get the token from local storage
    let decodedToken = jwt_decode(token); // Decode the token
    const [imageProfile, setImageProfile] = useState(null);
    const [imgName, setImgName] = useState("Name of file");
    const [previewImage, setPreviewImage] = useState(null);
    const [editFirstName, setEditFirstName] = useState('');
    const [editLastName, setEditLastName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editPassword, setEditPassword] = useState('');

    const getImage = (e) => {
        let imagefile = e.target.files[0];
        setImageProfile(imagefile);
        setImgName(imagefile.name);

        let reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(imagefile);
    };

    const handleImageSubmit = async (e) => {
        e.preventDefault();
        await handleImageUpload();
      
        // Fetch updated user data
        try {
          const response = await axios.get(`http://localhost:3001/api/getuser/${decodedToken._id}`);
          const updatedUserData = response.data;
          
          // Update the user's profile image in the state
          if (updatedUserData.image) {
            // Assuming you have a state variable to store the profile image URL
            setPreviewImage(updatedUserData.image);
          }
        } catch (error) {
          console.error('Error fetching updated user data:', error);
        }
      };
      

    const handleProfileSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            firstName: editFirstName,
            lastName: editLastName,
            email: editEmail,
            password: editPassword,
        };

        try {
            const response = await axios.patch(`http://localhost:3001/api/updateuser/${decodedToken._id}`, payload);
            console.log('User updated:', response.data);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleImageUpload = async () => {
        const formData = new FormData();
        formData.append('image', imageProfile);

        try {
            const response = await axios.post('http://localhost:3001/api/uploadImage/'+decodedToken._id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Image uploaded:', response.data);

    
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <>
            <Col xs={7} className='pt-20'>
                <Row className='mt-5'>
                    <Col xs={12}>
                        <h1>Profile Settings</h1>
                    </Col>
                    <Col xs={12}>
                        <h2>Edit profile image</h2>
                    </Col>
                </Row>

                <Form onSubmit={handleImageSubmit}>
                    <Row>
                        <Col xs={3} className='mt-5 mb-20'>
                            {previewImage && (
                                <img src={previewImage} alt="Preview" style={{ width: "100%" }} />
                            )}
                            <span>{imgName}</span>
                        </Col>
                        <Col xs={9} className='mt-5 mb-20'>
                            <Form.Group className="mb-3">

                                <label className="btn btn-primary">
                                    Choose Image
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        onChange={getImage}
                                    />
                                </label>

                            </Form.Group>
                        </Col>
                    </Row>

                    <Button variant="primary text-medium mb-5" type="submit">
                        Save Profile Image
                    </Button>
                </Form>



                <Form onSubmit={handleProfileSubmit}>
                    <Row className='mt-5'>
                        <Col xs={12} className='pb-20'>
                            <h2>Edit your profile details</h2>
                        </Col>
                    </Row>
                    <Row className='mt-5 mb-20'>
                        <Col xs={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={decodedToken.firstName}
                                    onChange={(e) => {
                                        setEditFirstName(e.target.value);
                                    }}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={decodedToken.lastName}
                                    onChange={(e) => {
                                        setEditLastName(e.target.value);
                                    }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>


                    <Row className='mt-5 mb-20'>
                        <Col xs={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={decodedToken.email}
                                    onChange={(e) => {
                                        setEditEmail(e.target.value);
                                    }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className='mt-5 mb-20'>
                        <Col xs={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={decodedToken.password}
                                    onChange={(e) => {
                                        setEditPassword(e.target.value);
                                    }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary text-medium mb-5" type="submit">
                        Save Profile
                    </Button>
                </Form>
            </Col>

            <Col xs={2}>
                <div className='sticky-top pt-5'>
                    <ProfileDropdown />
                    {/* <AdminSidebar /> */}
                </div>
            </Col>


        </>
    );
}

export default Settings;