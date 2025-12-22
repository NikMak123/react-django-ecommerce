import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, TextField, Grid, Typography, Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../redux/slices/userSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";

function RegisterScreen({ location, history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  // redirect path after registration
  const redirect = location.search ? location.search.split("=")[1] : "/";

  // read user state from Redux store
  const { userDetails, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (userDetails) {
      // redirect to the intended page after registration/login
      history.push(redirect);
    }
  }, [history, userDetails, redirect]);

  const submitHandler = (e) => {
    e.preventDefault(); // ✅ Prevent form default GET request

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      // Dispatch createUser from your slice
      dispatch(createUser(name, email, password));
    }
  };

  return (
    <Container maxWidth="xs">
      <div style={{ marginTop: "50px", display: "flex", flexDirection: "column" }}>
        <Typography variant="h5" style={{ fontWeight: "bold", marginBottom: "20px" }}>
          Register
        </Typography>

        {message && <Message variant="error">{message}</Message>}
        {error && <Message variant="error">{error}</Message>}
        {loading && <Loader />}

        <form onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Register
          </Button>

          <Grid container justifyContent="flex-start" style={{ marginTop: "10px" }}>
            <Grid item>
              Already have an account?{" "}
              <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Sign In</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default RegisterScreen;
