package com.bamboobyte.API.utils;


//depois tenhoq comentar - Danilo

public class Validador {
    public static boolean isCpfValido(long cpf) {
        String cpfString = String.valueOf(cpf).replaceAll("L", "");

        if (cpfString.length() != 11) {
            return false;
        }
        
        int soma = 0;
        for (int i = 0; i < 9; i++) {
            soma += Character.getNumericValue(cpfString.charAt(i)) * (10 - i);
        }
        int digito1 = 11-(soma % 11);
        if (digito1 == 10 || digito1 == 11) {
            digito1 = 0;
        }

        soma = 0;
        for (int i = 0; i < 10; i++) {
            soma += Character.getNumericValue(cpfString.charAt(i)) * (11-i);
        }
        
        int digito2 = 11-(soma % 11);
        if (digito2 == 10 || digito2 == 11) {
            digito2 = 0;
        }

        return digito1 == Character.getNumericValue(cpfString.charAt(9)) && 
        digito2 == Character.getNumericValue(cpfString.charAt(10));
    }
}