import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

// Components


function DeleteModal({ postId, refreshPosts }) {

  const [postBy, setPostBy] = useState('');
  const [deletedBy, setDeletedBy] = useState('');
  const [violation, setViolation] = useState('');
  const [timeout, setTimeout] = useState('');
  const [postContent, setPostContent] = useState('');
  const [aditionalComment, setAditionalComment] = useState('');

  useEffect(() => {
    if (postId) {
      fetch(`http://localhost:3001/api/posts/${postId}`)
        .then((response) => response.json())
        .then((data) => {
          setPostContent(data.postContent);
        })
        .catch((error) => {
          console.error('Error fetching post:', error);
        });
    }
  }, [postId]);

  const convertDeltaToHtml = (delta) => {
    const converter = new QuillDeltaToHtmlConverter(delta.ops, {}); // Ensure the correct constructor is used
    const html = converter.convert();
    return { __html: html };
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    const payload = {
      postBy: 'postBy',
      deletedBy: 'deletedBy',
      violation: violation,
      timeout: timeout,
      postContent: postContent,
      aditionalComment: aditionalComment,
    };

    try {
      const response = await axios.post('http://localhost:3001/api/postDelete', payload);
      console.log('Post successfully submitted:', response.data);

      const deletePostResponse = await axios.delete(`http://localhost:3001/api/posts/${postId}`);
      console.log('Post successfully deleted:', deletePostResponse.data);

      refreshPosts();
    } catch (error) {
      console.error('Error submitting Post:', error);
    }
  };

  return (
    <>
      <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <Col id='create-a-post' xs={10} className='pt-5'>
              <Row>
                <Col>
                  <h1 className='mb-20'>Delete Post</h1>
                </Col>
              </Row>
              <Form onSubmit={handleDelete}>
                <Row>
                  <Col xs={1}>
                    <img
                      className='nav-profile-pic'
                      src="https://images-cdn.exchange.art/non_live_data/creator_data/fx2ccWDBMYN60nOnq5PhIcKVmM23/brands/JUGZ/avatar-539a591a-38cf-455f-bf23-dceb7bea74f9.image/png?optimize=low&auto=avifwebp"
                      alt="..."
                    />
                  </Col>
                  <Col xs={11}>
                    <p className='post-descriptor mb-1'><span className='white mb-2'>User</span> 10 min ago</p>
                    <p className='text-medium mb-20' dangerouslySetInnerHTML={convertDeltaToHtml(postContent)}></p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <h2 className='font-weight-400 text-medium mb-2'>Violation</h2>
                    <Form.Select className="custom-select"
                      onChange={(e) => setViolation(e.target.value)}
                    >
                      <option value="0">Reason for deleting</option>
                      <option value="Inappropriate Language">Inappropriate Language</option>
                      <option value="Spamming">Spamming</option>
                      <option value="Violation of Guidelines">Violation of Guidelines</option>
                      <option value="Harassment and Bullying">Harassment and Bullying</option>
                    </Form.Select>
                  </Col>

                  <Col xs={6}>
                    <h2 className='font-weight-400 text-medium mb-2'>Timeout duration</h2>
                    <Form.Select aria-label="Default select example"
                      onChange={(e) => setTimeout(e.target.value)}
                    >
                      <option value="0 Days">Not Applicable</option>
                      <option value="1 Day">1 Day</option>
                      <option value="3 Days">3 Days</option>
                      <option value="5 Days">5 Days</option>
                      <option value="1 Week">1 Week</option>
                      <option value="2 Week">2 Week</option>
                      <option value="3 Week">3 Week</option>
                      <option value="1 Month">1 Month</option>
                      <option value="Permanent Ban">Permanent Ban</option>
                    </Form.Select>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h2 className='font-weight-400 text-medium mb-2'>Additional Comments</h2>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Control as="textarea" rows={3} className='Text-area-3' onChange={(e) => setAditionalComment(e.target.value)} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={2}>
                    <Button className='white cancel-button' variant="primary text-medium mb-5" data-dismiss="modal" aria-label="Close"> Cancel</Button>
                  </Col>
                  <Col xs={2}>
                    <Button className='delete-button' variant="warning text-medium mb-5" type="submit"> Delete</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;