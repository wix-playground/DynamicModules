package com.dynamicmodules2;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.support.annotation.NonNull;
import android.text.TextUtils;

class SwitchModuleHelper {
    private static final String PREF_CURRENT_MODULES = "7e8db8f0";

    @NonNull
    static String[] currentModules(@NonNull Context context) {
        SharedPreferences prefs = PreferenceManager.getDefaultSharedPreferences(context);
        String value = prefs.getString(PREF_CURRENT_MODULES, "");
        //noinspection ConstantConditions
        return TextUtils.isEmpty(value) ? new String[]{} : value.split(",");
    }

    @SuppressLint("ApplySharedPref")
    static void saveCurrentModules(@NonNull Context context, @NonNull String... modules) {
        String modulesString = TextUtils.join(",", modules);
        SharedPreferences prefs = PreferenceManager.getDefaultSharedPreferences(context);
        prefs.edit().putString(PREF_CURRENT_MODULES, modulesString).commit();
    }
}
