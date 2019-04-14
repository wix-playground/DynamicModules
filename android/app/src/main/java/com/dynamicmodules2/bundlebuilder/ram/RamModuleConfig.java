package com.dynamicmodules2.bundlebuilder.ram;

import android.support.annotation.NonNull;

import com.dynamicmodules2.bundlebuilder.ISource;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

class RamModuleConfig {
    private static final String CONFIG_FILE = "config";
    private int entryPoint;

    RamModuleConfig(@NonNull ISource source) throws IOException, JSONException {
        load(source);
    }

    private void load(@NonNull ISource source) throws IOException, JSONException {
        StringBuilder sb = new StringBuilder();
        InputStream inputStream = source.open(CONFIG_FILE);
        BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
        String str;
        while ((str = br.readLine()) != null) {
            sb.append(str);
        }
        inputStream.close();

        JSONObject obj = new JSONObject(sb.toString());
        entryPoint = obj.getInt("entryPoint");
    }

    int getEntryPoint() {
        return entryPoint;
    }
}
