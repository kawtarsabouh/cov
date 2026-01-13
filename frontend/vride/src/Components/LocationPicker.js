import React, { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';

export default function LocationPicker({ onLocationSelect, placeholder = "Enter location..." }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    // Casablanca locations
    const locations = [
        "Casa Voyageurs Station",
        "Sidi Maarouf",
        "Ain Diab",
        "Twin Center",
        "Maarif",
        "Morocco Mall",
        "Anfa Place",
        "Casa Port",
        "Hay Hassani",
        "Marina Casablanca",
        "Bourgogne",
        "Mohammed V Airport",
        "Gauthier",
        "Derb Ghallef",
        "Bouskoura",
        "Californie",
        "Oulfa"
    ];

    const handleSearch = (value) => {
        setSearchQuery(value);
        if (value.length > 0) {
            const filtered = locations.filter(loc => 
                loc.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelect = (location) => {
        setSearchQuery(location);
        setSuggestions([]);
        if (onLocationSelect) {
            onLocationSelect(location);
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <Form.Control
                type="text"
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                style={{
                    border: 'none',
                    background: '#F5F5F7',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    fontSize: '15px'
                }}
            />
            
            {suggestions.length > 0 && (
                <ListGroup 
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                        marginTop: '8px',
                        maxHeight: '250px',
                        overflowY: 'auto',
                        borderRadius: '12px',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
                    }}
                >
                    {suggestions.map((location, index) => (
                        <ListGroup.Item
                            key={index}
                            action
                            onClick={() => handleSelect(location)}
                            style={{
                                cursor: 'pointer',
                                border: 'none',
                                padding: '12px 16px',
                                fontSize: '15px'
                            }}
                        >
                            📍 {location}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
}
