import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Bootstrap
import Col from 'react-bootstrap/Col';

// Components

function AllPosts({ setPostId, refreshKey }) {

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
      {posts.map((post) => (
        <Col xs={12} key={post._id}>
          {post.postType === 'Announcement' ? (
            <div className='grey-outline p-20'>
              <div className='d-flex w-100'>
                <div className='w-75 post-heading'>
                  <Link to={`/posts/${post._id}`}>
                    {post.title}
                  </Link>
                  <span className={`post-tags tag-${post.postType}`}>{post.postType}</span>
                  <p className='post-descriptor mb-2'><span className='yellow bold'>{post.community}</span> Posted by {post.postAuthorName} {timeSinceComment(post.time)}</p>

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
              <div xs={1} className='post-vote'>
                <div className='vote-button'>
                  <i className="fa-solid fa-chevron-up"></i>
                </div>
                <div>
                  <span className='bold'>{post.votes}</span>
                </div>
                <div className='vote-button'>
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>

              <div xs={11} className='post-content'>
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
    </>
  );
}

export default AllPosts;