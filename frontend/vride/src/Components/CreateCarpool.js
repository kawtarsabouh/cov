//General imports.
import React, { useState, useContext } from 'react';
import { Row, Card, Col, Form, Button, } from 'react-bootstrap';
import { TimePicker, DatePicker } from 'antd';
import moment from 'moment';
import axios from 'axios';
import 'antd/dist/antd.css';

//Resource imports.
import { SELECT_DAY, SELECT_MONTH, SELECT_TOD, DATE_FORMAT, TIME_FORMAT, CREATE_CARPOOL_URL } from '../Res/constants';
import { AuthContext } from '../Contexts/AuthContext';
import LocationPicker from './LocationPicker';

//Functional component - CreateCarpool.
export default function CreateCarpool() {

    //Hooks
    const[fromLocation, setFromLocation] = useState("");
    const[toLocation, setToLocation] = useState("");
    const[vehicle, setVehicle] = useState("");
    const[regno, setRegno] = useState("");
    const[noOfSeats, setNoOfSeats] = useState("");
    const[date, setDate] = useState("");
    const[time, setTime] = useState("");

    //Authentication info
    const { employeeID } = useContext(AuthContext);
    const { firstname } = useContext(AuthContext);


    //Error message hook. 
    const[errorMessage, setErrorMessage] = useState("");

    //Function to handle form submission.
    const submitted = (e) => {
        if (e) e.preventDefault();

        if (checkValidSchedule({ date: date, time: time })) {
            setErrorMessage("");
            axios
                .post(CREATE_CARPOOL_URL, {
                    ownerid: employeeID,
                    ownername: firstname,
                    fromLocation: fromLocation,
                    toLocation: toLocation,
                    vehicle: vehicle,
                    regno: regno,
                    noofSeats: parseInt(noOfSeats),
                    date: date,
                    time: time
                })
                .then((res) => {
                    console.log("Create carpool response:", res.data);
                    if (res.data && res.data.success) {
                        setErrorMessage("Ride created successfully!");
                        setTimeout(() => {
                            window.location.href = "/";
                        }, 1500);
                    } else {
                        setErrorMessage("Failed to create ride: " + (res.data?.message || "Unknown error"));
                    }
                })
                .catch((err) => {
                    console.error("Create carpool error:", err.response || err);
                    setErrorMessage("Failed to create ride: " + (err.response?.data?.message || err.message));
                });
        } else {
            setErrorMessage("Invalid schedule!");
        }
    }

    //Check if the date and time user provides are valid.
    const checkValidSchedule = (schedule) => {
        const now = moment();
        const scheduledDate = moment(schedule.date,'YYYY-MM-DD');
        var dateDiff = scheduledDate.diff(now,'days');

        const scheduledTime = moment(schedule.time,'HH:mm');
        var timeDiff = scheduledTime.diff(now,'seconds');
        
        if(dateDiff === 0) {
            if(timeDiff > 0)
                return true;
            else
                return false;
        }
        else if(dateDiff < 0) {
           return false;
        }
        else {
            return true;
        }
    }

    //Function to format the user specified time to suitable format.
    const setTimeHelper = (timeObject) => {
        setTime(moment(timeObject).format(TIME_FORMAT));
    }

    //Function to format the user specified date to suitable format.
    const setDateHelper = (dateObject) => {
        setDate(moment(dateObject).format('YYYY-MM-DD'));
    }

    //Render templates for days. 
    let days = SELECT_DAY.map((day) =>
                <option value = { day }>{ day }</option>
            );

    //Render template for months.
    let months = SELECT_MONTH.map((month) =>
                <option value = { month.value }>{ month.name }</option>
            );

    //Render template for time of day. 
    let timeOfDay = SELECT_TOD.map((t) =>
                <option value = { t }>{ t }</option>
            );

    
    return (
        <Card style = { {"marginLeft" : "15px", "marginTop" : "10px", "marginRight" : "20px" } }>
            <Card.Title style = { {"padding" : "10px"} }>
                <h3> Create a Carpool </h3>
            </Card.Title>
            <Card.Body>
                <Form>
                    <Row>
                        <Col>
                            <LocationPicker 
                                placeholder="📍 Riding from" 
                                onLocationSelect={setFromLocation}
                            />
                        </Col>
                        <Col>
                            <LocationPicker 
                                placeholder="📍 Riding to" 
                                onLocationSelect={setToLocation}
                            />
                        </Col>
                    </Row>
                    <Row style = {{"marginTop" : "20px"}}>
                        <Col>
                            <Form.Control placeholder = "Vehicle Model" onChange = {(e) => {
                                    setVehicle(e.target.value);
                                }}/>
                        </Col>
                        <Col>
                            <Form.Control placeholder = "Registration Number" onChange = {(e) => {
                                    setRegno(e.target.value);
                                }}/>
                        </Col>
                    </Row>
                    <Row style = {{"marginTop" : "20px"}} >
                        <Col md = "4">
                            <Form.Control placeholder = "Number of seats"
                                onChange = {(e) => {
                                    setNoOfSeats(e.target.value);
                                }}
                            />
                        </Col>
                        <Col md = "3">
                            <DatePicker onChange={setDateHelper} />
                        </Col>

                        <Col md = "3">
                            <TimePicker
                                defaultValue={moment('12:08', TIME_FORMAT)}
                                format={TIME_FORMAT}
                                onChange = { setTimeHelper }
                                defaultValue = { '' }
                                placeholder = {"Select time"}
                            />    
                        </Col>
                    </Row>
                    <Row style = {{"marginTop" : "20px", "marginLeft" : "4px"}}>
                        <Button variant = "primary" onClick = {submitted}>Create!</Button>
                    </Row>
                    <Row style = {{"marginTop" : "20px", "color" : "red"}}>
                        <span> { errorMessage } </span>   
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    )
}
