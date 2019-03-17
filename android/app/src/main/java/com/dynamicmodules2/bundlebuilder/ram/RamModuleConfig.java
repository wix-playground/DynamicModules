package com.dynamicmodules2.bundlebuilder.ram;

import android.content.Context;
import android.support.annotation.NonNull;

import com.dynamicmodules2.bundlebuilder.ISource;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class RamModuleConfig {
    static final String CONFIG_FILE = "buildconfig.json";
    private int lastModuleIndex;
    private int entryPoint;

    RamModuleConfig(@NonNull Context context, @NonNull ISource source) throws IOException, JSONException {
        load(context, source);
    }

    private void load(@NonNull Context context, @NonNull ISource source) throws IOException, JSONException {
        StringBuilder sb = new StringBuilder();
        InputStream inputStream = source.open(CONFIG_FILE);
        BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
        String str;
        while ((str = br.readLine()) != null) {
            sb.append(str);
        }
        inputStream.close();

        JSONObject obj = new JSONObject(sb.toString());
        lastModuleIndex = obj.getInt("last_module_index");
        entryPoint = obj.getInt("entry_point");
    }

    public int getEntryPoint() {
        return entryPoint;
    }

    public int getLastModuleIndex() {
        return lastModuleIndex;
    }
}
