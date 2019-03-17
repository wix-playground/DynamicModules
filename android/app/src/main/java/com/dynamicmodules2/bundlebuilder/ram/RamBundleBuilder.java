package com.dynamicmodules2.bundlebuilder.ram;

import android.content.Context;
import android.support.annotation.NonNull;
import android.text.TextUtils;

import com.dynamicmodules2.bundlebuilder.ISource;

import org.json.JSONException;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;

public class RamBundleBuilder {
    private static final String ASSETS_BUNDLE_DIR = "rambundle/";
    private static final String BUNDLE_BASE = "base_ram.js";
    private static final String BUNDLE_BASE_PATH = ASSETS_BUNDLE_DIR + BUNDLE_BASE;
    private static final String BUNDLE_JS_MODULES_DIR = "js-modules";
    private static final String BUNDLE_JS_MODULES_DIR_PATH = ASSETS_BUNDLE_DIR + BUNDLE_JS_MODULES_DIR;
    private static final String BUNDLE_CONFIG = "bundle.config";

    @NonNull
    private Context context;

    @NonNull
    private ISource[] modules;

    @NonNull
    private String dstDir;


    public RamBundleBuilder(@NonNull Context context, @NonNull ISource[] modules, @NonNull String dstDir) {
        this.context = context;
        this.modules = modules;
        this.dstDir = dstDir;
    }

    public void build() throws IOException, JSONException {
        RamConfig config = new RamConfig(context);

        processBase();
        createBundleConfig();
        processBaseJsModules();
        processModules(config);
    }

    private void processBase() throws IOException {
        copyFromAssets(BUNDLE_BASE_PATH, dstDir + "/" + BUNDLE_BASE);
    }

    private void createBundleConfig() throws IOException {
        copyFromAssets(RamConfig.BUNDLE_CONFIG, dstDir + "/" + BUNDLE_CONFIG);
    }

    @SuppressWarnings("ResultOfMethodCallIgnored")
    private void processBaseJsModules() throws IOException {
        // create dstDir/js-modules directory
        String jsModulesDstDir = dstDir + "/" + BUNDLE_JS_MODULES_DIR;
        new File(jsModulesDstDir).mkdir();

        // copy all the js-modules
        String[] files = context.getAssets().list(BUNDLE_JS_MODULES_DIR_PATH);
        if (files != null) {
            for (String file : files) {
                copyFromAssets(BUNDLE_JS_MODULES_DIR_PATH + "/" + file, jsModulesDstDir + "/" + file);
            }
        }
    }

    private void processModules(@NonNull RamConfig config) throws IOException {
        String[] moduleEntryPoints = new String[modules.length];

        // process modules

        // special process for reg after all modules are copied
        processRegFile(config, moduleEntryPoints);
    }

    @SuppressWarnings({"TryFinallyCanBeTryWithResources", "ResultOfMethodCallIgnored"})
    private void processRegFile(@NonNull RamConfig config, @NonNull String[] moduleEntryPoints) throws IOException {
        String jsModulesDstDir = dstDir + "/" + BUNDLE_JS_MODULES_DIR;
        String path = jsModulesDstDir + "/" + config.getRegIndex() + ".js";
        String entryPointsString = TextUtils.join(",", moduleEntryPoints);

        StringBuilder sb = new StringBuilder();

        BufferedReader br = new BufferedReader(new FileReader(path));
        try {
            String line;
            while ((line = br.readLine()) != null) {
                sb.append(line);
                line.replace("$__DM_MODULES_REG_INDEX_ARRAY", entryPointsString);
                sb.append("\n");
            }
        } finally {
            br.close();
        }

        FileWriter fw = new FileWriter(path);
        fw.write(sb.toString());
        fw.close();
    }

    @SuppressWarnings("TryFinallyCanBeTryWithResources")
    private void copyFromAssets(@NonNull String src, @NonNull String dst) throws IOException {
        InputStream in = context.getAssets().open(src);
        FileOutputStream out = new FileOutputStream(dst);
        try {
            byte[] buf = new byte[1024];
            int len;
            while ((len = in.read(buf)) > 0) {
                out.write(buf, 0, len);
            }
        } finally {
            in.close();
            out.close();
        }
    }
}
