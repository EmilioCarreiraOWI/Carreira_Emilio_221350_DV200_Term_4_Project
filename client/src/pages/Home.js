// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

// Components
import Announcements from '../components/home/announcements';
import Events from '../components/home/events';
import Discover from '../components/home/discover';
import ProfileDropdown from '../components/right-sidebar/profileDropdown';
import DeleteModal from '../components/admin/deleteModal';

function Home() {

  return (
    <>


      <Col xs={7} className='pt-20'>

        {/* <Row>
          <Col xs={12}>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="text" placeholder="Search Posts..." />
              </Form.Group>
            </Form>
          </Col>
        </Row> */}


        <Row className='mt-5 mb-20'>
          <Col xs={12}>
            <h1>Announcements</h1>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Announcements />
          </Col>
        </Row>

        {/* <Row className='mt-5 mb-20'>
          <Col xs={12}>
            <h1>Events</h1>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Events />
          </Col>
        </Row> */}

        <Row className='mt-5 mb-20'>
          <Col xs={12}>
            <h1>Subject</h1>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Discover />
          </Col>
        </Row>

      </Col>

      <Col xs={2}>
        <div className='sticky-top pt-5'>

          <ProfileDropdown />

        </div>

      </Col>

    </>
  );
}

export default Home;