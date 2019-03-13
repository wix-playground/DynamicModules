package com.dynamicmodules2;

import android.app.Application;
import android.os.Handler;
import android.os.Looper;
import android.support.annotation.NonNull;
import android.support.v4.util.ArraySet;
import android.util.Log;

import com.dynamicmodules2.bundlebuilder.BundleBuilder;
import com.dynamicmodules2.bundlebuilder.ISource;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import org.json.JSONException;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

public class MainApplication extends Application implements ReactApplication, OnBundleChangeListener {

    private Set<OnBundleChangeListener> onBundleChangeListeners;

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.asList(
                    new MainReactPackage(),
                    new SwitchPackage(MainApplication.this)
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }

        @NonNull
        @Override
        protected String getJSBundleFile() {
            return bundleName();
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d("DynamicModules", "App.onCreate()");

        onBundleChangeListeners = new ArraySet<>();

        File mainBundleFile = new File(bundleName());
        if (!mainBundleFile.exists()) {
            try {
                buildBundle();
            } catch (IOException e) {
                e.printStackTrace();
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        SoLoader.init(this, /* native exopackage */ false);
    }

    private String bundleName() {
        return getFilesDir() + "/main.js";
    }

    private void buildBundle() throws IOException, JSONException {
        final String[] modules = SwitchModuleHelper.currentModules(this);
        ISource[] sources = new ISource[modules.length];
        for (int i = 0; i < modules.length; i++) {
            final String module = modules[i];
            sources[i] = new ISource() {
                @Override
                public InputStream open() throws IOException {
                    return getAssets().open("bundles/modules/" + module);
                }
            };
        }

        BundleBuilder builder = new BundleBuilder(this, sources, bundleName());
        builder.build();
    }

    @Override
    public void onBundleChangeListener() {
        try {
            buildBundle();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        new Handler(Looper.getMainLooper()).post(new Runnable() {
            @Override
            public void run() {
                mReactNativeHost.clear();
                for (OnBundleChangeListener listener : onBundleChangeListeners) {
                    listener.onBundleChangeListener();
                }
            }
        });

    }

    void registerOnBundleChangeListener(@NonNull OnBundleChangeListener listener) {
        onBundleChangeListeners.add(listener);
    }

    void unregisterOnBundleChangeListener(@NonNull OnBundleChangeListener listener) {
        onBundleChangeListeners.remove(listener);
    }

}
