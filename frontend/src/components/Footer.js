import React from "react";
import { Container,Grid,Typography } from "@material-ui/core";

function Footer(){
    return (
        <footer>
           <Container>
            <Grid container justifyContent="center">
                <Typography variant="body1" color="textSecondary" align="center">
                    Copyright &copy; ShopBuddy
                </Typography>
            </Grid>
           </Container>
        </footer>
    )
}

export default Footer;