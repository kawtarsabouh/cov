//General Imports.
import React, { useContext } from 'react'
import {Navbar, Nav, Image, NavDropdown} from 'react-bootstrap';
import { LinkContainer  } from 'react-router-bootstrap';
import {AuthContext} from '../Contexts/AuthContext';

//Resource Imports
import carpool from '../Res/Images/carpool.png';
import profile from '../Res/Images/profile.jpg';
import { motion } from 'framer-motion';
import {APP_NAME, SIGNED_IN_LINKS, SIGNED_OUT_LINKS} from '../Res/constants';

//Animation variants 
import { navbarAnimation, titleAnimation } from '../Res/animationVariants';

//Functional Component - NavigationBar
export default function NavigationBar() {

    //Context destructuring.
    const { isLoggedIn }  = useContext(AuthContext);
    const { employeeID } = useContext(AuthContext);
    const { firstname } = useContext(AuthContext);
    const { signOut } = useContext(AuthContext);

    //Return different templates depending on auth status.
    if(isLoggedIn)
    {
        //Template if user is logged in.
        return (
            <motion.div variants = { navbarAnimation } initial = "hidden" animate = "visible">
                <Navbar style={{background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", padding: "16px 40px"}} variant = "light" expand = "lg" sticky = "top">
                    <Navbar.Brand href = "/" style={{display: "flex", alignItems: "center"}}>
                        <img 
                                src={carpool}
                                width = "32"
                                height = "32"
                                alt = "VRide logo"/>
                        <motion.div style = {{ display : 'inline-block' }} 
                                    variants = { titleAnimation } 
                                    initial = "hidden"
                                    animate = "visible">
                            <b style = {{"marginLeft" : "12px", fontSize: "22px", color: "#1a1a1a", fontWeight: "700", letterSpacing: "-0.5px"}}> { APP_NAME } </b>
                        </motion.div>
                    </Navbar.Brand>

                    <Nav className = "mr-auto"> </Nav>

                    <Nav style = { { "marginRight" : "0", display: "flex", alignItems: "center", gap: "12px" } }>
                        <NavDropdown 
                            title={
                                <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                    <Image src = {profile}
                                        width = "32"
                                        height = "32"
                                        roundedCircle
                                        style={{border: "2px solid #667eea"}}/>
                                    <span style={{fontWeight: "600", fontSize: "15px", color: "#1a1a1a"}}>{firstname}</span>
                                </div>
                            }
                            id = "basic-nav-dropdown" 
                            style = {{ marginRight: "0" }}>
                            <LinkContainer  to = "/home">
                            <NavDropdown.Item > { SIGNED_IN_LINKS[0] } </NavDropdown.Item>
                            </LinkContainer >

                            <LinkContainer  to = "/create"> 
                                <NavDropdown.Item > { SIGNED_IN_LINKS[1] } </NavDropdown.Item> 
                            </LinkContainer>

                            <LinkContainer  to = "/mycarpools"> 
                                <NavDropdown.Item > { SIGNED_IN_LINKS[2] } </NavDropdown.Item> 
                            </LinkContainer>

                            <LinkContainer  to = "/rides"> 
                                <NavDropdown.Item > { SIGNED_IN_LINKS[3] } </NavDropdown.Item> 
                            </LinkContainer>

                            <NavDropdown.Divider />

                            <NavDropdown.Item onClick = {()=>{signOut({
                                    empid: employeeID,
                                    firstname: firstname
                                }) }}>  { SIGNED_IN_LINKS[4] }
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar>
            </motion.div>
        )
    }
    else
    {
        //Template if user is not signed in.
        return(
            <motion.div variants = { navbarAnimation } initial = "hidden" animate = "visible">
                <Navbar style={{background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", padding: "16px 40px"}} variant = "light" expand = "lg" sticky = "top">
                    <Navbar.Brand href = "/" style={{display: "flex", alignItems: "center"}}>
                        <motion.img
                            src={carpool}
                            width = "32"
                            height = "32"
                            alt = "VRide logo"/>
                        <b style = { {"marginLeft" : "12px", fontSize: "22px", color: "#1a1a1a", fontWeight: "700", letterSpacing: "-0.5px"} }> VRide </b>
                    </Navbar.Brand>
                    <Nav className = "mr-auto"> </Nav>
                    <Nav style = { {"marginRight" : "0", gap: "12px"} }>
                        <LinkContainer  to = "/">
                            <Nav.Link style={{color: "#495057", fontWeight: "500"}}> { SIGNED_OUT_LINKS[0] } </Nav.Link>
                        </LinkContainer>
                        <LinkContainer  to = "/signup">
                            <Nav.Link style={{color: "#495057", fontWeight: "500"}}> { SIGNED_OUT_LINKS[1] } </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar>
            </motion.div>
        )
    }
}
