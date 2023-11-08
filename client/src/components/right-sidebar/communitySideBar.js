import { Link } from 'react-router-dom';

// Bootstrap
import Button from 'react-bootstrap/Button';

// Components
import Community from "../../pages/Community";

function CommunitySidebar() {

  let communities = {
    title: 'Development',
    admin: 'Username',
    moderators: ['Username', 'Username', 'Username'],
    description: 'Offical Open Window Development channel',
    members: 100,
    posts: 50,
    questions: 50,
    comments: 100,
    banner: 'img/community-banner.jpg',
    avatar: 'img/avatar.png'
  }

  return (
    <>
      <div className="dark-rounded-container mb-20 mt-20">
        <div className="profile-banner" style={{ backgroundImage: `url(${communities.banner})` }}>

        </div>

        <div className="pr-20 pl-20 pb-20">

          <div className="profile-avatar" style={{ backgroundImage: `url(${communities.avatar})` }}>

          </div>

          <h2 className="text-xlarge mt-n20">{communities.title}</h2>
          <p className="text-small post-descriptor">Admin <span className="bold yellow">{communities.admin}</span></p>
          <p className="text-small mb-0">{communities.description}</p>
        </div>

      </div>

      <div className="dark-rounded-container mb-20 p-20 d-flex">
        <div className="w-25 text-center">
          <p className="bold text-xlarge mb-0">{communities.members}</p>
          <p className="grey text-small mb-0">Members</p>
        </div>

        <div className="w-25 text-center">
          <p className="bold text-xlarge mb-0">{communities.questions}</p>
          <p className="grey text-small mb-0">Questions</p>
        </div>

        <div className="w-25 text-center">
          <p className="bold text-xlarge mb-0">{communities.posts}</p>
          <p className="grey text-small mb-0">Posts</p>
        </div>

        <div className="w-25 text-center">
          <p className="bold text-xlarge mb-0">{communities.comments}</p>
          <p className="grey text-small mb-0">Comments</p>
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

export default CommunitySidebar;