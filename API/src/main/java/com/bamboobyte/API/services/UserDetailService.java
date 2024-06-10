//package com.bamboobyte.API.services;
//
//import com.bamboobyte.API.models.Garcom;
//import com.bamboobyte.API.services.GarcomServiceImpl;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//import java.util.Optional;
//
//
//@Service
//public class UserDetailService implements UserDetailsService {
//
//    @Autowired
//    private GarcomServiceImpl garcomService;
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        Optional<Garcom> garcomUser = garcomService.getGarcomByCpf(username);
//        if (garcomUser.isPresent()) {
//            return org.springframework.security.core.userdetails.User.builder()
//                    .username(garcomUser.get().getCpf())
//                    .password(garcomUser.get().getPassword())
//                    .roles("garcom")
//                    .build();
//        }
//        throw new UsernameNotFoundException(username);
//
//
//    }
//}