package com.dynamicmodules2;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.support.annotation.NonNull;

public class SwitchModuleHelper {
    private static final String PREF_CURRENT_MODULE = "7e8db8f0";

    @NonNull
    public static String currentModule(@NonNull Context context) {
        SharedPreferences prefs = PreferenceManager.getDefaultSharedPreferences(context);
        String value = prefs.getString(PREF_CURRENT_MODULE, "console_module.js");
        return value != null ? value : "";
    }

    public static void saveCurrentModule(@NonNull Context context, @NonNull String module) {
        SharedPreferences prefs = PreferenceManager.getDefaultSharedPreferences(context);
        prefs.edit().putString(PREF_CURRENT_MODULE, module).commit();
    }
}
