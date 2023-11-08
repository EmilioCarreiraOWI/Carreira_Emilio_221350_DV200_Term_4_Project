import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Bootstrap
import Button from 'react-bootstrap/Button';

// Components
import Community from "../../pages/Community";

function ProfileSidebar() {

  const placeholderImageUrl =
    'https://images-cdn.exchange.art/non_live_data/creator_data/fx2ccWDBMYN60nOnq5PhIcKVmM23/brands/JUGZ/avatar-539a591a-38cf-455f-bf23-dceb7bea74f9.image/png?optimize=low&auto=avifwebp'; // Replace with your placeholder image URL

  let userProfile = {
    name: 'Han Solo',
    email: '123456@virtualwindow.co.za',
    bio: '🔥 Illustration student \n 🚀 Yeah Booyyyeee',
    upvotes: 100,
    posts: 50,
    questions: 50,
    comments: 100,
    roles: ['1st Year', 'Frequent Poster'],
    banner: 'img/profile-banner.png',
    avatar: 'img/profile-avatar.jpg'
  }

  const profileRoles = userProfile.roles.map((tag) => (
    <span key={tag} className={`post-tags tag-${tag.split(' ')[0]}`}>
      {tag}
    </span>
  ));

  const [refreshKey, setRefreshKey] = useState(0)

  let token = localStorage.getItem('token'); // Get the token from local storage
  let decodedToken = jwt_decode(token); // Decode the token


  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    // Fetch posts
    fetchPosts();
  }, [refreshKey]);

  const userPosts = posts.filter((post) => post.postAuthorID === decodedToken._id);

  const [totalVotes, setTotalVotes] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  const getTotalVotesAndCount = () => {
    const totalVotes = userPosts.reduce((total, post) => total + post.votes, 0);
    const postCount = userPosts.length;
    setTotalVotes(totalVotes);
    setTotalPosts(postCount);
  };

  useEffect(() => {
    getTotalVotesAndCount();
  }, [userPosts]);

  return (
    <>
      <div className="dark-rounded-container mb-20 mt-20 text-start">
        <div className="profile-banner" style={{ backgroundImage: `url(${userProfile.banner})` }}>

        </div>

        <div className="pr-20 pl-20 pb-20">

          <div>
            {decodedToken.image ? (
              <img
                className="profile-avatar"
                src={`http://localhost:3001/profileImages/${decodedToken.image}`}
                alt="..."
              />
            ) : (
              <img
                className="nav-profile-pic"
                src={placeholderImageUrl}
                alt="Placeholder"
              />
            )}
          </div>

          <div className='w-100 mt-n20'>
            <div className='w-100'>
              <h2 className="text-xlarge">{decodedToken.firstName} {decodedToken.lastName}</h2>
            </div>
          </div>
          <p className="text-small post-descriptor">{decodedToken.email}</p>
          <Link className='text-small post-descriptor pointer mb-0 edit-profile-link' to="/setting">Edit Profile</Link>
          {/* <p>{profileRoles}</p> */}
          {/* <p className="text-small mb-0">{userProfile.bio}</p> */}
        </div>

      </div>

      <div className="dark-rounded-container mb-20 p-20 d-flex">
        <div className="w-50 text-center">
          <p className="bold text-xlarge mb-0">{totalVotes}</p>
          <p className="light-grey text-small mb-0">Upvotes</p>
        </div>

        <div className="w-50 text-center">
          <p className="bold text-xlarge mb-0">{totalPosts}</p>
          <p className="light-grey text-small mb-0">Posts</p>
        </div>
      </div>

      <Link to="/create-post">
        <Button variant="primary" className="w-100 text-medium">
          New Post
        </Button>
      </Link>
    </>
  );
}

export default ProfileSidebar;