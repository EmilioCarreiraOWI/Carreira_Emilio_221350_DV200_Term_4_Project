import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import jwt_decode from 'jwt-decode';

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/esm/Button.js';

// Components
import ProfileDropdown from '../components/right-sidebar/profileDropdown.js';
import DeleteModal from '../components/admin/deleteModal.js';

function Community() {

  const { communityTitle } = useParams();

  const [postId, setPostId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [banners, setBanners] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch('http://localhost:3001/api/requestCommunity/')
      .then(response => response.json())
      .then(data => setBanners(data));
  }, []);

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
  }, [refreshKey, communityTitle]);

  // const postTags = Posts[0].tags.map((tag) => (
  //   <span key={tag} className={`post-tags tag-${tag}`}>
  //     {tag}
  //   </span>
  // ));

  const storedSubjectsData = localStorage.getItem("subjectsData");
  const parsedSubjectsData = storedSubjectsData ? storedSubjectsData.replace(/-/g, ' ') : null;

  // USER
  let token = localStorage.getItem('token'); // Get the token from local storage
  let decodedToken = jwt_decode(token); // Decode the token

  const UpdatePostVotes = async (postId, voteType) => {

    const UserId = decodedToken._id;

    try {
      const response = await axios.patch(`http://localhost:3001/api/posts/${postId}/votes`, { voteType, UserId });
      console.log('Post votes updated successfully:', response.data);

      refreshPosts();
    } catch (error) {
      console.error('Error updating post votes:', error);
    }
  };

  return (
    <>
      <DeleteModal postId={postId} refreshPosts={refreshPosts} />

      <Col xs={7} className='pt-5'>
        <div>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Search Posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Group>
          </Form>
        </div>

        <Tabs defaultActiveKey="All" transition={false} id="noanim-tab-example" className="mb-3" >

          <Tab eventKey="All" title="All">
            <Row>
              {posts
                .filter((post) => post.community === parsedSubjectsData)
                .filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.description.toLowerCase().includes(searchQuery.toLowerCase()))
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
                                <Dropdown.Item data-toggle="modal" data-target="#deleteModalLabel" href="#/action-1" onClick={() => setPostId(post._id)}><span className='delete'><i className="fa-solid fa-trash"></i>Delete</span></Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <p className='text-medium mb-0'>{post.description}</p>
                      </div>
                    ) : (
                      <div className='grey-outline d-flex'>
                        <div xs={1} className='post-vote'>
                          <div className='vote-button'>
                            <i className="fa-solid fa-chevron-up" onClick={() => UpdatePostVotes(post._id, 'Up')}></i>
                          </div>
                          <div>
                            <span className='bold'>{post.votes}</span>
                          </div>
                          <div className='vote-button'>
                            <i className="fa-solid fa-chevron-down" onClick={() => UpdatePostVotes(post._id, 'Down')}></i>
                          </div>
                        </div>

                        <div className='post-content'>
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
                .filter((post) => post.community === parsedSubjectsData && post.postType === 'Post')
                .filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.description.toLowerCase().includes(searchQuery.toLowerCase()))
                .reverse()
                .map((post) => (
                  <Col xs={12} key={post._id}>
                    <div className='grey-outline d-flex'>
                      <div xs={1} className='post-vote'>
                        <div className='vote-button'>
                          <i className="fa-solid fa-chevron-up" onClick={() => UpdatePostVotes(post._id, 'Up')}></i>
                        </div>
                        <div>
                          <span className='bold'>{post.votes}</span>
                        </div>
                        <div className='vote-button'>
                          <i className="fa-solid fa-chevron-down" onClick={() => UpdatePostVotes(post._id, 'Down')}></i>
                        </div>
                      </div>

                      <div className='post-content'>
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

          <Tab eventKey="Questions" title="Questions">
            <Row>

              {posts
                .filter((post) => post.community === parsedSubjectsData && post.postType === 'Question')
                .filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.description.toLowerCase().includes(searchQuery.toLowerCase()))
                .reverse()
                .map((post) => (
                  <Col xs={12} key={post._id}>
                    <div className='grey-outline d-flex'>
                      <div xs={1} className='post-vote'>
                        <div className='vote-button'>
                          <i className="fa-solid fa-chevron-up" onClick={() => UpdatePostVotes(post._id, 'Up')}></i>
                        </div>
                        <div>
                          <span className='bold'>{post.votes}</span>
                        </div>
                        <div className='vote-button'>
                          <i className="fa-solid fa-chevron-down" onClick={() => UpdatePostVotes(post._id, 'Down')}></i>
                        </div>
                      </div>

                      <div className='post-content'>
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
                .filter((post) => post.community === parsedSubjectsData && post.postType === 'Announcement')
                .filter((post) =>
                  post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  post.description.toLowerCase().includes(searchQuery.toLowerCase())
                )
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

          {/* <CommunitySidebar /> */}
          {banners
            .filter((banner) => banner.title === parsedSubjectsData)
            .map(banner => (
              <div className="dark-rounded-container mb-20 mt-12 text-start grey-outline" key={banner._id}>
                <div className="profile-banner" style={{ backgroundImage: `url(${banner.imageBackground})` }}>
                </div>

                <div className="pr-20 pl-20 pb-20 profile-background-mask" style={{ backgroundColor: banner.color }}>

                  <div className="profile-avatar" style={{ backgroundImage: `url(${banner.imageProfile})` }}>
                  </div>

                  <div className='d-flex w-100 mt-n20'>
                    <div className='w-100'>
                      <h2 className="text-xlarge">{banner.title}</h2>
                    </div>
                  </div>
                  <p className="text-small post-descriptor" style={{ color: '#ffffff' }}>{banner.description}</p>
                  <p></p>
                  <p className="text-small mb-0"></p>
                </div>

              </div>
            ))}

          <Link to="/create-post">
            <Button variant="primary" className="w-100 text-medium">
              New Post
            </Button>
          </Link>

        </div>
      </Col>
    </>
  );
}

export default Community;