// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React from "react";


function Announcements() {

  var communityRequests = [
    {
      id: '1',
      title: 'Club Title',
      request: 'Club Request ',
      user: 'Username',
      date: '23 September 2023',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare cursus velit commodo rutrum. Donec rhoncus orci massa, ut venenatis augue tincidunt eu...',
      banner: 'img/event-banner.jpg'
    },
    {
      id: '2',
      title: 'Community Title',
      request: 'Club Request ',
      user: 'Username',
      date: '23 September 2023',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare cursus velit commodo rutrum. Donec rhoncus orci massa, ut venenatis augue tincidunt eu...',
      banner: 'img/event-banner.jpg'
    },
    {
      id: '3',
      title: 'Club Title',
      request: 'Club Request ',
      user: 'Username',
      date: '23 September 2023',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare cursus velit commodo rutrum. Donec rhoncus orci massa, ut venenatis augue tincidunt eu...',
      banner: 'img/event-banner.jpg'
    }
  ];

  return (
    <>
      {communityRequests.map((communityRequest) => (
        <div className='grey-outline d-flex justify-content-between' key={communityRequest.id}>
          <div>
            <div className='d-flex'>
              <div className='p-20'>
                <h2 className='mb-1'>{communityRequest.title}</h2>
                <p className='post-descriptor mb-2 mr-5 yellow bold' >{communityRequest.request}</p>
                <p className='post-descriptor mb-2'>Posted by <strong>{communityRequest.user}</strong> 10 min ago</p>
                <p className='text-medium'>{communityRequest.description}</p>
              </div>
            </div>
          </div>

          <div className='request-button-container d-flex flex-column'>
            <button className="btn request-button-accept flex-grow-1 d-flex align-items-center request-bottom-border ">
              <i className="fa-solid fa-check accept"></i>
            </button>
            <button className="btn request-button-decline flex-grow-1 d-flex align-items-center">
              <i className="fa-solid fa-xmark decline"></i>
            </button>
          </div>
        </div>
      ))}
    </>

  );
}

export default Announcements;





