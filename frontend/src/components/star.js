import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    container : {
        backgroundImage : `url(https://t3.ftcdn.net/jpg/01/21/64/88/360_F_121648819_ZQ0tZ6tjLzxim1SG7CQ86raBw4sglCzB.jpg)`,
        backgroundSize : "cover",
        
        height : "50px",
        width : "50px",

        display: "flex",
        justifyContent : "center",
        alignItems : "center",
        margin : "200px",
    },
    text : {
        color : "white",
        backgroundColor : "black",
        padding : "10px",
    },
}));

const Star = () => {
    const classes = useStyles();

    return(
        <div>
            <div className={classes.container}>
            </div>
        </div>
    )
};

export default Star;

