import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, Button, Badge } from 'react-bootstrap';
import axios from 'axios';
import { CARPOOL_URL } from '../Res/constants';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RrO09wSlNr+pTLRfhC2lbF1pF1jzC1N9LZiKR22bZjbW0GfY7HM67oBhcOYGF3K6sHGgLCZl7TsgAhNVdKvwYxJp4Hxmco28QjSkYmjlykAKJdqCrh3k7bxZWS5sHj1mBL4LmfPvs6b+xLYuHhPxV8vPhC8cVHrvwKNdP5LZhXKqAOy6OdtGYxEfLlOHJ1YQTE3cAe4hBSDM5KiQ5/HKnfLEE5w8t5d6WXF0B9XH1g9rXLuv5tUfMKrmYpAg1JYJVaJE/8aTWOSP+3BW0eMRpYJYWDKBm1CqSnOJlWLn7MlZoTNKFq2sKNLPjGAqEvdJD4KBWJ0vH+PVlrvNfWDd4KLLEzfLM8QMfvtf3K7JmNCUBANMH2T3d1yO8P/c6p0U5UWlG0rrTMf7WPQxT9zBh3p4m0Y6Y5P8bSfgVZqOcMjpRmRNfU7IFHcWjmPFXdJr2U9pbR1r9BN1aFZLb5e5Hg5p+hKY7AjMq9bLfbY4HiD3v1YkqC+6dPl6Hcq6cKJB2mGFVB0b/6+TqjPvPJrH1TeLVbm9MR2J0LHJcPvYvH4JDKaC2XjNwvWJJ0hnLrXfNRRBNYhEiOBQvSbcVGMU2MWvMdlKCXKVAkXvFKhE8XKP8wCPP+ggqBKOQMahJLWWCJQCvdCdx8FTU6pj6yPP8lN2dn98O2V9/2P+hj4LftYy7LQ==',
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RrO09wSlNr+pTLRfhC2lbF1pF1jzC1N9LZiKR22bZjbW0GfY7HM67oBhcOYGF3K6sHGgLCZl7TsgAhNVdKvwYxJp4Hxmco28QjSkYmjlykAKJdqCrh3k7bxZWS5sHj1mBL4LmfPvs6b+xLYuHhPxV8vPhC8cVHrvwKNdP5LZhXKqAOy6OdtGYxEfLlOHJ1YQTE3cAe4hBSDM5KiQ5/HKnfLEE5w8t5d6WXF0B9XH1g9rXLuv5tUfMKrmYpAg1JYJVaJE/8aTWOSP+3BW0eMRpYJYWDKBm1CqSnOJlWLn7MlZoTNKFq2sKNLPjGAqEvdJD4KBWJ0vH+PVlrvNfWDd4KLLEzfLM8QMfvtf3K7JmNCUBANMH2T3d1yO8P/c6p0U5UWlG0rrTMf7WPQxT9zBh3p4m0Y6Y5P8bSfgVZqOcMjpRmRNfU7IFHcWjmPFXdJr2U9pbR1r9BN1aFZLb5e5Hg5p+hKY7AjMq9bLfbY4HiD3v1YkqC+6dPl6Hcq6cKJB2mGFVB0b/6+TqjPvPJrH1TeLVbm9MR2J0LHJcPvYvH4JDKaC2XjNwvWJJ0hnLrXfNRRBNYhEiOBQvSbcVGMU2MWvMdlKCXKVAkXvFKhE8XKP8wCPP+ggqBKOQMahJLWWCJQCvdCdx8FTU6pj6yPP8lN2dn98O2V9/2P+hj4LftYy7LQ==',
    shadowUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBCF4f9/au/dP7SQFjIr6wsSB9z01IiKyotPiFY+YF2BtMdz1nKdE2a8I6y1Y48k4mVRJ5J6t+d3G7DWLL5ZVPB3+yZY3SX+BRRkHH0DEBr0yJpGEjGb5YoCLxoZxRHWCO5WCKiPZFm3wRG5kNIBGJ/vIKb9Z7EEhLvb7lJTJmP8yrYJNQx9o3Qz23tGgS3Gc4y7hIVMm6K1NvJ0wy9cN8kx0rYcJTcMx+a4f7t6yH5bL5H2c+YfvH0MaZJSBnmT3Hfw7AvPMcbH4xDlQ7Q4hE1z/BpKyLaWZsBMvvEb0Cr9LxqX7Y7KHg5Jm1bYHKs+DTAQ=='
});

// Custom car icon for carpools
const carIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="11" fill="#667eea" stroke="white" stroke-width="2"/>
            <path d="M17 11h-1.5l-1-2.5h-5L8.5 11H7c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-1h6v1c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1zm-8 3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm6 0c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm-6-3l.8-2h4.4l.8 2H9z" fill="white"/>
        </svg>
    `),
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

// User location icon
const userIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="#34C759" stroke="white" stroke-width="2"/>
            <circle cx="12" cy="12" r="4" fill="white"/>
        </svg>
    `),
    iconSize: [30, 30],
    iconAnchor: [15, 15]
});

export default function CarpoolMap() {
    const [carpools, setCarpools] = useState([]);
    const [userLocation, setUserLocation] = useState(null);

    // Casablanca locations (real coordinates)
    const locationCoords = {
        "Casa Voyageurs Station": [33.5928, -7.5898],
        "Sidi Maarouf": [33.5138, -7.6574],
        "Ain Diab": [33.6037, -7.6578],
        "Twin Center": [33.5883, -7.6328],
        "Maarif": [33.5731, -7.6298],
        "Morocco Mall": [33.5462, -7.6947],
        "Anfa Place": [33.5886, -7.6484],
        "Casa Port": [33.5954, -7.6169],
        "Hay Hassani": [33.5595, -7.5978],
        "Marina Casablanca": [33.5547, -7.6795],
        "Bourgogne": [33.5798, -7.6398],
        "Mohammed V Airport": [33.3675, -7.5898]
    };

    useEffect(() => {
        // Get user location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation([position.coords.latitude, position.coords.longitude]);
                },
                () => {
                    // Default to Casablanca center if location denied
                    setUserLocation([33.5731, -7.5898]);
                }
            );
        } else {
            setUserLocation([33.5731, -7.5898]);
        }

        // Fetch carpools
        axios.get(CARPOOL_URL)
            .then(res => {
                const data = res.data.success ? res.data.data : res.data;
                setCarpools(data);
            })
            .catch(err => {
                console.error("Error fetching carpools:", err);
            });
    }, []);

    const handleCarpoolClick = (carpool) => {
        console.log("Selected carpool:", carpool);
    };

    const getCoords = (location) => {
        return locationCoords[location] || [33.5731, -7.5898];
    };

    if (!userLocation) {
        return <div style={{textAlign: "center", padding: "40px"}}>Loading map...</div>;
    }

    return (
        <div style={{height: "100%", width: "100%", position: "relative"}}>
            <MapContainer 
                center={userLocation} 
                zoom={12} 
                style={{height: "600px", width: "100%", borderRadius: "16px", overflow: "hidden"}}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* User location */}
                {userLocation && (
                    <>
                        <Marker position={userLocation} icon={userIcon}>
                            <Popup>
                                <strong>Your Location</strong>
                            </Popup>
                        </Marker>
                        <Circle 
                            center={userLocation} 
                            radius={3000} 
                            pathOptions={{
                                color: '#34C759',
                                fillColor: '#34C759',
                                fillOpacity: 0.1
                            }}
                        />
                    </>
                )}

                {/* Carpool markers */}
                {carpools.map((carpool) => {
                    const fromCoords = getCoords(carpool.fromLocation);
                    const toCoords = getCoords(carpool.toLocation || "Tech Park Phase 2");
                    const isFull = carpool.noOfSeats <= 0;

                    return (
                        <React.Fragment key={carpool.carpoolId}>
                            <Marker 
                                position={fromCoords} 
                                icon={carIcon}
                                eventHandlers={{
                                    click: () => handleCarpoolClick(carpool)
                                }}
                            >
                                <Popup>
                                    <div style={{minWidth: "250px"}}>
                                        <div style={{marginBottom: "12px"}}>
                                            <div style={{fontSize: "18px", fontWeight: "700", color: "#1a1a1a", marginBottom: "4px"}}>
                                                {carpool.ownerName}
                                            </div>
                                            <div style={{fontSize: "14px", color: "#8E8E93"}}>
                                                {carpool.vehicle}
                                            </div>
                                        </div>
                                        
                                        <div style={{marginBottom: "12px"}}>
                                            <div style={{fontSize: "12px", color: "#8E8E93", marginBottom: "2px"}}>FROM</div>
                                            <div style={{fontSize: "14px", fontWeight: "600"}}>{carpool.fromLocation}</div>
                                        </div>
                                        
                                        <div style={{marginBottom: "12px"}}>
                                            <div style={{fontSize: "12px", color: "#8E8E93", marginBottom: "2px"}}>TO</div>
                                            <div style={{fontSize: "14px", fontWeight: "600"}}>{carpool.toLocation || "Tech Park"}</div>
                                        </div>

                                        <div style={{display: "flex", gap: "8px", marginBottom: "12px"}}>
                                            <Badge bg={isFull ? "danger" : "success"}>
                                                {isFull ? "Full" : `${carpool.noOfSeats} seats`}
                                            </Badge>
                                            <Badge bg="primary">{carpool.time || "3:00 PM"}</Badge>
                                        </div>

                                        <Button 
                                            size="sm" 
                                            style={{
                                                width: "100%",
                                                background: "#667eea",
                                                border: "none",
                                                fontWeight: "600"
                                            }}
                                            disabled={isFull}
                                        >
                                            {isFull ? "Full" : "View Details"}
                                        </Button>
                                    </div>
                                </Popup>
                            </Marker>

                            {/* Route line */}
                            <Polyline
                                positions={[fromCoords, toCoords]}
                                pathOptions={{
                                    color: '#667eea',
                                    weight: 3,
                                    opacity: 0.6,
                                    dashArray: '10, 10'
                                }}
                            />
                        </React.Fragment>
                    );
                })}
            </MapContainer>

            {/* Legend */}
            <Card style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                zIndex: 1000,
                padding: "16px",
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
            }}>
                <div style={{fontSize: "14px", fontWeight: "700", marginBottom: "12px"}}>Map Legend</div>
                <div style={{display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px"}}>
                    <div style={{width: "20px", height: "20px", borderRadius: "50%", background: "#34C759"}}></div>
                    <span style={{fontSize: "13px"}}>Your Location</span>
                </div>
                <div style={{display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px"}}>
                    <div style={{width: "20px", height: "20px", borderRadius: "50%", background: "#667eea"}}></div>
                    <span style={{fontSize: "13px"}}>Available Rides</span>
                </div>
                <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                    <div style={{width: "20px", height: "2px", background: "#667eea", borderStyle: "dashed"}}></div>
                    <span style={{fontSize: "13px"}}>Route</span>
                </div>
            </Card>

            {/* Stats Card */}
            <Card style={{
                position: "absolute",
                bottom: "16px",
                left: "16px",
                zIndex: 1000,
                padding: "16px 20px",
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
            }}>
                <div style={{fontSize: "24px", fontWeight: "800", color: "#667eea", marginBottom: "4px"}}>
                    {carpools.length}
                </div>
                <div style={{fontSize: "13px", color: "#8E8E93", fontWeight: "600"}}>
                    Available Rides Nearby
                </div>
            </Card>
        </div>
    );
}
