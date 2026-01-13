import React, { useState } from 'react'
import {Card, Row, Col, Form, Button, CardDeck} from 'react-bootstrap';
import CarpoolFeed from './CarpoolFeed';
import CarpoolMap from './CarpoolMap';
import { Scrollbars } from 'react-custom-scrollbars';

export default function Carpools() {
    const[searchQuery, updateSearchQuery] = useState("");
    const[activeView, setActiveView] = useState("list"); // 'list' or 'map'
    
    return (
        <div>
            <Card style={{ "width": "100%", "marginTop": "24px", background: "#ffffff", boxShadow: "0 1px 3px rgba(0,0,0,0.08)", borderRadius: "16px", border: "none" }}>
                <Card.Header style={{background: "#ffffff", borderBottom: "1px solid #F5F5F7", padding: "20px 24px", borderRadius: "16px 16px 0 0"}}>
                    <h3 style={{margin: 0, color: "#1a1a1a", fontSize: "22px", fontWeight: "700", letterSpacing: "-0.3px"}}>Available Rides</h3>
                    <p style={{margin: "6px 0 0 0", color: "#8E8E93", fontSize: "14px", fontWeight: "400"}}>Choose a ride that suits you best</p>
                    
                    {/* View Switcher */}
                    <div style={{
                        display: 'flex',
                        gap: '8px',
                        marginTop: '16px',
                        marginBottom: '16px',
                        background: '#F5F5F7',
                        padding: '4px',
                        borderRadius: '12px',
                        width: 'fit-content'
                    }}>
                        <button
                            onClick={() => setActiveView('list')}
                            style={{
                                padding: '10px 24px',
                                border: 'none',
                                background: activeView === 'list' ? 'white' : 'transparent',
                                borderRadius: '10px',
                                fontWeight: '600',
                                fontSize: '14px',
                                color: activeView === 'list' ? '#667eea' : '#8E8E93',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: activeView === 'list' ? '0 2px 8px rgba(102,126,234,0.15)' : 'none'
                            }}
                        >
                            📋 List View
                        </button>
                        <button
                            onClick={() => setActiveView('map')}
                            style={{
                                padding: '10px 24px',
                                border: 'none',
                                background: activeView === 'map' ? 'white' : 'transparent',
                                borderRadius: '10px',
                                fontWeight: '600',
                                fontSize: '14px',
                                color: activeView === 'map' ? '#667eea' : '#8E8E93',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: activeView === 'map' ? '0 2px 8px rgba(102,126,234,0.15)' : 'none'
                            }}
                        >
                            🗺️ Map View
                        </button>
                    </div>
                </Card.Header>
                <Card.Body style={{padding: activeView === 'map' ? '0' : '24px'}}>
                    {activeView === 'list' ? (
                        <>
                            <div style={{marginBottom: "20px"}}>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Where are you going?" 
                                    style={{
                                        border: "none",
                                        background: "#F5F5F7",
                                        borderRadius: "12px",
                                        padding: "14px 16px",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                        transition: "all 0.2s ease"
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.background = "#EBEBED";
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.background = "#F5F5F7";
                                    }}
                                />
                            </div>
                            <div>
                                <Scrollbars style = {{"height" : "550px"}} autoHide>
                                    <div style={{padding: "0 4px"}}>
                                        <CarpoolFeed/>
                                    </div>
                                </Scrollbars>
                            </div>
                        </>
                    ) : (
                        <div style={{padding: "24px"}}>
                            <CarpoolMap />
                        </div>
                    )}
                </Card.Body>
            </Card>
        </div>
    )
}
