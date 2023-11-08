import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

// Components
import ProfileDropdown from '../components/right-sidebar/profileDropdown.js';
import ProfileSidebar from '../components/right-sidebar/profileSideBar.js';
import AllPosts from '../components/posts/allPosts.js';
import RegularPosts from '../components/posts/regularPosts.js';
import Questions from '../components/posts/questions.js';
import DeleteModal from '../components/admin/deleteModal.js';

function Profile() {

  const [postId, setPostId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0)

  let token = localStorage.getItem('token'); // Get the token from local storage
  let decodedToken = jwt_decode(token); // Decode the token

  const refreshPosts = () => {
    setRefreshKey(oldKey => oldKey + 1);
  };

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  function timeSinceComment(commentTime) {
    const now = new Date();
    const commentDate = new Date(commentTime);
    const differenceInSeconds = Math.floor((now - commentDate) / 1000);

    if (differenceInSeconds < 60) {
      return `${differenceInSeconds} seconds ago`;
    } else if (differenceInSeconds < 3600) {
      return `${Math.floor(differenceInSeconds / 60)} minutes ago`;
    } else if (differenceInSeconds < 86400) {
      return `${Math.floor(differenceInSeconds / 3600)} hours ago`;
    } else if (differenceInSeconds < 604800) {
      return `${Math.floor(differenceInSeconds / 86400)} days ago`;
    } else if (differenceInSeconds < 2629800) {
      return `${Math.floor(differenceInSeconds / 604800)} weeks ago`;
    } else if (differenceInSeconds < 31557600) {
      return `${Math.floor(differenceInSeconds / 2629800)} months ago`;
    } else {
      return `${Math.floor(differenceInSeconds / 31557600)} years ago`;
    }
  }

  useEffect(() => {
    // Fetch posts
    fetchPosts();
  }, [refreshKey]);

  // const postTags = Posts[0].tags.map((tag) => (
  //   <span key={tag} className={`post-tags tag-${tag}`}>
  //     {tag}
  //   </span>
  // ));

  return (
    <>
      <DeleteModal postId={postId} refreshPosts={refreshPosts} />

      <Col xs={7} className='pt-5'>
        <div>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="text" placeholder="Search Posts..." />
            </Form.Group>
          </Form>
        </div>

        <Tabs defaultActiveKey="All" transition={false} id="noanim-tab-example" className="mb-3" >

          <Tab eventKey="All" title="All">
            <Row>
              {posts
                .filter((post) => post.postAuthorID === decodedToken._id) // Replace 'Development' with parsedSubjectsData
                .reverse()
                .map((post) => (
                  <Col xs={12} key={post._id}>
                    {post.postType === 'Announcement' ? (
                      <div className='grey-outline p-20'>
                        <div className='d-flex w-100'>
                          <div className='w-75 post-heading'>
                            <Link to={`/posts/${post._id}`}>
                              {post.title}
                            </Link>
                            <span className={`post-tags tag-${post.postType}`}>{post.postType}</span>
                            <p className='post-descriptor mb-2'><span className='yellow bold'>{post.community}</span> Posted by <span className='bold'>{post.postAuthorName}</span> {timeSinceComment(post.time)}</p>

                          </div>
                          <div className='w-25 text-end'>
                            <Dropdown className='post-dropown-button'>
                              <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <span><i className="fa-solid fa-ellipsis-vertical white"></i></span>
                              </Dropdown.Toggle>

                              <Dropdown.Menu className='post-dropown'>
                                <Dropdown.Item data-toggle="modal" data-target="#deleteModalLabel" href="#/action-1" onClick={() => setPostId(post.id)}><span className='delete'><i className="fa-solid fa-trash"></i>Delete</span></Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <p className='text-medium mb-0'>{post.description}</p>
                      </div>
                    ) : (
                      <div className='grey-outline d-flex'>
                        
                        <div xs={12} className='post-content'>
                          <div className='d-flex w-100'>
                            <div className='w-75 post-heading'>
                              <Link to={`/posts/${post._id}`}>
                                {post.title}
                              </Link>
                              <span className={`post-tags tag-${post.postType}`}>{post.postType}</span>
                              <p className='post-descriptor mb-2'><span className='yellow bold'>{post.community}</span> Posted by <span className='bold'>{post.postAuthorName}</span> {timeSinceComment(post.time)}</p>
                            </div>
                            <div className='w-25 text-end'>
                              <Dropdown className='post-dropown-button'>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                  <span><i className="fa-solid fa-ellipsis-vertical white"></i></span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='post-dropown'>
                                  <Dropdown.Item href="#/action-1"><span className='delete' data-toggle="modal" data-target="#deleteModal" onClick={() => setPostId(post._id)}><i className="fa-solid fa-trash"></i>Delete</span></Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                          <p className='text-medium mb-0'>{post.description}</p>
                          {/* <p className='post-descriptor mb-2'>{post.comments} comments</p> */}
                          {/* <p className='mb-0'>{postTags}</p> */}
                        </div>
                      </div>
                    )}
                  </Col>
                ))}

            </Row>
          </Tab>

          <Tab eventKey="Posts" title="Posts">
            <Row>

              {posts
                .filter((post) => post.postAuthorID === decodedToken._id && post.postType === 'Post') // Filter posts with the specified community
                .reverse()
                .map((post) => (
                  <Col xs={12} key={post._id}>
                    <div className='grey-outline d-flex'>
                    
                      <div xs={11} className='post-content'>
                        <div className='d-flex w-100'>
                          <div className='w-75 post-heading'>
                            <Link to={`/posts/${post._id}`}>
                              {post.title}
                            </Link>
                            <span className={`post-tags tag-${post.postType}`}>{post.postType}</span>
                          </div>
                          <div className='w-25 text-end'>
                            <Dropdown className='post-dropown-button'>
                              <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <span><i className="fa-solid fa-ellipsis-vertical white"></i></span>
                              </Dropdown.Toggle>

                              <Dropdown.Menu className='post-dropown'>
                                <Dropdown.Item href="#/action-1" data-toggle="modal" data-target="#deleteModal"><span className='delete'><i className="fa-solid fa-trash"></i>Delete</span></Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <p className='post-descriptor mb-2'><span className='yellow bold'>{post.community}</span> Posted by <span className='bold'>{post.postAuthorName}</span> {timeSinceComment(post.time)}</p>
                        <p className='text-medium mb-0'>{post.description}</p>
                        {/* <p className='post-descriptor mb-2'>{post.comments} comments</p> */}
                        {/* <p className='mb-0'>{postTags}</p> */}
                      </div>
                    </div>
                  </Col>
                ))}

            </Row>
          </Tab>

          <Tab eventKey="Questions" title="Questions">
            <Row>

              {posts
                .filter((post) => post.postAuthorID === decodedToken._id && post.postType === 'Question')
                .reverse()
                .map((post) => (
                  <Col xs={12} key={post._id}>
                    <div className='grey-outline d-flex'>
                     
                      <div xs={12} className='post-content'>
                        <div className='d-flex w-100'>
                          <div className='w-75 post-heading'>
                            <Link to={`/posts/${post._id}`}>
                              {post.title}
                            </Link>
                            <span className={`post-tags tag-${post.postType}`}>{post.postType}</span>
                            <p className='post-descriptor mb-2'><span className='yellow bold'>{post.community}</span> Posted by <span className='bold'>{post.postAuthorName}</span> {timeSinceComment(post.time)}</p>
                          </div>
                          <div className='w-25 text-end'>
                            <Dropdown className='post-dropown-button'>
                              <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <span><i className="fa-solid fa-ellipsis-vertical white"></i></span>
                              </Dropdown.Toggle>

                              <Dropdown.Menu className='post-dropown'>
                                <Dropdown.Item href="#/action-1" data-toggle="modal" data-target="#deleteModal"><span className='delete'><i className="fa-solid fa-trash"></i>Delete</span></Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <p className='text-medium mb-0'>{post.description}</p>
                        {/* <p className='post-descriptor mb-2'>{post.comments} comments</p> */}
                        {/* <p className='mb-0'>{postTags}</p> */}
                      </div>
                    </div>
                  </Col>
                ))}

            </Row>
          </Tab>

          <Tab eventKey="Announcements" title="Announcements">
            <Row>

              {posts
                .filter((post) => post.postAuthorID === decodedToken._id && post.postType === 'Announcement')
                .reverse()
                .map((post) => (
                  <Col xs={12} key={post._id}>
                    <div className='grey-outline p-20'>
                      <div className='d-flex w-100'>
                        <div className='w-75 post-heading'>
                          <Link to={`/posts/${post._id}`}>
                            {post.title}
                          </Link>
                          <span className={`post-tags tag-${post.postType}`}>{post.postType}</span>
                        </div>
                        <div className='w-25 text-end'>
                          <Dropdown className='post-dropown-button'>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                              <span><i className="fa-solid fa-ellipsis-vertical white"></i></span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className='post-dropown'>
                              <Dropdown.Item href="#/action-1" data-toggle="modal" data-target="#deleteModal"><span className='delete'><i className="fa-solid fa-trash"></i>Delete</span></Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                      <p className='post-descriptor mb-2'>Posted by <span className='bold'>{post.postAuthorName}</span> {timeSinceComment(post.time)}</p>
                      <p className='text-medium mb-0'>{post.description}</p>
                    </div>
                  </Col>
                ))}

            </Row>
          </Tab>

        </Tabs>
      </Col>

      <Col xs={2}>
        <div className='sticky-top pt-5'>

          <ProfileDropdown />

          <ProfileSidebar />

        </div>
      </Col>
    </>
  );
}

export default Profile;