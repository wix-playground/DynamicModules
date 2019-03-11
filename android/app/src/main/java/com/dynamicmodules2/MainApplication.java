package com.dynamicmodules2;

import android.app.Application;
import android.text.TextUtils;
import android.util.Log;

import com.dynamicmodules2.bundlebuilder.BundleBuilder;
import com.dynamicmodules2.bundlebuilder.ISource;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import org.json.JSONException;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new SwitchPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }

        @Nullable
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
        try {
            buildBundle();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        SoLoader.init(this, /* native exopackage */ false);
    }

    private String bundleName() {
        return getFilesDir() + "/main.js";
    }

    private void buildBundle() throws IOException, JSONException {
        final String module = SwitchModuleHelper.currentModule(this);
        ISource[] modules = TextUtils.isEmpty(module) ?
                new ISource[]{}

                :

                new ISource[]{new ISource() {
                    @Override
                    public InputStream open() throws IOException {
                        return getAssets().open("bundles/modules/" + module);
                    }
                }};

        BundleBuilder builder = new BundleBuilder(this, modules, bundleName());
        builder.build();
    }
}
