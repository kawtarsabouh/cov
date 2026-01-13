//General imports.
import React, {useState, useContext} from 'react'
import {Card, Form, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

//Component imports.
import { AuthContext } from '../Contexts/AuthContext';

//Functional component - LoginForm.
export default function LoginForm() {

    //Hooks.
    const [empId, setEmpId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const[keepMeSignedIn, setKeepMeSignedIn] = useState(false);

    //Context destructuring.
    const { login, errorMessage: contextError } = useContext(AuthContext);

    //Function to handle form submission.
    const submitted = (e) =>
    {
        e.preventDefault();
        
        if (!empId || !password) {
            setErrorMessage("Please fill all fields!");
            return;
        }
        
        const details = {
            empId : empId,
            password: password,
            keepMeSignedIn: keepMeSignedIn
        }
        login(details);
    }

    return (
       
        <Card style = { {width: "100%", "marginTop": "24px", background: "#ffffff", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", borderRadius: "16px", border: "none"} }>
            <Card.Body style={{padding: "32px"}}>
                <Card.Title style = { {color: "#1a1a1a", fontSize: "22px", fontWeight: "700", marginBottom: "8px", letterSpacing: "-0.3px"} }>
                    Welcome back
                </Card.Title>
                <p style={{color: "#8E8E93", fontSize: "14px", marginBottom: "24px"}}>Sign in to continue to VRide</p>
                    <Form  >
                        <Form.Group style={{marginBottom: "16px"}}>
                            <Form.Label style={{color: "#1a1a1a", fontWeight: "600", fontSize: "14px", marginBottom: "8px"}}>Employee ID</Form.Label>
                            <Form.Control type = "text" value = { empId } placeholder = "Enter your ID"
                                style={{padding: "14px 16px", borderRadius: "12px", border: "none", background: "#F5F5F7", fontSize: "15px"}}
                                onChange = {(e) => {
                                    setEmpId(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group style={{marginBottom: "16px"}}>
                            <Form.Label style={{color: "#1a1a1a", fontWeight: "600", fontSize: "14px", marginBottom: "8px"}}>Password</Form.Label>
                            <Form.Control type = "password" value = { password } placeholder = "Enter your password"
                                style={{padding: "14px 16px", borderRadius: "12px", border: "none", background: "#F5F5F7", fontSize: "15px"}}
                                onChange = {(e) => {
                                    setPassword(e.target.value);
                                }}/>
                        </Form.Group>
                        <Form.Check type = "checkbox" label = "Keep me signed in" style = { {color: "#8E8E93", fontSize: "14px", marginBottom: "20px"} }
                            onChange = {(e) => {
                                setKeepMeSignedIn(e.target.checked);
                            }}
                        />
                        <Button onClick = { submitted } style={{width: "100%", padding: "14px", background: "#667eea", border: "none", borderRadius: "14px", fontSize: "16px", fontWeight: "600", marginBottom: "16px", transition: "opacity 0.2s"}}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                        >Sign In</Button>
                       <Link to = "/signup" style={{textDecoration: "none"}}> <p style = { {color:"#667eea", textAlign: "center", fontSize: "14px", cursor: "pointer", marginBottom: 0} }>Don't have an account? <strong>Sign up</strong></p> </Link>
                        {(errorMessage || contextError !== 'NaN') && <div style={{marginTop: "16px", padding: "12px", background: "#FFE5E5", borderRadius: "12px", color: "#D32F2F", fontSize: "13px", textAlign: "center"}}>{errorMessage || contextError}</div>}
                    </Form>
            </Card.Body>
        </Card>
    )
}
