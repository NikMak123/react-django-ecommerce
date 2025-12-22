import React , { useState , useEffect} from "react";
import { Row , Col , Button , Form , Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch , useSelector } from "react-redux";
import {deleteUser , updateUser} from "../redux/slices/userSlice";
import { listMyOrders , getOrderDetails } from "../redux/slices/orderSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import CancelIcon from '@mui/icons-material/Cancel';

function ProfileScreen({history}){
     const [ name , setName] = useState("");
     const [email , setEmail] = useState("");
     const [password , setPassword] = useState("");
     const [confirmPassword , setConfirmPassword] = useState("");
     const [message , setMessage] = useState("");

     const dispatch = useDispatch();
     const user = useSelector((state) => state.user);
     const {userDetails , loading , error} = user;
     const userData = {
        id : userDetails._id,
        name : name ,
        email : email , 
        password : password,
     }

     const order = useSelector((state) => state.order);
     const {listorder , loading : loadingOrders  , error : errorOrders} = order;
     console.log(listorder);

     useEffect(() => {
        if(!userDetails){
            history.push("/login");
        } else {
            dispatch(listMyOrders());

            setName(userDetails.name);
            setEmail(userDetails.email);
        }
     } , [dispatch , history , userDetails , error]);


     const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword){
            setMessage("Password do not match");
        } else {
            dispatch(updateUser(userDetails.id , userData));
            console.log(userData)
            setMessage("");
        }
     };

     const handleDeleteUser = () => {
        // call the deleteuser action from userslice
        dispatch(deleteUser(userDetails.id));
        history.push("/")
        window.location.reload(); // reload the page 
     };

     return (
        <Row>
            <Col md={3}>
            <h2>User Profile</h2>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader/>}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    required
                    type="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                    required
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    required
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="passwordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                    required
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                
                <Button type="submit" variant="primary" className="mt-3">
                    Update
                </Button>
            </Form>

            <Button type="submit" variant="danger" className="mt-3" onClick={handleDeleteUser}>
                <div style={{fontSize:"7px"}}><CancelIcon/>Account</div>
            </Button>
            </Col>

            <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? (
                <Loader/>
            ) : errorOrders ? (
                <Message variant="danger" >{errorOrders}</Message>
            ) : (
                <Table striped responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listorder.filter((order) => order.isPaid) // filter out unpaid orders
                          .map((order) => (
                            <tr key={order.id}>
                             <td>{order._id}</td>
                             <td>{order.createdAt ? order.createdAt.substring(0,10) : null}</td>
                             <td>${order.totalPrice}</td>
                             <td>
                                {order.paidAt.substring(0,10)}
                             </td>

                             <td>
                                <LinkContainer to={`/orderDetail`}>
                                <Button className="btn-sm" onClick={() => dispatch(getOrderDetails(order))}> Get Order Detail </Button>
                                </LinkContainer>
                             </td>
                            </tr>
                          ))
                        }
                    </tbody>
                </Table>
            )}
            </Col>
        </Row>
     )
}

export default ProfileScreen;