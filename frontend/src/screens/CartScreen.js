import React, { useEffect } from 'react'
import { Link,useParams,useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button,Card } from 'react-bootstrap'
import { addToCart , removeFromCart} from '../actions/cartActions'
import { useNavigate } from "react-router-dom";
const CartScreen = () => {
        const { id } = useParams();
        const productId = id;
        // console.log(productId);
        const [searchParams] = useSearchParams();
        // console.log(searchParams.get('qty'))
        const qty = searchParams.get('qty');

        const dispatch = useDispatch();
        const navigate = useNavigate();
        const cart = useSelector(state => state.cart);
        const { cartItems } = cart;
        useEffect(() => {
            if(productId) {
                dispatch(addToCart(productId,qty))
            }
        },[dispatch,productId,qty]);

        const removeFromCartHandler = (id) => {
            dispatch(removeFromCart(id))
        }
        const checkoutHandler = (id) => {
          navigate('/shipping')
        }
        return (
            <Row>
              <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                  <h1>
                    Your cart is empty <Link to='/'>Go Back</Link>
                  </h1>
                ) : (
                  <ListGroup variant='flush'>
                    {cartItems.map((item) => (
                      <ListGroup.Item key={item.product}>
                        <Row>
                          <Col md={2}>
                            {/* if you dont remeber where these feilds came from then
                            take a look at cartActions there it has names of all the fields */}
                            <Image src={item.image} alt={item.name} fluid rounded />
                          </Col>
                          <Col md={3}>
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                          </Col>
                          <Col md={2}>${item.price}</Col>
                          <Col md={2}>
                            <Form.Control
                              as='select'
                              value={item.qty}
                              onChange={(e) =>
                                dispatch(
                                  addToCart(item.product, Number(e.target.value))
                                )
                              }
                            >
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </Form.Control>
                          </Col>
                          <Col md={2}>
                            <Button
                              type='button'
                              variant='light'
                              onClick={() => removeFromCartHandler(item.product)}
                            >
                              <i className='fas fa-trash'></i>
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Col>
              <Col md={4}>
              <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  {/* this will loop through the cartItems and find the sum of quantity */}
                  <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items </h2>
                  ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                <Button
                    type='button'
                    className='btn-block'
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}>
                  Proceed To Checkout
              </Button>
            </ListGroup.Item>
            </ListGroup>
            </Card>
            </Col>
            </Row>
          )
}
export default CartScreen
