// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import NavLink from 'react-bootstrap/esm/NavLink';
import { useNavigate } from 'react-router-dom';


function Discover() {

  const [communities, setCommunities] = useState([]);
  const [subject, setSubject] = useState([]);
  const [currentSubjectPath, setCurrentSubjectPath] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/requestCommunity/')
      .then(response => response.json())
      .then(data => setCommunities(data));
  }, []);

  function handleSubjectClick(name) {
    const cleanedName = name.replace(/\s+/g, '-'); // Replace spaces with hyphens
    localStorage.setItem("subjectsData", cleanedName);
    console.log(localStorage.getItem("subjectsData"));
    navigate("/community/" + localStorage.getItem("subjectsData"));
  }

  return (
    <>
      <Row>
        {communities.map(community => (
          <Col md={4} key={community._id}>
            <div className="dark-rounded-container mb-20 mt-12 text-start grey-outline">
              <div className="profile-banner" style={{ backgroundImage: `url(${community.imageBackground})` }}>
              </div>

              <div className="pr-20 pl-20 pb-20" style={{ backgroundColor: community.color }}>

                <div className="profile-avatar" style={{ backgroundImage: `url(${community.imageProfile})` }}>
                </div>

                <div className='d-flex w-100 mt-n20'>
                  <div className='w-100'>
                  <NavLink
                      to={"/community/" + community.title}
                      className='navItem'
                      onClick={() => handleSubjectClick(community.title, community.title)}
                    >
                      <h2>{community.title}</h2>
                  </NavLink>
                  </div>
                </div>
                {/* <p className="text-small post-descriptor" style={{ color: '#ffffff' }}>{banner.description}</p> */}
                <p></p>
                <p className="text-small mb-0"></p>
              </div>

            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Discover;





