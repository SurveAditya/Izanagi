import React,{useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';



import {useDispatch,useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions'

const ProductScreen = () => {
    const [qty , setQty ] = useState(1)
    const dispatch = useDispatch()
    const { id } = useParams();

    const productDetails = useSelector(state => state.productDetails)
    const {loading,error,product } = productDetails
    useEffect(() => {
            dispatch(listProductDetails(id))
          },[dispatch,id])
    
    // const navigate = useNavigate();
    // const addToCartHandler = () =>{
    //         // history.push(`/cart/${id}?qty=${qty}`)
    //         <Link to={`/cart/${id}?qty=${qty}`}></Link>
    //         // navigate(`/cart/${id}?qty=${qty}`);
    // }
    return (

    <div>
        <Link className="btn btn-light my-3" to="/">
            Go Back
        </Link>
        {loading ? (<h1>Loading..</h1>):
        error?({error}):
        (
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
                    {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  {/* onClick={addToCartHandler} */}
                    <ListGroup.Item>
                    <Link to={`/cart/${id}?qty=${qty}`}>
                        <Button className="btn-block" type="button" disabled={product.countInStock === 0 ? true : false}>
                            Add To Cart
                        </Button>
                    </Link>
                    </ListGroup.Item>
                </ListGroup>     

            </Col>
        </Row>
        )
        }
        

    </div>
  )
}

export default ProductScreen
