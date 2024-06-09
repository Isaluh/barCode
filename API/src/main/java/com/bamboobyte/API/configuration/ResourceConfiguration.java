package com.bamboobyte.API.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ResourceConfiguration implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String path = "file:///C:/Users/Kaique/Documents/Projetos/barCode/API/uploads/imagens/";
        registry.addResourceHandler("/content/**").addResourceLocations(path);
    }
}