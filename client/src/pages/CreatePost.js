import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Axios
import axios from 'axios';

// Quill
import hljs from 'highlight.js/lib/core';
import Quill from 'quill';
import 'highlight.js/styles/monokai-sublime.css';
import 'react-quill/dist/quill.snow.css';

// Components
import GuidelineSideBar from '../components/right-sidebar/guidelineSideBar';
import ProfileDropdown from '../components/right-sidebar/profileDropdown';

function PostTemplate() {

  let token = localStorage.getItem('token'); // Get the token from local storage
  let decodedToken = jwt_decode(token); // Decode the token

  // handleSubmit
  // ===============================================================
  const [postType, setPostType] = useState('');
  const [community, setCommunity] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [postContent, setPostContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quill = new Quill('#editor');
    const delta = quill.getContents();
    // const convertedDelta = delta.ops;

    const payload = {
      postAuthorID: decodedToken._id,
      postAuthorName: decodedToken.firstName + ' ' + decodedToken.lastName,
      postType: postType,
      community: community,
      title: title,
      description: description,
      postContent: delta,
      tags: selectedTags,
      votes: 0,
    };

    console.log(payload);

    try {
      const response = await axios.post('http://localhost:3001/api/posts', payload);
      console.log('Post successfully submitted:', response.data);
      setShowModal(true); // Show the modal after successful submission
    } catch (error) {
      console.error('Error submitting Post:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // ===============================================================

  const handleTagSelection = (tag) => {
    // Check if the tag is already selected, and if it is, remove it; otherwise, add it.
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const tags = [
    'HTML', 'CSS',
    'JavaScript', 'React',
    'Node.js', 'Express',
    'MongoDB', 'SQL',
    'Python', 'Java',
    'C++', 'C#',
  ]

  var toolbarOptions = [
    ['bold', 'italic', 'underline'],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],

    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],

    [{ 'header': [1, 2, 3, false] }],

    [{ 'align': [] }],

    ['clean']
  ];

  hljs.highlightAll();

  useEffect(() => {
    var quill = new Quill('#editor', {
      theme: 'snow',
      placeholder: 'Compose a post...',
      modules: {
        toolbar: toolbarOptions,
        syntax: {
          highlight: (text) => hljs.highlightAuto(text).value,
        },
      },
      // handlers: {
      //   image: function () {
      //     handleImageUpload(); // Custom function to handle image upload to S3
      //   },
      // },
    });
  }, []);


  return (
    <>
      <Col id='create-a-post' xs={7} className='pt-5'>

        <Row>
          <Col>
            <h1 className='mb-20'>Create a post</h1>
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

        <Form onSubmit={handleSubmit}>

          <Row>
            <Col xs={6}>
              <Form.Select className="custom-select"
                value={postType}
                onChange={(e) => setPostType(e.target.value)}
                name='postType'
              >
                <option>Post Type</option>
                <option value="Question">Question</option>
                <option value="Post">Post</option>
                <option value="Announcement">Announcement</option>
              </Form.Select>
            </Col>

            <Col xs={6}>
              <Form.Select aria-label="Default select example"
                value={community}
                onChange={(e) => setCommunity(e.target.value)}
                name='community'
              >
                <option>Open this select menu</option>
                <option value="Development">Development</option>
                <option value="Interaction Design">Interaction Design</option>
                <option value="Product Design">Product Design</option>
                <option value="Visual Culture">Visual Culture</option>
                
              </Form.Select>

            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                  name='title'
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <p className='post-descriptor'>Try to be as descriptive as possible</p>
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Control
                  name='description'
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <p className='post-descriptor'>Try to be as descriptive as possible</p>
              </Form.Group>

              <div
                id="editor"
                className='mb-20'
                type="text"
                placeholder="PostContent"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              >
              </div>

              <h2 className='font-weight-400'>Tags</h2>
              <p className='post-descriptor'>Choose 1 - 3 of the most relevant options</p>

              <div className='d-flex flex-wrap mb-20'>
                {tags.map((tag) => (
                  <div
                    className={`create-post-tags ${selectedTags.includes(tag) ? 'selected' : ''
                      }`}
                    key={tag}
                    onClick={() => handleTagSelection(tag)}
                  >
                    <span className='mb-0 text-small'>{tag}</span>
                  </div>
                ))}
              </div>


              <Button variant="primary text-medium mb-5" type="submit"> Post</Button>
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

export default PostTemplate;