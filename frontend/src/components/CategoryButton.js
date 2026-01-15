import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchAllCategories } from "../redux/slices/productSlice";

function CategoryButtons() {
  const dispatch = useDispatch();

  const { data: categories, loading, error } = useSelector(
    (state) => state.product.allCategories
  );
console.log("Fetched categories:", categories);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <Container className="my-4">
      <h3>Shop by Category</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <Row>
          {categories.map((cat) => (
            <Col key={cat} xs={6} md={3} className="mb-3">
              <Link to={`/category/${encodeURIComponent(cat)}`}>
                <Button variant="outline-primary" className="w-100">
                  {cat}
                </Button>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default CategoryButtons;
