import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = () => {
  return (
    <footer>
          <Container>
              <Row>
                    <Col className="text-center py-3">
                            Copyright &copy; Izanagi
                    </Col>
              </Row>   
          </Container>
    </footer>
  )
}

export default Footer
