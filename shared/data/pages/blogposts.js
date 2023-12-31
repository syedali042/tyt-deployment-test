import React from 'react';
import { Row, Form, Card, Button, Col, Badge } from 'react-bootstrap';
import Link from 'next/link';
import { DropzoneDisabled } from './forms/form-advance-data/data-form-advanced';
import Select from 'react-select';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
const Editors = dynamic(() => import("@/shared/data/pages/editor"), {ssr: false,});

const Blogposts = () => {
    
  const Tech = [
    { value: "Technology", label: "Technology" },
    { value: "Travel", label: "Travel" },
    { value: "Food", label: "Food" },
    { value: "Fashion", label: "Fashion" },
  ];
  
  let { basePath } = useRouter();

  return (
    <div>
        <Row>
      <Col xl={8}>
        <Card>
          <Card.Header>
            <Card.Title>Add New Post</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row className="mb-4">
              <Form.Label className="col-md-3">Post Title :</Form.Label>
              <div className="">
                <Form.Control type="text" defaultValue="Typing....." />
              </div>
            </Row>
            <Row className="mb-4">
              <Form.Label className="col-md-3">Categories :</Form.Label>
              <div className="">
               
              <Select classNamePrefix="Select" options={Tech} placeholder='Technology'/>
              </div>
            </Row>

            {/* <!-- Row --> */}
            <Row>
              <Form.Label className="col-md-3 mb-4">Post Description :</Form.Label>
              <div className="border mb-4">
                {/* <textarea className="content" name="example"></textarea> */}
                <Editors/>
              </div>
            </Row>

            {/* <!--End Row--> */}

            <Form.Group className="mb-0">
              <Form.Label className="col-md-3 mb-4">File Upload :</Form.Label>
              {/* <input id="demo" type="file" name="files" accept=".jpg, .png, image/jpeg, image/png" multiple /> */}
              <DropzoneDisabled />
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            <Button variant='primary' >Post</Button>
            <Button variant='default' className="float-end">Discard</Button>
          </Card.Footer>
        </Card>
      </Col>
      <Col xl={4}>
        <Card>
          <Card.Header>
            <Card.Title>Recent Posts</Card.Title>
          </Card.Header>
          <Card.Body>
            <div className="">
              <div className="d-sm-flex overflow-visible">
                <img className="card-aside-column br-5 cover-image" alt="media19" src={`${process.env.NODE_ENV === 'production'? basePath : ''}/assets/images/media/19.jpg`} />
                <div className="ps-3 flex-column">
                  <Badge bg='danger' className="me-1 mb-1 mt-1">Lifestyle</Badge>
                  <h4><Link href={`/components/pages/extension/blog-details/`}>Generator on the Internet..</Link></h4>
                  <div className="text-muted">Excepteur sint occaecat cupidatat non proident, accusantium sunt in culpa qui officia deserunt mollit anim id est laborum....</div>
                </div>
              </div>
              <div className="d-sm-flex overflow-visible mt-5">
                <img className="card-aside-column br-5 cover-image" alt="media19" src={`${process.env.NODE_ENV === 'production'? basePath : ''}/assets/images/media/22.jpg`} />
                <div className="ps-3 flex-column">
                  <Badge bg='primary' className="me-1 mb-1 mt-1">Business</Badge>
                  <h4><Link href={`/components/pages/extension/blog-details/`}>Voluptatem quia voluptas...</Link></h4>
                  <div className="text-muted">Excepteur sint occaecat cupidatat non proident, accusantium sunt in culpa qui officia deserunt mollit anim id est laborum....</div>
                </div>
              </div>
              <div className="d-sm-flex overflow-visible mt-5">
                <img className="card-aside-column br-5 cover-image" alt="media19" src={`${process.env.NODE_ENV === 'production'? basePath : ''}/assets/images/media/12.jpg`} />
                <div className="ps-3 flex-column">
                  <Badge bg="secondary" className="me-1 mb-1 mt-1">Travel</Badge>
                  <h4><Link href={`/components/pages/extension/blog-details/`}>Generator on the Internet..</Link></h4>
                  <div className="text-muted">Excepteur sint occaecat cupidatat non proident, accusantium sunt in culpa qui officia deserunt mollit anim id est laborum....</div>
                </div>
              </div>
              <div className="d-sm-flex overflow-visible mt-5">
                <img className="card-aside-column br-5 cover-image" alt="media19" src={`${process.env.NODE_ENV === 'production'? basePath : ''}/assets/images/media/25.jpg`} />
                <div className="ps-3 flex-column">
                  <Badge bg="success" className="me-1 mb-1 mt-1">Meeting</Badge>
                  <h4><Link href={`/components/pages/extension/blog-details/`}>Voluptatem quia voluptas...</Link></h4>
                  <div className="text-muted">Excepteur sint occaecat cupidatat non proident, accusantium sunt in culpa qui officia deserunt mollit anim id est laborum....</div>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            <Card.Title>Professional Blog Writers</Card.Title>
          </Card.Header>
          <Card.Body>
            <div className="">
              <div className="d-flex overflow-visible">
                <img className="avatar bradius avatar-xl me-3" src={`${process.env.NODE_ENV === 'production'? basePath : ''}/assets/images/users/12.jpg`} alt="avatar-img" />
                <div className="media-body valign-middle">
                  <Link href={`/components/pages/profile/`} className="fw-semibold text-dark">John Paige</Link>
                  <p className="text-muted mb-0">There are many variations of passages of Lorem Ipsum available ...</p>
                </div>
              </div>
              <div className="d-flex overflow-visible mt-5">
                <img className="avatar bradius avatar-xl me-3" src={`${process.env.NODE_ENV === 'production'? basePath : ''}/assets/images/users/2.jpg`} alt="avatar-img" />
                <div className="media-body valign-middle">
                  <Link href={`/components/pages/profile/`} className="fw-semibold text-dark">Peter Hill</Link>
                  <p className="text-muted mb-0">There are many variations of passages of Lorem Ipsum available ...</p>
                </div>
              </div>
              <div className="d-flex overflow-visible mt-5">
                <img className="avatar bradius avatar-xl me-3" src={`${process.env.NODE_ENV === 'production'? basePath : ''}/assets/images/users/9.jpg`} alt="avatar-img" />
                <div className="media-body valign-middle">
                  <Link href={`/components/pages/profile/`} className="fw-semibold text-dark">Irene Harris</Link>
                  <p className="text-muted mb-0">There are many variations of passages of Lorem Ipsum available ...</p>
                </div>
              </div>
              <div className="d-flex overflow-visible mt-5">
                <img className="avatar bradius avatar-xl me-3" src={`${process.env.NODE_ENV === 'production'? basePath : ''}/assets/images/users/4.jpg`} alt="avatar-img" />
                <div className="media-body valign-middle">
                  <Link href={`/components/pages/profile/`} className="fw-semibold text-dark">Harry Fisher</Link>
                  <p className="text-muted mb-0">There are many variations of passages of Lorem Ipsum available ...</p>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    </div>
  );
};

export default Blogposts;
