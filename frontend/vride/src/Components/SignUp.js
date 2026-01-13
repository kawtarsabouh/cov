//General imports.
import React, { useState, useContext } from 'react'
import { Card, Form, Button } from 'react-bootstrap';
import { AuthContext } from '../Contexts/AuthContext';


//Functional component - SignUp.
export default function SignUp() {

    //Hooks.
    const [empId, setEmpId] = useState("");
    const [password, setPassword] = useState("");
    const [passRepeat, setPassRepeat] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [imageSelect, changeImageSelect] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    //Get signUp function from context
    const { signUp } = useContext(AuthContext);

    //Handle form submission
    const handleSignUp = (e) => {
        e.preventDefault();
        
        if (password !== passRepeat) {
            setErrorMessage("Passwords do not match!");
            return;
        }
        
        if (!empId || !firstName || !lastName || !email || !password) {
            setErrorMessage("Please fill all fields!");
            return;
        }
        
        signUp({
            empid: empId,
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password
        });
        
        setErrorMessage("Account created! Please login.");
    };

    return (
       <Card style = { {width: "500px", "marginTop": "40px", "marginLeft" : "auto", "marginRight": "auto", background: "white", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", borderRadius: "16px", border: "none"} }>
            <Card.Body style={{padding: "50px"}}>
                <Card.Title style = { {color: "#1a1a1a", fontSize: "32px", fontWeight: "700", marginBottom: "10px", textAlign: "center", letterSpacing: "-0.5px"} }>
                    Create your account
                </Card.Title>
                <p style={{color: "#6c757d", fontSize: "15px", marginBottom: "35px", textAlign: "center"}}>Join VRide and start carpooling today</p>
                <Card.Body style={{padding: "0"}}>
                    <Form>
                        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px"}}>
                            <Form.Group>
                                <Form.Label style={{color: "#495057", fontWeight: "500", fontSize: "14px", marginBottom: "8px"}}>Employee ID</Form.Label>
                                <Form.Control type = "text" value = { empId } placeholder = "Enter ID"
                                    style={{padding: "12px 16px", borderRadius: "10px", border: "1px solid #e0e0e0"}}
                                    onChange = {(e) => { setEmpId(e.target.value); }}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label style={{color: "#495057", fontWeight: "500", fontSize: "14px", marginBottom: "8px"}}>Email</Form.Label>
                                <Form.Control type = "email" value = { email } placeholder = "you@company.com"
                                    style={{padding: "12px 16px", borderRadius: "10px", border: "1px solid #e0e0e0"}}
                                    onChange = {(e) => { setEmail(e.target.value); }}/>
                            </Form.Group>
                        </div>
                        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px"}}>
                            <Form.Group>
                                <Form.Label style={{color: "#495057", fontWeight: "500", fontSize: "14px", marginBottom: "8px"}}>First Name</Form.Label>
                                <Form.Control type = "text" value = { firstName } placeholder = "John"
                                    style={{padding: "12px 16px", borderRadius: "10px", border: "1px solid #e0e0e0"}}
                                    onChange = {(e) => { setFirstName(e.target.value); }}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label style={{color: "#495057", fontWeight: "500", fontSize: "14px", marginBottom: "8px"}}>Last Name</Form.Label>
                                <Form.Control type = "text" value = { lastName } placeholder = "Doe"
                                    style={{padding: "12px 16px", borderRadius: "10px", border: "1px solid #e0e0e0"}}
                                    onChange = {(e) => { setLastName(e.target.value); }}/>
                            </Form.Group>
                        </div>
                        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px"}}>
                            <Form.Group>
                                <Form.Label style={{color: "#495057", fontWeight: "500", fontSize: "14px", marginBottom: "8px"}}>Password</Form.Label>
                                <Form.Control type = "password" value = { password } placeholder = "Min. 8 characters"
                                    style={{padding: "12px 16px", borderRadius: "10px", border: "1px solid #e0e0e0"}}
                                    onChange = {(e) => { setPassword(e.target.value); }}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label style={{color: "#495057", fontWeight: "500", fontSize: "14px", marginBottom: "8px"}}>Confirm Password</Form.Label>
                                <Form.Control type = "password" value = { passRepeat } placeholder = "Repeat password"
                                    style={{padding: "12px 16px", borderRadius: "10px", border: "1px solid #e0e0e0"}}
                                    onChange = {(e) => { setPassRepeat(e.target.value); }}/>
                            </Form.Group>
                        </div>
                        <Button onClick={handleSignUp} style={{width: "100%", padding: "14px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", border: "none", borderRadius: "10px", fontSize: "16px", fontWeight: "600", marginBottom: "16px"}}>Create Account</Button>
                        {errorMessage && <div style={{marginTop: "16px", padding: "12px", background: errorMessage.includes("created") ? "#d4edda" : "#fee", borderRadius: "8px", color: errorMessage.includes("created") ? "#155724" : "#c33", fontSize: "13px", textAlign: "center"}}>{errorMessage}</div>}
                    </Form>
                </Card.Body>
            </Card.Body>
        </Card>
    )
}
