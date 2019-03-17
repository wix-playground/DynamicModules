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
import java.io.InputStreamReader;

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
        RamBaseConfig config = new RamBaseConfig(context);

        processBase();
        createBundleConfig();
        processBaseJsModules();
        processModules(config);
    }

    private void processBase() throws IOException {
        copyFromAssets(BUNDLE_BASE_PATH, dstDir + "/" + BUNDLE_BASE);
    }

    private void createBundleConfig() throws IOException {
        copyFromAssets(RamBaseConfig.BUNDLE_CONFIG, dstDir + "/" + BUNDLE_CONFIG);
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

    @SuppressWarnings({"ResultOfMethodCallIgnored", "TryFinallyCanBeTryWithResources"})
    private void processModules(@NonNull RamBaseConfig config) throws IOException, JSONException {
        String[] moduleEntryPoints = new String[modules.length];

        // process modules -> for every module:
        //   load config
        //   copy js-modules/*.js replacing "$__DM_BASE_INDEX" with its current value

        String jsModulesDstDir = dstDir + "/" + BUNDLE_JS_MODULES_DIR;

        int dmBaseIndex = config.getLastBaseIndex() + 1;
        String dmBaseIndexString = String.valueOf(dmBaseIndex);

        for (int i = 0; i < modules.length; i++) {
            ISource module = modules[i];
            RamModuleConfig moduleConfig = new RamModuleConfig(context, module);
            moduleEntryPoints[i] = String.valueOf(dmBaseIndex + moduleConfig.getEntryPoint());

            for (String filename : module.names()) {
                StringBuilder sb = new StringBuilder();

                BufferedReader br = new BufferedReader(new InputStreamReader(module.open(filename)));
                try {
                    String line;
                    while ((line = br.readLine()) != null) {
                        sb.append(line);
                        line.replace("$__DM_BASE_INDEX", dmBaseIndexString);
                    }
                } finally {
                    br.close();
                }

                int start = filename.lastIndexOf("/") + 1;
                int end = filename.lastIndexOf(".");
                String name = filename.substring(start, end);
                name = String.valueOf(Integer.parseInt(name) + dmBaseIndex) + ".js";

                FileWriter fw = new FileWriter(jsModulesDstDir + "/" + name);
                fw.write(sb.toString());
                fw.close();
            }
        }

        // special process for reg after all modules are copied
        processRegFile(config, moduleEntryPoints);

        // update BUNDLE_CONFIG ???
    }

    @SuppressWarnings({"TryFinallyCanBeTryWithResources", "ResultOfMethodCallIgnored"})
    private void processRegFile(@NonNull RamBaseConfig config, @NonNull String[] moduleEntryPoints) throws IOException {
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
        InputStream in = null;
        FileOutputStream out = null;
        try {
            in = context.getAssets().open(src);
            out  = new FileOutputStream(dst);
            byte[] buf = new byte[1024];
            int len;
            while ((len = in.read(buf)) > 0) {
                out.write(buf, 0, len);
            }
        } finally {
            if (in != null) {
                in.close();
            }
            if (out != null) {
                out.close();
            }
        }
    }
}
