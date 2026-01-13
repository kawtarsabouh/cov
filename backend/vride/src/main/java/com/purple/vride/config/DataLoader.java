package com.purple.vride.config;

import com.purple.vride.models.Carpool;
import com.purple.vride.repositories.CarpoolRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

/**
 * Data Loader for initial sample carpools
 * @author GitHub Copilot
 * @date January 12, 2026
 */
@Configuration
@Profile("h2")
public class DataLoader {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(DataLoader.class);
    
    @Bean
    CommandLineRunner initDatabase(CarpoolRepository carpoolRepository) {
        return args -> {
            LOGGER.info("Loading sample carpool data...");
            
            // Sample carpools with realistic times and destinations for Casablanca
            Carpool c1 = new Carpool();
            c1.setOwnerId(101);
            c1.setOwnerName("Youssef El Amrani");
            c1.setFromLocation("Casa Voyageurs Station");
            c1.setToLocation("Sidi Maarouf");
            c1.setVehicle("Dacia Logan");
            c1.setRegno("12345-A-67");
            c1.setNoOfSeats(3);
            c1.setDate("Today");
            c1.setTime("8:30 AM");
            carpoolRepository.save(c1);
            
            Carpool c2 = new Carpool();
            c2.setOwnerId(102);
            c2.setOwnerName("Fatima Zahra");
            c2.setFromLocation("Ain Diab");
            c2.setToLocation("Twin Center");
            c2.setVehicle("Renault Clio");
            c2.setRegno("23456-B-20");
            c2.setNoOfSeats(2);
            c2.setDate("Today");
            c2.setTime("9:00 AM");
            carpoolRepository.save(c2);
            
            Carpool c3 = new Carpool();
            c3.setOwnerId(103);
            c3.setOwnerName("Mohammed Alami");
            c3.setFromLocation("Maarif");
            c3.setToLocation("Morocco Mall");
            c3.setVehicle("Peugeot 208");
            c3.setRegno("34567-C-20");
            c3.setNoOfSeats(4);
            c3.setDate("Today");
            c3.setTime("2:00 PM");
            carpoolRepository.save(c3);
            
            Carpool c4 = new Carpool();
            c4.setOwnerId(104);
            c4.setOwnerName("Salma Bennani");
            c4.setFromLocation("Anfa Place");
            c4.setToLocation("Casa Port");
            c4.setVehicle("Volkswagen Golf");
            c4.setRegno("45678-D-20");
            c4.setNoOfSeats(1);
            c4.setDate("Tomorrow");
            c4.setTime("7:00 AM");
            carpoolRepository.save(c4);
            
            Carpool c5 = new Carpool();
            c5.setOwnerId(105);
            c5.setOwnerName("Amine Tazi");
            c5.setFromLocation("Hay Hassani");
            c5.setToLocation("Marina Casablanca");
            c5.setVehicle("Hyundai i20");
            c5.setRegno("56789-E-20");
            c5.setNoOfSeats(3);
            c5.setDate("Today");
            c5.setTime("5:30 PM");
            carpoolRepository.save(c5);
            
            Carpool c6 = new Carpool();
            c6.setOwnerId(106);
            c6.setOwnerName("Laila Chraibi");
            c6.setFromLocation("Bourgogne");
            c6.setToLocation("Mohammed V Airport");
            c6.setVehicle("Toyota Corolla");
            c6.setRegno("67890-F-20");
            c6.setNoOfSeats(2);
            c6.setDate("Today");
            c6.setTime("6:00 PM");
            carpoolRepository.save(c6);
            
            LOGGER.info("Sample carpool data loaded successfully!");
        };
    }
}
