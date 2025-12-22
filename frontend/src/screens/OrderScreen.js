import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails, payOrder } from "../redux/slices/orderSlice";

function OrderScreen({ match, history }) {
  const orderId = match.params.id; // v5 syntax
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);

  const { orderDetails, loading, error } = useSelector((state) => state.order);
  const { userDetails } = useSelector((state) => state.user);

  // Load order details
  // useEffect(() => {
  //   if (!userDetails) {
  //     history.push("/login");
  //   } else {
  //     if (!orderDetails._id || orderDetails._id !== orderId) {
  //       dispatch(getOrderDetails(orderId));
  //     }
  //   }
  // }, [dispatch, orderId, orderDetails, userDetails, history]);

  useEffect(() => {
  if (!userDetails) {
    history.push("/login");
  } else if (!orderDetails._id || orderDetails._id !== orderId) {
    dispatch(getOrderDetails(orderId));
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [dispatch, orderId, userDetails]);


  // Load PayPal SDK
  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AYgFImsaM7ccNlP1KUiuFTyw8-rpOE4UUsSXYyTCvhzhnA-1EUc7F9pGiIgKRZAzkcP5RY8ZTe9WKgJNKa";
    script.async = true;
    script.onload = () => setSdkReady(true);
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (orderDetails._id && !orderDetails.isPaid) {
      if (!window.paypal) addPayPalScript();
      else setSdkReady(true);
    }
  }, [orderDetails]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderDetails._id, paymentResult)).then(() => {
      dispatch(getOrderDetails(orderDetails._id));
    });
  };

  if (loading || !orderDetails._id) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <div>
      <h1>Order: {orderDetails._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            {/* Shipping Info */}
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {orderDetails.User?.name || "N/A"}
              </p>
              <p>
                <strong>Email: </strong> {orderDetails.User?.username || "N/A"}
              </p>
              <p>
                <strong>Address: </strong>
                {orderDetails.ShippingAddress?.address},{" "}
                {orderDetails.ShippingAddress?.city},{" "}
                {orderDetails.ShippingAddress?.postalCode},{" "}
                {orderDetails.ShippingAddress?.country}
              </p>
            </ListGroup.Item>

            {/* Payment Info */}
            <ListGroup.Item>
              <h2>Payment</h2>
              <p>
                <strong>Method: </strong> {orderDetails.paymentMethod}
              </p>
              {orderDetails.isPaid ? (
                <Message variant="success">
                  Paid on {orderDetails.paidAt?.substring(0, 10)}
                </Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>

            {/* Order Items */}
            <ListGroup.Item>
              <h2>Order Items</h2>
              {orderDetails.orderItems?.length === 0 ? (
                <Message variant="info">Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {orderDetails.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ₹{item.price} = ₹
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Order Summary */}
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Products:</Col>
                  <Col>
                    ₹
                    {orderDetails.orderItems
                      ?.reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>₹{orderDetails.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>₹{orderDetails.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>₹{orderDetails.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {/* PayPal Button */}
              {!orderDetails.isPaid && (
                <ListGroup.Item>
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={orderDetails.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
