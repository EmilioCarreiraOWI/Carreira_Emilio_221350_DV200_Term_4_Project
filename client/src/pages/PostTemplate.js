import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


// Quill
import hljs from 'highlight.js/lib/core';
import Quill from 'quill';
import 'highlight.js/styles/monokai-sublime.css';
import 'react-quill/dist/quill.snow.css';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

// Components
import CommunitySidebar from '../components/right-sidebar/communitySideBar';
import ProfileDropdown from '../components/right-sidebar/profileDropdown';

function PostTemplate() {

  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [banners, setBanners] = useState([]);

  const storedSubjectsData = localStorage.getItem("subjectsData");
  const parsedSubjectsData = storedSubjectsData ? storedSubjectsData.replace(/-/g, ' ') : null;

  useEffect(() => {
    fetch('http://localhost:3001/api/requestCommunity/')
      .then(response => response.json())
      .then(data => setBanners(data));
  }, []);

  // USER
  let token = localStorage.getItem('token'); // Get the token from local storage
  let decodedToken = jwt_decode(token); // Decode the token

  const placeholderImageUrl =
    'https://images-cdn.exchange.art/non_live_data/creator_data/fx2ccWDBMYN60nOnq5PhIcKVmM23/brands/JUGZ/avatar-539a591a-38cf-455f-bf23-dceb7bea74f9.image/png?optimize=low&auto=avifwebp'; // Replace with your placeholder image URL

  const [commentAuthor, setCommentAuthor] = useState(decodedToken.firstName + ' ' + decodedToken.lastName);
  const [commentAuthorAvatar, setCommentAuthorAvatar] = useState(decodedToken.image);

  const [refreshKey, setRefreshKey] = useState(0)

  const refreshPosts = () => {
    setRefreshKey(oldKey => oldKey + 1);
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/posts/${id}`);
      setPostData(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    // Fetch posts
    fetchPosts();
  }, [refreshKey]);

  const convertDeltaToHtml = (delta) => {
    const converter = new QuillDeltaToHtmlConverter(delta.ops, {}); // Ensure the correct constructor is used
    const html = converter.convert();
    return { __html: html };
  };

  var toolbarOptions = [
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],

    ['clean']
  ];

  hljs.highlightAll();

  useEffect(() => {
    var quill = new Quill('#editor', {
      theme: 'snow',
      placeholder: 'What are your thoughts?',
      modules: {
        toolbar: toolbarOptions,
        syntax: {
          highlight: (text) => hljs.highlightAuto(text).value,
        },
      }
    });
  }, []);

  // handleSubmit
  // ==============================================================

  const CommentSubmit = async (e) => {
    e.preventDefault();

    const quill = new Quill('#editor');
    const delta = quill.getContents();


    if (delta.length() === 1 && delta.ops[0].insert.trim() === '') {
      return; // Don't continue if quill is empty
    }

    // Assuming you have the comment text in a variable commentDesc
    const commentData = {
      content: delta,
      author: commentAuthor,
      authorAvatar: commentAuthorAvatar
    };

    console.log(commentAuthorAvatar);

    try {
      // Send a POST request to your server to add a comment to the post
      const response = await axios.post(`http://localhost:3001/api/posts/${id}/comments`, commentData);
      console.log('Comment added successfully:', response.data);

      refreshPosts();
    } catch (error) {
      console.error('Error adding comment:', error);
    }

    // Empty out the field when submitted
    quill.setText('');
    // Set the placeholder text for the Quill editor
    quill.root.dataset.placeholder = 'What are your thoughts?';
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

  const UpdateComment = async (commentId, voteType) => {

    const UserId = decodedToken._id;


    try {
      // Send a PUT request to your server to update the specific comment
      const response = await axios.patch(`http://localhost:3001/api/posts/${id}/comments/${commentId}/votes`, { voteType, UserId });
      console.log('Comment updated successfully:', response.data);

      refreshPosts();
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const DeleteComment = async (commentId) => {
    try {
      // Send a DELETE request to your server to delete the specific comment
      const response = await axios.delete(`http://localhost:3001/api/posts/${id}/comments/${commentId}`);
      console.log('Comment deleted successfully:', response.data);

      refreshPosts();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };


  const UpdatePostVotes = async (postId, voteType) => {

    const UserId = decodedToken._id;

    try {
      const response = await axios.patch(`http://localhost:3001/api/posts/${postId}/votes`, { voteType, UserId });
      // console.log('Post votes updated successfully:', response.data);

      refreshPosts();
    } catch (error) {
      console.error('Error updating post votes:', error);
    }
  };


  return (
    <>
      <Col xs={7} className='pt-5 mt-5'>
        <div>
          {postData ? (

            <Col xs={12} key={postData.id}>
              {postData.postType === 'Announcement' ? (
                <div className='grey-outline d-flex'>

                  <div xs={12} className='post-content'>
                    <p className='post-descriptor mb-2'><span className='yellow bold'> {postData.community}</span> Posted by <span className='bold'>{postData.postAuthorName}</span>  {postData.date}</p>
                    <div className='d-flex w-100'>
                      <div className='w-75'>
                        <h2 className='mb-0'>{postData.title}</h2>
                        {/* <p className='mb-3'>{postTags}</p> */}
                      </div>
                      <div className='w-25 text-end'>
                        <Dropdown className='post-dropown-button'>
                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <span><i className="fa-solid fa-ellipsis-vertical white"></i></span>
                          </Dropdown.Toggle>

                          <Dropdown.Menu className='post-dropown'>
                            <Dropdown.Item href="#/action-1"><span className='delete'><i className="fa-solid fa-trash"></i>Delete</span></Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>

                    <div dangerouslySetInnerHTML={convertDeltaToHtml(postData.postContent)} />
                    {/* <p className='post-descriptor mb-2'>{postData.comments} comments</p> */}

                  </div>
                </div>

              ) : (
                <div className='grey-outline d-flex'>
                  <div xs={1} className='post-vote'>
                    <div>
                      <i className="vote-button fa-solid fa-chevron-up" onClick={() => UpdatePostVotes(postData._id, 'Up')}></i>
                    </div>
                    <div>
                      <span className='bold'>{postData.votes}</span>
                    </div>
                    <div>
                      <i className="vote-button fa-solid fa-chevron-down" onClick={() => UpdatePostVotes(postData._id, 'Down')}></i>
                    </div>
                  </div>

                  <div xs={11} className='post-content'>
                    <p className='post-descriptor mb-2'><span className='yellow bold'> {postData.community}</span> Posted by <span className='bold'>{postData.postAuthorName}</span>  {postData.date}</p>
                    <div className='d-flex w-100'>
                      <div className='w-75'>
                        <h2 className='mb-0'>{postData.title}</h2>
                        {/* <p className='mb-3'>{postTags}</p> */}
                      </div>
                      <div className='w-25 text-end'>
                        <Dropdown className='post-dropown-button'>
                          <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <span><i className="fa-solid fa-ellipsis-vertical white"></i></span>
                          </Dropdown.Toggle>

                          <Dropdown.Menu className='post-dropown'>
                            <Dropdown.Item href="#/action-1"><span className='delete'><i className="fa-solid fa-trash"></i>Delete</span></Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>

                    <div dangerouslySetInnerHTML={convertDeltaToHtml(postData.postContent)} />
                    {/* <p className='post-descriptor mb-2'>{postData.comments} comments</p> */}

                  </div>
                </div>

              )}

            </Col>
          ) : (
            <p>Loading...</p>
          )}

        </div>

        <div>

          <Col xs={12}>
            <div className='grey-outline p-4'>

              <div id="editor" className='h-100'></div>

              <Button className='' variant="primary text-medium mt-3 mb-0 " onClick={CommentSubmit}> Comment</Button>


              <hr />


              {/* COMMENTS */}
              {postData && postData.comments && postData.comments.length > 0 ? (
                postData.comments.sort((a, b) => b.votes - a.votes).map((comment, index) => (
                  <div className='mt-4' key={index}>
                    <Row>
                      <Col xs={12}>


                        {comment.authorAvatar ? (
                          <img
                            className="nav-profile-pic"
                            src={`http://localhost:3001/profileImages/${comment.authorAvatar}`}
                            alt="..."
                          />
                        ) : (
                          <img
                            className="nav-profile-pic"
                            src={placeholderImageUrl}
                            alt="Placeholder"
                          />
                        )}


                        <span className='white mb-2 post-descriptor ml-20'>{comment.author}</span> <span className='white mb-2 post-descriptor light-grey ml-10'>{timeSinceComment(comment.time)}</span> <span className='yellow bold ml-2 post-descriptor'>{index === 0 ? 'Most Upvoted' : ''}</span>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12}>
                        <div className='comment-content-container'>
                          <div dangerouslySetInnerHTML={convertDeltaToHtml(comment.content)} />
                          <i className="comment-vote-button upvote fa-solid fa-chevron-up m-2" onClick={() => UpdateComment(comment._id, 'Up')}></i>
                          <span className='text-small bold'>{comment.votes}</span>
                          <i className="comment-vote-button downvote fa-solid fa-chevron-down m-2" onClick={() => UpdateComment(comment._id, 'Down')}  ></i>
                          <i className="delete-comment-button fa-solid fa-trash m-2" style={{ fontSize: '0.8rem' }} onClick={() => DeleteComment(comment._id)}></i>

                        </div>
                      </Col>
                    </Row>
                  </div>
                ))
              ) : (
                <p>No comments</p>
              )}

            </div>
          </Col>

        </div>

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

                <div className="pr-20 pl-20 pb-20" style={{ backgroundColor: banner.color }}>

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

export default PostTemplate;