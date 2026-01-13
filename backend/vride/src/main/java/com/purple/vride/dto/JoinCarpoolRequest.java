package com.purple.vride.dto;

import javax.validation.constraints.*;

/**
 * Data Transfer Object for joining a Carpool
 * @author Improved by GitHub Copilot
 * @date January 12, 2026
 */
public class JoinCarpoolRequest {
    
    @NotNull(message = "Carpool ID is required")
    @Min(value = 1, message = "Carpool ID must be positive")
    private Integer carpoolId;
    
    @NotNull(message = "Passenger ID is required")
    @Min(value = 1, message = "Passenger ID must be positive")
    private Integer passengerId;
    
    // Getters and Setters
    public Integer getCarpoolId() {
        return carpoolId;
    }
    
    public void setCarpoolId(Integer carpoolId) {
        this.carpoolId = carpoolId;
    }
    
    public Integer getPassengerId() {
        return passengerId;
    }
    
    public void setPassengerId(Integer passengerId) {
        this.passengerId = passengerId;
    }
}
