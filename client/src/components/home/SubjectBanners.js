import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

function SubjectBanners() {
  const [banners, setBanners] = useState([]);

  const DEFAULT_BACKGROUND_IMAGE = 'https://cdna.artstation.com/p/assets/images/images/048/451/446/medium/etienne-bednarz-04e-wabi-wide.jpg?1650055991';
  const DEFAULT_PROFILE_IMAGE = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSXb5IkeSjOFnOPx7AaGsAB_wuOrxJKHe4Tf41gDYqe3dU83YhEYrWqaaIUzbSDlXxJ6E&usqp=CAU';

  useEffect(() => {
    fetch('http://localhost:3001/api/requestCommunity/')
      .then(response => response.json())
      .then(data => setBanners(data));
  }, []);

  return (
    <Container>
      <Row>
        {banners.map(banner => (
          <Col md={4} key={banner._id}>
            <div className="dark-rounded-container mb-20 mt-12 text-start grey-outline">
              <div className="profile-banner" style={{ backgroundImage: `url(${banner.imageBackground || DEFAULT_BACKGROUND_IMAGE})` }}>
              </div>

              <div className="pr-20 pl-20 pb-20" style={{ backgroundColor: banner.color }}>

                <div className="profile-avatar" style={{ backgroundImage: `url(${banner.imageProfile || DEFAULT_PROFILE_IMAGE})` }}>
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
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default SubjectBanners;