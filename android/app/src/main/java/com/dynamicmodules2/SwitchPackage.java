package com.dynamicmodules2;

import android.support.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class SwitchPackage implements ReactPackage {
    @NonNull
    private OnBundleChangeListener onBundleChangeListener;

    SwitchPackage(@NonNull OnBundleChangeListener onBundleChangeListener) {
        this.onBundleChangeListener = onBundleChangeListener;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new SwitchModule(reactContext, onBundleChangeListener));
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
