package com.purple.vride.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import com.purple.vride.models.User;
import com.purple.vride.repositories.UserRepository;

@Component
@Profile("h2")
public class UserDataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        // Check if users already exist
        if (userRepository.count() == 0) {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String hashedPassword = encoder.encode("password123");

            userRepository.save(new User(101, "Sarah", "Johnson", "sarah.j@company.com", hashedPassword, "VERIFIED"));
            userRepository.save(new User(102, "Michael", "Chen", "michael.c@company.com", hashedPassword, "VERIFIED"));
            userRepository.save(new User(103, "Emily", "Rodriguez", "emily.r@company.com", hashedPassword, "VERIFIED"));
            userRepository.save(new User(104, "David", "Kim", "david.k@company.com", hashedPassword, "VERIFIED"));
            userRepository.save(new User(105, "Jessica", "Patel", "jessica.p@company.com", hashedPassword, "VERIFIED"));
            userRepository.save(new User(106, "James", "Anderson", "james.a@company.com", hashedPassword, "VERIFIED"));

            System.out.println("✓ 6 test users loaded into H2 database");
            System.out.println("  Use Employee ID: 101-106, Password: password123");
        }
    }
}
