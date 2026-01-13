//General imports
import React, { useState, useContext } from 'react'
import { Row, Card, Col, Image, Button, Badge } from 'react-bootstrap';
import axios from 'axios';
import { usePosition } from 'use-position';

//Resource imports
import profile from '../Res/Images/profile.jpg';
import { CARPOOL_URL, NO_CARPOOLS, DIST_KMS, DIST_METRES } from '../Res/constants';
import { AuthContext } from '../Contexts/AuthContext';

//Geodist library import
var geodist = require('geodist')

//Functional component - CarpoolFeed
export default function CarpoolFeed() {
     
    //Hooks
    const [carpools, setCarpools] = useState("");
    const [joinedCarpools, setJoinedCarpools] = useState([]);
    const { employeeID, isLoggedIn } = useContext(AuthContext);

    //Function to handle joining a carpool
    const handleJoinCarpool = (carpoolId, seatsLeft) => {
        if (!isLoggedIn) {
            alert("Please login to join a carpool!");
            return;
        }
        
        if (seatsLeft <= 0) {
            alert("Sorry, this carpool is full!");
            return;
        }

        axios.post(`http://localhost:8080/api/carpools/${carpoolId}/join`, {
            passengerId: employeeID,
            carpoolId: carpoolId
        })
        .then(res => {
            console.log("Join response:", res.data);
            if (res.data && res.data.success) {
                alert("Successfully joined the carpool!");
                setJoinedCarpools([...joinedCarpools, carpoolId]);
                // Refresh carpool list to update available seats
                window.location.reload();
            } else {
                alert("Failed to join carpool: " + (res.data?.message || "Unknown error"));
            }
        })
        .catch(err => {
            console.error("Join carpool error:", err.response || err);
            alert("Error joining carpool. Please try again.");
        });
    };

    //URL Call
    axios.get(CARPOOL_URL)
        .then(res => {
            // Handle new API response format
            const data = res.data.success ? res.data.data : res.data;
            setCarpools(data);
        })
        .catch(err => {
            console.error("Error fetching carpools:", err);
        })
    
    //Iterating through all available carpools
    const allCarpools = carpools;
    var arr = [];
    for (var key in allCarpools) {
        arr.push(allCarpools[key]);
    }

    //usePosition Hook to get location of user.
    const { latitude, longitude } = usePosition();

    const data = arr.length ? (
        arr.map(arr => {
            const isJoined = joinedCarpools.includes(arr.carpoolId);
            const isFull = arr.noOfSeats <= 0;
            return (
                <div key = { arr.carpoolId }>
                    <Card style = { { 
                        "marginTop" : "16px", 
                        background: "#ffffff", 
                        border: "none", 
                        borderRadius: "20px", 
                        overflow: "hidden",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        transition: "all 0.2s ease"
                    } }
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
                    }}
                    >
                        <Row style={{margin: 0}}>
                            <Col md = "auto" style={{padding: "24px"}}>
                                <div style={{
                                    position: "relative",
                                    display: "inline-block"
                                }}>
                                    <Image src= { profile } roundedCircle 
                                    style = {{ 
                                        "height" : "64px", 
                                        "width" : "64px", 
                                        border: "3px solid #667eea",
                                        boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)"
                                        }} 
                                    />
                                    <div style={{
                                        position: "absolute",
                                        bottom: "0",
                                        right: "0",
                                        width: "16px",
                                        height: "16px",
                                        backgroundColor: "#10b981",
                                        border: "2px solid white",
                                        borderRadius: "50%"
                                    }}></div>
                                </div>
                            </Col>
                            <Col md = "4" style = {{"paddingTop" : "28px", "paddingLeft": "0"}}>
                                    <b style={{fontSize: "18px", color: "#1a1a1a", fontWeight: "600"}}>{ arr.ownerName }</b> 
                                    <br/>
                                    <span style={{fontSize: "14px", color: "#6c757d", display: "flex", alignItems: "center", gap: "4px", marginTop: "4px"}}> 
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#667eea">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                        </svg>
                                        <i> { getDistance() } </i> 
                                    </span>    
                            </Col>
                            <Col style={{padding: "24px 24px 16px 24px"}}>
                                <div style={{display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "12px"}}>
                                    <Badge bg={isFull ? "danger" : "success"} style={{
                                        padding: "8px 14px", 
                                        fontSize: "13px",
                                        borderRadius: "20px",
                                        fontWeight: "500",
                                        background: isFull ? "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)" : "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                                    }}>
                                        {isFull ? "🚫 Full" : `🪑 ${arr.noOfSeats} seats left`}
                                    </Badge>
                                    <Badge style={{
                                        padding: "8px 14px", 
                                        fontSize: "13px",
                                        borderRadius: "20px",
                                        fontWeight: "500",
                                        background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                                        color: "white",
                                        border: "none"
                                    }}>
                                        🚗 {arr.vehicle}
                                    </Badge>
                                </div>
                                <div style={{fontSize: "14px", color: "#495057", lineHeight: "1.8", marginTop: "8px"}}>
                                    <div style={{display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px"}}>
                                        <span style={{fontWeight: "600", color: "#667eea"}}>📍</span> 
                                        <span>{arr.fromLocation}</span>
                                    </div>
                                    <div style={{display: "flex", alignItems: "center", gap: "6px"}}>
                                        <span style={{fontWeight: "600", color: "#667eea"}}>🔑</span> 
                                        <span>{arr.regno}</span>
                                    </div>
                                </div>
                            </Col>
                            <Col md="auto" style={{display: "flex", alignItems: "center", paddingRight: "24px"}}>
                                <Button 
                                    onClick={() => handleJoinCarpool(arr.carpoolId, arr.noOfSeats)}
                                    disabled={isJoined || isFull}
                                    style={{
                                        background: isJoined ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" : (isFull ? "#6c757d" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"),
                                        border: "none",
                                        padding: "12px 28px",
                                        borderRadius: "12px",
                                        fontWeight: "600",
                                        fontSize: "15px",
                                        cursor: isFull ? "not-allowed" : "pointer",
                                        boxShadow: isFull ? "none" : "0 4px 12px rgba(102, 126, 234, 0.3)",
                                        transition: "all 0.3s ease"
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isFull && !isJoined) {
                                            e.currentTarget.style.transform = "translateY(-2px)";
                                            e.currentTarget.style.boxShadow = "0 6px 16px rgba(102, 126, 234, 0.4)";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isFull && !isJoined) {
                                            e.currentTarget.style.transform = "translateY(0)";
                                            e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.3)";
                                        }
                                    }}
                                    >
                                    {isJoined ? "✓ Joined" : (isFull ? "🚫 Full" : "Join Ride →")}
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </div>
            )
        })
    ) : 
    (
        <div style={{
            textAlign: "center",
            padding: "80px 20px"
        }}>
            <div style={{fontSize: "56px", marginBottom: "16px", opacity: 0.4}}>🚗</div>
            <h3 style={{color: "#1a1a1a", fontWeight: "600", marginBottom: "8px", fontSize: "18px"}}>{ NO_CARPOOLS }</h3>
            <p style={{color: "#8E8E93", fontSize: "14px"}}>Check back later or create your own ride</p>
        </div>
    )


    return (
        <div>
            { data }
        </div>
        
    )

    /* Helper function geoDistance()
    Calculates distance between the user's coordinates and the vehicle's coordinates.
            TEST DATA: latitude : 12.984585, longitude: 80.124250
     */
    function getDistance() {
        var dist = geodist( {lat : 12.984585, lon: 80.124250},
            {lat: latitude, lon: longitude}, {unit: 'meters'})
        if(dist < 1000)
        {
            return dist + DIST_METRES;
        } 
        else
        {
            return (dist/1000) + DIST_KMS;
        }
    }
}

