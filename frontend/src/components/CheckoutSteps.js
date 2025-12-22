import React from "react";
import { Link } from 'react-router-dom';
import { Breadcrumbs , Typography} from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";


const useStyle = makeStyles((theme) => ({
     Link: {
        display: "flex",
        color: theme.palette.grey[600],
        textDecoration: "none",
     },
     activeLink: {
        color: theme.palette.primary.main,
     },
 
}))

function CheckoutSteps ({step1,step2,step3}){
    const classes = useStyle();

    return (
        <Breadcrumbs aria-label="breadcrumb" > 
        
         <Link to="/login" className={`${classes.Link} ${step1 ? classes.activeLink : ""}`}>

         { step1 ? "Login" : "Login (incomplete)" }
        
        </Link>

        <Link to="/shipping" className={`${classes.Link} ${step2 ? classes.activeLink : ""}`}>

        { step2 ? "Shipping" : "Shipping (incomplete)" }

        </Link>

       <Typography  color={step3 ? "textPrimary" : "textSecondary"} 
       className={`${classes.Link} 
       ${step3 ? classes.activeLink : ""}`}>

        { step3 ? "Place order" : "Place Order (Incomplete)" }

        </Typography>
        </Breadcrumbs>

    )
}

export default CheckoutSteps;