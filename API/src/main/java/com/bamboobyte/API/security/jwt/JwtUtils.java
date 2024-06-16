package com.bamboobyte.API.security.jwt;

import com.bamboobyte.API.services.UserDetailImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.MalformedInputException;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {
    @Value("${API.jwtSecret}")
    private String jwtSecret;
    @Value("${API.jwtExpiration}")
    private int jwtExpirationMs;

    public String generateTokenFromUserDetailImpl(UserDetailImpl userDetail) {
        return Jwts.builder().setSubject(userDetail.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(new Date(new Date().getTime()+jwtExpirationMs))
            .signWith(getSigningKey(), SignatureAlgorithm.HS512).compact();
    }

    public Key getSigningKey() {
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
        return key;
    }

    public String getUsernameToken(String token) {
        return Jwts.parser().setSigningKey(getSigningKey()).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validadeJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(getSigningKey()).build().parseClaimsJws(authToken);
            return true;
        } catch (MalformedJwtException e) {
            System.out.println("Token inválido "+e.getMessage());
        } catch (ExpiredJwtException e) {
            System.out.println("Token Expirado"+e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.out.println("Token não Suportado "+e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("Token Argumento Inválido "+ e.getMessage());
        }
        return false;
    }





}
