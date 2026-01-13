//General imports.
import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

//Component imports.
import LoginForm from './LoginForm';
import Carpools from './Carpools';
import CreateCarpool from './CreateCarpool';
import '../App.css'
import { AuthContext } from '../Contexts/AuthContext';

//Class component - HomePage.
export default class HomePage extends Component {

    //Context consumption.
    static contextType = AuthContext;

    render() {

        //Destructuring information from context.
        const { isLoggedIn } = this.context;
        
        if(isLoggedIn)
        {
        return (
            <div style={{maxWidth: "1400px", margin: "0 auto", padding: "20px"}}>
            <Row style={{margin: 0}}>
                <Col lg={8} style={{paddingRight: "12px", paddingLeft: 0}}>
                    <Carpools/>
                </Col>
                <Col lg={4} style={{paddingLeft: "12px", paddingRight: 0}}>
                    <CreateCarpool/>
                </Col>
            </Row>
            </div>
        )
        }
        else
        {
            return (
               <div style={{maxWidth: "1400px", margin: "0 auto", padding: "20px"}}>
                    <Row style={{margin: 0}}>
                        <Col lg={8} style={{paddingRight: "12px", paddingLeft: 0}}>
                            <Carpools/>
                        </Col>
                        <Col lg={4} style={{paddingLeft: "12px", paddingRight: 0}}>
                            <LoginForm/>
                        </Col>
                    </Row>
                </div>
            )
        }
    }
}
