package com.dynamicmodules2.bundlebuilder;

import android.content.Context;
import android.support.annotation.NonNull;
import android.util.Log;

import org.json.JSONException;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class BundleBuilder {
    private static final String BUNDLE_BASE = "bundles_old/base.js";
    private static final String BUNDLE_REG = "bundles_old/reg.js";
    private static final String BUNDLE_END = "bundles_old/end.js";

    @NonNull
    private Context context;

    @NonNull
    private ISource[] modules;

    private String preparedRegString;
    private String preparedModulesString;
    private String preparedEndString;

    @NonNull
    private String dst;

    public BundleBuilder(@NonNull Context context, @NonNull ISource[] modules, @NonNull String dst) {
        this.context = context;
        this.modules = modules;
        this.dst = dst;
    }

    public void build() throws IOException, JSONException {
        Config config = new Config(context);

        FileOutputStream out = copyBaseToDst();
        processModules();
        processReg();
        processEnd();
        joinAll(out, config);
    }

    @SuppressWarnings("TryFinallyCanBeTryWithResources")
    private FileOutputStream copyBaseToDst() throws IOException {
        InputStream in = context.getAssets().open(BUNDLE_BASE);
        try {
            FileOutputStream out = new FileOutputStream(dst);
            byte[] buf = new byte[1024];
            int len;
            while ((len = in.read(buf)) > 0) {
                out.write(buf, 0, len);
            }
            return out;
        } finally {
            in.close();
        }
    }

    private void processReg() throws IOException {
        StringBuilder sb = new StringBuilder();
        InputStream is = context.getAssets().open(BUNDLE_REG);
        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        String str;
        while ((str = br.readLine()) != null) {
            sb.append(str);
            sb.append('\n');
        }
        br.close();

        preparedRegString = sb.toString();
    }

    private void processModules() throws IOException {
        StringBuilder sb = new StringBuilder();

        for (ISource source : modules) {
            InputStream is = source.open();
            BufferedReader br = new BufferedReader(new InputStreamReader(is));
            String str;
            while ((str = br.readLine()) != null) {
                sb.append(str);
                sb.append('\n');
            }
            br.close();
        }

        preparedModulesString = sb.toString();
    }

    private void processEnd() throws IOException {
        StringBuilder sb = new StringBuilder();
        InputStream is = context.getAssets().open(BUNDLE_END);
        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        String str;
        while ((str = br.readLine()) != null) {
            sb.append(str);
            sb.append('\n');
        }
        br.close();

        preparedEndString = sb.toString();
    }

    @SuppressWarnings("StringConcatenationInsideStringBufferAppend")
    private void joinAll(@NonNull FileOutputStream out, @NonNull Config config) throws IOException {
        OutputStreamWriter writer = new OutputStreamWriter(out);

        writer.append("var $__dmRegIdxArray = [];");
        writer.append("var $__dmIdx = " + (config.getLastBaseIndex() + 1) + ";");

        writer.append(preparedModulesString);
        writer.append(preparedRegString);
        writer.append(preparedEndString);
        writer.close();
    }

    @SuppressWarnings("unused")
    private void consoleFile(String path) throws IOException {
        InputStream is = new FileInputStream(path);
        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        String str;
        while ((str = br.readLine()) != null) {
            Log.d("BundleBuilder", str);
        }
        br.close();
    }
}
