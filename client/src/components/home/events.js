// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Announcements() {

  var events = [
    {
      id: '1',
      title: 'Event Title',
      date: '23 September 2023',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare cursus velit commodo ',
      banner: 'img/event-banner.jpg'
    },
    {
      id: '2',
      title: 'Event Title',
      date: '23 September 2023',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare cursus velit commodo ',
      banner: 'img/event-banner.jpg'
    },
    {
      id: '3',
      title: 'Event Title',
      date: '23 September 2023',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ornare cursus velit commodo ',
      banner: 'img/event-banner.jpg'
    }
  ];

  return (
    <>
      <Row>
        {events.map((event) => (
          <Col xs={4} key={event.id}>
            <div className='grey-outline'>
              <div className='event-card-banner-container' style={{ backgroundImage: `url(${event.banner})` }}>
              </div>

              <div className='p-20'>
                <h2 className='mb-0 yellow'>{event.title}</h2>
                <p className='post-descriptor mb-2'>{event.date}</p>
                <p className='text-medium'>{event.description}</p>

                <Button variant="primary">View Event</Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Announcements;





