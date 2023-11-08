import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/posts')
      .then(response => response.json())
      .then(data => {
        // Filter only the announcements
        const filteredAnnouncements = data.filter(post => post.postType === 'Announcement');
        // Sort the announcements by date in descending order
        const sortedAnnouncements = filteredAnnouncements.sort((a, b) => new Date(b.date) - new Date(a.date));
        // Get the last three announcements
        const lastThreeAnnouncements = sortedAnnouncements.slice(0, 3);
        setAnnouncements(lastThreeAnnouncements);
      })
      .catch(error => console.error('Error fetching announcements:', error));
  }, []);

  return (
    <>
      <Row>
        {announcements.map((announcement) => (
          <Col xs={4} key={announcement._id}>
            <div className='grey-outline p-20'>
              <b className='yellow'>{announcement.community}</b> <span className={`post-tags tag-${announcement.postType}`}>{announcement.postType} </span>
            <div className='w-100 post-heading'>
                <Link to={`/posts/${announcement._id}`}>
                  {announcement.title}
                </Link>
              </div>
              <p className='post-descriptor mb-2'>Posted </p>
              <p className='text-medium mb-0'>{announcement.description}</p>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Announcements;