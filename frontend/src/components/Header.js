import React from "react";
import { useDispatch , useSelector, UseSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppBar , Toolbar , IconButton , MenuItem , Menu ,} from "@material-ui/core";
import { ShoppingCart , AccountCircle } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import  SearchBox  from "./SearchBox";
import logo from "../logo.svg";
import { logout } from "../redux/slices/userSlice";

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor : "#212121",

    },
    grow : {
        flexGrow : 1 ,
    },
    menuItem : {
        minWidth : 180 , 
    },
    link : {
        textDecoration : "none",
        color : "#fff",
    }
}))


const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { userDetails } = useSelector((state) => state.user);

    const [anchorEl, setAnchorEl] = React.useState(null);  // ✅ fixed
    const open = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const handleLogout = () => {
        dispatch(logout());
        handleMenuClose();
        window.location.reload();
    }

    return (
        <div className={classes.grow}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Link to="/" className={classes.link}>
                        <img src={logo} alt="ShopBuddy" style={{ height: 60 }} />
                    </Link>
                    <Link  to="/about">
                        About-us
                    </Link>
                    <div style={{ marginLeft: "5vw" }}>
                        <SearchBox />
                    </div>

                    <div className={classes.grow}>
                        <IconButton
                            aria-label="show cart items"
                            color="inherit"
                            component={Link}
                            to="/cart"
                        >
                            <ShoppingCart />
                        </IconButton>

                        {userDetails ? (
                            <>
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>

                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}  // ✅ fixed
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={open}  // ✅ boolean
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem
                                        className={classes.menuItem}
                                        component={Link}
                                        to="/profile"
                                        onClick={handleMenuClose}
                                    >
                                        Profile
                                    </MenuItem>

                                    <MenuItem
                                        className={classes.menuItem}
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <IconButton
                                aria-label="login"
                                color="inherit"
                                component={Link}
                                to="/login"
                            >
                                <AccountCircle />
                            </IconButton>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;