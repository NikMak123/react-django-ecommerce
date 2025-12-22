import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchCategory } from "../redux/slices/productSlice";
import { Link } from "react-router-dom";

function CategoryPage() {
  const dispatch = useDispatch();
  const { categoryName } = useParams(); // param name matches route

  const { products, loading, error } = useSelector(
    (state) => state.product.getCategory
  );

  useEffect(() => {
    if (categoryName) dispatch(fetchCategory(categoryName));
  }, [dispatch, categoryName]);

  return (
    <Container className="my-4">
      <h2>{categoryName}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <Row>
          {products.map((product) => (
            
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Link to={`/product/${product._id}`}>
              <Card>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>${product.price}</Card.Text>
                </Card.Body>
              </Card>
               </Link>
            </Col>
           
          ))}
        </Row>
      )}
    </Container>
  );
}

export default CategoryPage;
