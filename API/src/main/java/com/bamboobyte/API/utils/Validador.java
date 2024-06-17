package com.bamboobyte.API.utils;

import java.text.SimpleDateFormat;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Date;

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
    public static String converteData(Long timestamp) {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yy");
        Date date = new Date(timestamp);
        return sdf.format(date);
    }
    public static boolean isDepoisDasUmaAteQuatro(Long timestamp) {
        ZoneId zoneId = ZoneId.of("America/Sao_Paulo");
        ZonedDateTime zonedDateTime = Instant.ofEpochMilli(timestamp).atZone(zoneId);
        int hour = zonedDateTime.getHour();
        return hour >= 1 && hour < 4;
    }
    public static boolean foramNoMesmoDia(long timestamp1, long timestamp2) {
        ZoneId zoneId = ZoneId.of("America/Sao_Paulo");
        ZonedDateTime zonedDateTime1 = Instant.ofEpochMilli(timestamp1).atZone(zoneId);
        ZonedDateTime zonedDateTime2 = Instant.ofEpochMilli(timestamp2).atZone(zoneId);
        return zonedDateTime1.getYear() == zonedDateTime2.getYear() &&
                zonedDateTime1.getMonth() == zonedDateTime2.getMonth() &&
                zonedDateTime1.getDayOfMonth() == zonedDateTime2.getDayOfMonth();
    }

    public static long dataPraTimestamp(String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(date, formatter);
        LocalDateTime localDateTime = localDate.atStartOfDay();
        ZoneId zoneId = ZoneId.of("America/Sao_Paulo");
        ZonedDateTime zonedDateTime = localDateTime.atZone(zoneId);
        return zonedDateTime.toInstant().toEpochMilli();
    }

    public static String adicionarUmDia(String date) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate localDate = LocalDate.parse(date, formatter);
            LocalDate nextDay = localDate.plusDays(1);
            return nextDay.format(formatter);
        } catch (DateTimeParseException e) {
            return date;
        }
    }

}
