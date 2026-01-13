package com.purple.vride.controllers;

/**
 * @author Vishal N 
 * @date February 13, 2020.
 * @version 2.0 - Improved by GitHub Copilot on January 12, 2026
 * 
*/

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.purple.vride.dto.ApiResponse;
import com.purple.vride.dto.CreateCarpoolRequest;
import com.purple.vride.dto.JoinCarpoolRequest;
import com.purple.vride.repositories.CarpoolRepository;
import com.purple.vride.models.Carpool;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/carpools")
@Tag(name = "Carpool", description = "Carpool management APIs")
public class CarpoolController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(CarpoolController.class);
	
	@Autowired
	private CarpoolRepository carpoolRepository;
	
	@GetMapping
	@Operation(summary = "Get all carpools", description = "Retrieves a list of all available carpools")
	public ResponseEntity<ApiResponse<List<Carpool>>> getCarpools() {
		try {
			LOGGER.info("Fetching all carpools");
			List<Carpool> carpools = (List<Carpool>) carpoolRepository.findAll();
			return ResponseEntity.ok(ApiResponse.success("Carpools retrieved successfully", carpools));
		} catch (Exception e) {
			LOGGER.error("Error fetching carpools", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(ApiResponse.error("Failed to fetch carpools: " + e.getMessage()));
		}
	}
	
	@PostMapping
	@Operation(summary = "Create a new carpool", description = "Creates a new carpool with the provided details")
	public ResponseEntity<ApiResponse<Carpool>> createCarpool(@Valid @RequestBody CreateCarpoolRequest request) {
		try {
			LOGGER.info("Creating carpool for owner: {}", request.getOwnername());
			
Carpool carpool = new Carpool();
			carpool.setOwnerId(request.getOwnerid());
			carpool.setOwnerName(request.getOwnername());
			carpool.setFromLocation(request.getFromLocation());
			carpool.setToLocation(request.getToLocation());
			carpool.setVehicle(request.getVehicle());
			carpool.setRegno(request.getRegno());
			carpool.setNoOfSeats(request.getNoofSeats());
			if (request.getDate() != null) {
				carpool.setDate(request.getDate());
			}
			if (request.getTime() != null) {
				carpool.setTime(request.getTime());
			}
			
			Carpool savedCarpool = carpoolRepository.save(carpool);
			LOGGER.info("Carpool created successfully with ID: {}", savedCarpool.getCarpoolId());
			
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(ApiResponse.success("Carpool created successfully", savedCarpool));
		} catch (Exception e) {
			LOGGER.error("Error creating carpool", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(ApiResponse.error("Failed to create carpool: " + e.getMessage()));
		}
	}
	
	@PostMapping("/{id}/join")
	@Operation(summary = "Join a carpool", description = "Allows a passenger to join an existing carpool")
	public ResponseEntity<ApiResponse<Carpool>> joinCarpool(
			@PathVariable("id") Integer carpoolId,
			@Valid @RequestBody JoinCarpoolRequest request) {
		try {
			LOGGER.info("User {} joining carpool {}", request.getPassengerId(), carpoolId);
			
			Carpool carpool = carpoolRepository.findById(carpoolId)
					.orElse(null);
			
			if (carpool == null) {
				LOGGER.warn("Carpool not found: {}", carpoolId);
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(ApiResponse.error("Carpool not found"));
			}
			
			if (carpool.getNoOfSeats() <= 0) {
				LOGGER.warn("Carpool {} is full", carpoolId);
				return ResponseEntity.status(HttpStatus.CONFLICT)
						.body(ApiResponse.error("Carpool is full"));
			}
			
			carpool.setNoOfSeats(carpool.getNoOfSeats() - 1);
			Carpool updatedCarpool = carpoolRepository.save(carpool);
			
			LOGGER.info("User {} successfully joined carpool {}", request.getPassengerId(), carpoolId);
			return ResponseEntity.ok(ApiResponse.success("Successfully joined carpool", updatedCarpool));
		} catch (Exception e) {
			LOGGER.error("Error joining carpool", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(ApiResponse.error("Failed to join carpool: " + e.getMessage()));
		}
	}
	
	@GetMapping("/{id}")
	@Operation(summary = "Get carpool by ID", description = "Retrieves a specific carpool by its ID")
	public ResponseEntity<ApiResponse<Carpool>> getCarpoolById(@PathVariable("id") Integer carpoolId) {
		try {
			LOGGER.info("Fetching carpool with ID: {}", carpoolId);
			Carpool carpool = carpoolRepository.findById(carpoolId)
					.orElse(null);
			
			if (carpool == null) {
				LOGGER.warn("Carpool not found: {}", carpoolId);
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(ApiResponse.error("Carpool not found"));
			}
			
			return ResponseEntity.ok(ApiResponse.success("Carpool retrieved successfully", carpool));
		} catch (Exception e) {
			LOGGER.error("Error fetching carpool", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(ApiResponse.error("Failed to fetch carpool: " + e.getMessage()));
		}
	}
}
