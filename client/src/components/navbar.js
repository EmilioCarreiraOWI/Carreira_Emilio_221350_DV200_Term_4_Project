import logo from '../logo.svg';

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Bootstrap
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Accordion from 'react-bootstrap/Accordion';

import { NavLink } from "react-router-dom";

function Navigation() {
  const [subject, setSubject] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null); // Selected subject

  useEffect(() => {
    fetch('http://localhost:3001/api/requestCommunity/')
      .then(response => response.json())
      .then(data => setSubject(data));
  }, []);

  function handleSubjectClick(name) {
    const cleanedName = name.replace(/\s+/g, '-'); // Replace spaces with hyphens
    localStorage.setItem("subjectsData", cleanedName);
    setSelectedSubject(cleanedName); // Update the selected subject
  }

  // useEffect(() => {
  //   setSubjects((prevSubjects) => [...prevSubjects]);
  // }, [currentSubjectPath, subjects]);

  return (
    <Col xs={2}>

      <div expand='xl' className='sidenav'>

        <div className='w-100'>
          <div className='align-items-center w-100 text-center'>
            <img id='mainLogo' src={logo} alt='Interro Logo' />
          </div>

        </div>

        <Nav className='d-flex flex-column mb-3'>
          <NavLink to="/Home" className='navItem'>
            <div className='main-icon-nav-container'>
              <i className="fa fa-home"></i>
            </div>
            Home
          </NavLink>
          {/* <NavLink to="/trending" className='navItem'>
            <div className='main-icon-nav-container'>
              <i className="fa fa-fire"></i>
            </div>
            Trending
          </NavLink> */}
        </Nav>

        <hr />

        <Accordion>
          <Accordion.Item>
            <Accordion.Header>Subjects</Accordion.Header>
            <Accordion.Body>

              <Nav className='d-flex flex-column mb-3 dropdown-nav'>
                {subject.map((subject) => (
                  <NavLink 
                    key={subject._id} 
                    to={subject.path} 
                    className={`navItem ${selectedSubject === subject.title ? 'active' : ''}`}
                    onClick={() => handleSubjectClick(subject.title)}
                  >
                    <img src={subject.imageProfile} alt={`${subject.title} icon`} className='nav-icon' />
                    {subject.title}
                  </NavLink>
                ))}
              </Nav>

            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>

    </Col>
  );
}

export default Navigation;