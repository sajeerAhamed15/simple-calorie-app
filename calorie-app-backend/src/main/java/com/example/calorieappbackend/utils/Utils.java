package com.example.calorieappbackend.utils;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class Utils {

    public static String getCurrentDate() {
        SimpleDateFormat formatter= new SimpleDateFormat("MM-dd-yyyy");
        Date date = new Date(System.currentTimeMillis());
        return formatter.format(date);
    }

    public static String getPreviousDate(int days) {
        SimpleDateFormat formatter= new SimpleDateFormat("MM-dd-yyyy");
        Date today = new Date(System.currentTimeMillis());
        Date date = addDays(today, days);
        return formatter.format(date);
    }

    public static String getCurrentTime() {
        SimpleDateFormat formatter= new SimpleDateFormat("HH:mm");
        Date date = new Date(System.currentTimeMillis());
        return formatter.format(date);
    }

    public static Date addDays(Date date, int days)
    {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DATE, days);
        return cal.getTime();
    }
}
