import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

// Bootstrap
import Col from 'react-bootstrap/Col';

// Components
import { Posts } from '../posts.js';

function RegularPosts() {

  const regularPosts = Posts.filter((post) => post.postType === 'Post');

  const postTags = Posts[0].tags.map((tag) => (
    <span key={tag} className={`post-tags tag-${tag}`}>
      {tag}
    </span>
  ));

  return (
    <>
      {regularPosts.map((post) => (
        <Col xs={12} key={post.id}>
          <div className='grey-outline d-flex'>
            <div xs={1} className='post-vote'>
              <div>
                <i className="fa-solid fa-chevron-up"></i>
              </div>
              <div>
                <span className='bold'>{post.votes}</span>
              </div>
              <div>
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
              <p className='post-descriptor mb-2'><span className='yellow bold'>{post.community}</span> Posted {post.date}</p>
              <p className='text-medium mb-0'>{post.description}</p>
              {/* <p className='post-descriptor mb-2'>{post.comments} comments</p> */}
              <p className='mb-0'>{postTags}</p>
            </div>
          </div>
        </Col>
      ))}
    </>
  );
}

export default RegularPosts;