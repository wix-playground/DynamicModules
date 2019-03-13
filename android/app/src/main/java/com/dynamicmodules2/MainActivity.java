package com.dynamicmodules2;

import android.os.Bundle;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity implements OnBundleChangeListener {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "DynamicModules2";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        MainApplication app = (MainApplication) getApplication();
        app.registerOnBundleChangeListener(this);
    }

    @Override
    protected void onDestroy() {
        MainApplication app = (MainApplication) getApplication();
        app.unregisterOnBundleChangeListener(this);
        super.onDestroy();
    }

    @Override
    public void onBundleChangeListener() {
        finish();
        startActivity(getIntent());
    }
}
