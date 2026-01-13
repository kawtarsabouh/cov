package com.purple.vride.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Swagger/OpenAPI Configuration
 * @author Improved by GitHub Copilot
 * @date January 12, 2026
 */
@Configuration
public class SwaggerConfig {
    
    @Bean
    public OpenAPI vrideOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("VRide Carpooling API")
                        .description("REST API for VRide - A car-pooling system to share rides and reduce costs")
                        .version("2.0")
                        .contact(new Contact()
                                .name("VRide Team")
                                .email("support@vride.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")));
    }
}
