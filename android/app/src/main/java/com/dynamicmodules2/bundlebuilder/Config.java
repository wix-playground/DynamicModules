package com.dynamicmodules2.bundlebuilder;

import android.content.Context;
import android.support.annotation.NonNull;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class Config {
    private static final String BUNDLE_CONFIG = "bundles_old/buildconfig.json";
    private int lastBaseIndex;

    public Config(@NonNull Context context) throws IOException, JSONException {
        load(context);
    }

    private void load(@NonNull Context context) throws IOException, JSONException {
        StringBuilder sb = new StringBuilder();
        InputStream is = context.getAssets().open(BUNDLE_CONFIG);
        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        String str;
        while ((str = br.readLine()) != null) {
            sb.append(str);
        }
        br.close();

        JSONObject obj = new JSONObject(sb.toString());
        lastBaseIndex = obj.getInt("last_base_index");
    }

    public int getLastBaseIndex() {
        return lastBaseIndex;
    }
}
