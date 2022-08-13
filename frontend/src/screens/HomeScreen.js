import React,{useEffect, useState} from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Product from '../components/Product'
import axios from 'axios';


const HomeScreen = () => {
  const [products, setProducts] =useState([])

  useEffect(() => {
        const fetchProducts = async () =>{
          const { data } = await axios.get('/api/products')
          setProducts(data);
          }
          fetchProducts();
        })
      
  return (
    <>
            <h1>Latest Porducts</h1>
            <Row>
                {products.map(product =>
                    (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product
                                        product={product}
                                 />
                            </Col>
                    )

                    
                )}
            </Row>  
    </>
  )
}

export default HomeScreen
