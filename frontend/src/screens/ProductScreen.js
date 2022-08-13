import React,{useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row ,Col ,Image ,ListGroup ,Card ,Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'


const ProductScreen = () => {
    const [product, setProduct] =useState({})
    const { id } = useParams();
    useEffect(() => {
          const fetchProduct = async () =>{
            const { data } = await axios.get(`/api/products/${id}`)
            setProduct(data);
            }
            fetchProduct();
          })
    return (

    <div>
        <Link className="btn btn-light my-3" to="/">
            Go Back
        </Link>
        <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
                {/* variant flush removes all the box lines gicent to it by ListGroup.Item and only keeps bottom line */}
                <ListGroup variant="flush">
                    <ListGroup.Item>
                          <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Price: ${product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Description:{product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <ListGroup>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                                Price:
                            </Col>
                            <Col>
                                <strong>${product.price}</strong> 
                            </Col> 
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <Row>
                        <Col>
                            Status:
                        </Col>
                        <Col>
                            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button className="btn-block" type="button" disabled={product.countInStock === 0 ? true : false}>
                            Add To Cart
                        </Button>
                    </ListGroup.Item>
                </ListGroup>     

            </Col>
        </Row>

    </div>
  )
}

export default ProductScreen
