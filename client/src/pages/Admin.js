import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

// Components
import Requests from '../components/admin/requests';
import Banned from '../components/admin/banned';
import AdminSidebar from '../components/admin/adminSideBar.js';
import ProfileDropdown from '../components/right-sidebar/profileDropdown';

function Admin() {
  return (
    <>
      <Col xs={7} className='pt-20'>

        <Row className='mt-5 mb-20'>
          <Col xs={12}>
            <h1>Admin</h1>
          </Col>
        </Row>
        <Tabs defaultActiveKey="All" transition={false} id="noanim-tab-example" className="mb-3" >

          <Tab eventKey="All" title="Requests">
            <Row>
              <Col xs={12}>
                <Requests />
              </Col>
            </Row>
          </Tab>

          <Tab eventKey="Posts" title="Banned Users">
            <Col xs={12}>
              <Banned />
            </Col>
          </Tab>
        </Tabs>
      </Col>
      <Col xs={2}>
        <div className='sticky-top pt-5'>

          <ProfileDropdown />

          <AdminSidebar />

        </div>
      </Col>



    </>
  );
}

export default Admin;