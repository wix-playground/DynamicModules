package com.dynamicmodules2.bundlebuilder.ram;

import android.content.Context;
import android.support.annotation.NonNull;

import com.dynamicmodules2.bundlebuilder.ISource;

public class RamBundleBuilder {
    private static final String BUNDLE_BASE = "rambundle/base_ram.js";
    private static final String BUNDLE_JS_MODULES_DIR = "rambundle/js-modules";

    @NonNull
    private Context context;

    @NonNull
    private String dst;



    public RamBundleBuilder(@NonNull Context context, @NonNull ISource[] modules, @NonNull String dst) {
        this.context = context;
        //this.modules = modules;
        this.dst = dst;
    }
}
