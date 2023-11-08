import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';

// Pages
import Login from './pages/Login';
import Home from './pages/Home';
import Community from './pages/Community';
import SignUp from './pages/SignUp';
import PostTemplate from './pages/PostTemplate';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Settings from './pages/settings';
import CreatePost from './pages/CreatePost';
import CommunityRequests from './pages/CommunityRequests';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

// Components
import Navigation from './components/navbar';

function App() {

  const user = localStorage.getItem("token");

  return (
    <>
      <Container fluid className='pl-0'>
        <Row>
          {user ? (
            <>
              <Navigation />
              <Col xs={1}></Col>
              <Routes>
                {/* Your authenticated routes */}
                <Route path="/" element={<Navigate replace to="/Home" />} />
                <Route path='/Home' element={<Home />} />
                {/* <Route path='/Community' element={<Community />} /> */}
                <Route path='/Profile' element={<Profile />} />
                <Route path='/Admin' element={<Admin />} />
                <Route path='/setting' element={<Settings />} />
                <Route path='/create-post' element={<CreatePost />} />
                <Route path='/communityRequests' element={<CommunityRequests />} />

                <Route path="/posts/:id" element={<PostTemplate />} />
                <Route path="/Community/:communityTitle" element={<Community />} />
              </Routes>
            </>
          ) : (
            // Redirect to login if the user is not authenticated
            <>

              <Routes>
                <Route path="/" element={<Navigate replace to="/Login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/SignUp" element={<SignUp />} />
              </Routes>
            </>
          )}
        </Row>
      </Container>
    </>
  );
}

export default App;
