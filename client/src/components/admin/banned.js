// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import React from "react";
import Accordion from 'react-bootstrap/Accordion';

function Announcements() {

  var BannedUsers = [
    {
      id: '1',
      username: 'Username',
      studentnumber: 'Student Number',
      namesurname: 'Name and Surname',
      date: 'Date',
      time: 'Time left',
      reseonbanned: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare cursus velit commodo rutrum. Donec rhoncus orci massa, ut venenatis augue tincidunt eu...',

    },
    {
      id: '2',
      username: 'Username',
      studentnumber: 'Student Number',
      namesurname: 'Name and Surname',
      date: 'Date',
      time: 'Time left',
      reseonbanned: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare cursus velit commodo rutrum. Donec rhoncus orci massa, ut venenatis augue tincidunt eu...',

    },
    {
      id: '3',
      username: 'Username',
      studentnumber: 'Student Number',
      namesurname: 'Name and Surname',
      date: 'Date',
      time: 'Time left',
      reseonbanned: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare cursus velit commodo rutrum. Donec rhoncus orci massa, ut venenatis augue tincidunt eu...',

    }
  ];

  return (
    <>
      <Row className='greybackground p-20'>
        <Col xs={2} className='text-medium left'>
          <strong>Username</strong>
        </Col>
        <Col xs={3} className='text-medium left'>
          <strong>Student Number</strong>
        </Col>
        <Col xs={3} className='text-medium left'>
          <strong>Name and Surname</strong>
        </Col>
        <Col xs={1} className='text-medium left'>
          <strong>Date</strong>
        </Col>
        <Col xs={2} className='text-medium left'>
          <strong>Time left</strong>
        </Col>
        <Col xs={1} className='text-medium left'>
          <strong>Action</strong>
        </Col>
      </Row>

      {BannedUsers.map((bannedUser) => (
        <Row className='mb-20 ban-item grey-outline p-20' key={bannedUser.id}>
          <Accordion defaultActiveKey="0">
            <Accordion.Item>
              <Accordion.Header>
                <Row className='w-100 m-0'>
                  <Col xs={12} className='p-0'>
                    <Row className='align-items-center'>
                      <Col xs={2} className='text-medium'>
                        {bannedUser.username}
                      </Col>
                      <Col xs={3} className='text-medium'>
                        {bannedUser.studentnumber}
                      </Col>
                      <Col xs={3} className='text-medium'>
                        {bannedUser.namesurname}
                      </Col>
                      <Col xs={1} className='text-medium'>
                        {bannedUser.date}
                      </Col>
                      <Col xs={2} className='text-medium'>
                        {bannedUser.time}
                      </Col>
                      <Col xs={1} className='text-medium'>
                        <a href='#' className='btn btn-primary'>Unban</a>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Accordion.Header>
              <Accordion.Body className='p-0 mt-20'>
                <div className='text-medium'>
                  <b>Reason for ban:</b>
                </div>
                <div className='text-medium'>
                  {bannedUser.reseonbanned}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

        </Row>
      ))}
    </>

  );
}

export default Announcements;





