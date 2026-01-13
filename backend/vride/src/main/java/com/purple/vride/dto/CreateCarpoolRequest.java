package com.purple.vride.dto;

import javax.validation.constraints.*;

/**
 * Data Transfer Object for creating a new Carpool
 * @author Improved by GitHub Copilot
 * @date January 12, 2026
 */
public class CreateCarpoolRequest {
    
    @NotBlank(message = "From location is required")
    @Size(min = 3, max = 255, message = "From location must be between 3 and 255 characters")
    private String fromLocation;
    
    private String toLocation;
    
    @NotBlank(message = "Owner name is required")
    @Size(min = 2, max = 100, message = "Owner name must be between 2 and 100 characters")
    private String ownername;
    
    @NotBlank(message = "Vehicle information is required")
    @Size(min = 2, max = 100, message = "Vehicle information must be between 2 and 100 characters")
    private String vehicle;
    
    @NotBlank(message = "Registration number is required")
    @Pattern(regexp = "^[A-Z0-9-]+$", message = "Registration number must contain only uppercase letters, numbers, and hyphens")
    private String regno;
    
    @Min(value = 1, message = "Number of seats must be at least 1")
    @Max(value = 10, message = "Number of seats cannot exceed 10")
    private int noofSeats;
    
    @NotNull(message = "Owner ID is required")
    @Min(value = 1, message = "Owner ID must be positive")
    private Integer ownerid;
    
    // Optional fields
    private String date;
    private String time;
    
    // Getters and Setters
    public String getFromLocation() {
        return fromLocation;
    }
    
    public void setFromLocation(String fromLocation) {
        this.fromLocation = fromLocation;
    }
    
    public String getToLocation() {
        return toLocation;
    }
    
    public void setToLocation(String toLocation) {
        this.toLocation = toLocation;
    }
    
    public String getOwnername() {
        return ownername;
    }
    
    public void setOwnername(String ownername) {
        this.ownername = ownername;
    }
    
    public String getVehicle() {
        return vehicle;
    }
    
    public void setVehicle(String vehicle) {
        this.vehicle = vehicle;
    }
    
    public String getRegno() {
        return regno;
    }
    
    public void setRegno(String regno) {
        this.regno = regno;
    }
    
    public int getNoofSeats() {
        return noofSeats;
    }
    
    public void setNoofSeats(int noofSeats) {
        this.noofSeats = noofSeats;
    }
    
    public Integer getOwnerid() {
        return ownerid;
    }
    
    public void setOwnerid(Integer ownerid) {
        this.ownerid = ownerid;
    }
    
    public String getDate() {
        return date;
    }
    
    public void setDate(String date) {
        this.date = date;
    }
    
    public String getTime() {
        return time;
    }
    
    public void setTime(String time) {
        this.time = time;
    }
}
