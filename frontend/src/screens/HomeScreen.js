import React,{useEffect} from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

//to dispatch our listproduct action we need usedispatch
// useSelector is used to select the parts of the state

const HomeScreen = () => {
const dispatch = useDispatch()
//you need to call productList i.e whatever you called it in your store
const productList = useSelector(state => state.productList)

const { loading, error, products } = productList;

useEffect(() => {
    dispatch(listProducts())
},[dispatch])
  return (
    <>
            <h1>Latest Porducts</h1>
            {loading ? (<h2>Loading...</h2>):
              error ? (<h3>{error}</h3>):
              (<Row>
                {products.map(product =>
                    (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product
                                        product={product}
                                 />
                            </Col>
                    )

                    
                )}
            </Row>  )
              }
            
    </>
  )
}

export default HomeScreen
