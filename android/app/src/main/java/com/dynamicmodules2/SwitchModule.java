package com.dynamicmodules2;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.support.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SwitchModule extends ReactContextBaseJavaModule {
    @NonNull
    private OnBundleChangeListener onBundleChangeListener;

    public SwitchModule(ReactApplicationContext reactContext, @NonNull OnBundleChangeListener onBundleChangeListener) {
        super(reactContext);
        this.onBundleChangeListener = onBundleChangeListener;
    }

    @Override
    public String getName() {
        return "SwitchModule";
    }

    @ReactMethod
    public void switchModule() {
        String[] modules = SwitchModuleHelper.currentModules(getReactApplicationContext());

        if (modules.length == 0) {
            modules = new String[]{"toast_module"}; //{"console_module"};
        } else {
            switch (modules[0]) {
                case "console_module":
                    modules = new String[]{"toast_module"};
                    break;
                case "toast_module":
                    modules = new String[]{"advanced_message_module", "message_provider_module"};
                    break;
                case "advanced_message_module":
                    modules = new String[]{"toast_module"}; //{"console_module"};
                    break;
            }
        }

        SwitchModuleHelper.saveCurrentModules(getReactApplicationContext(), modules);

        notifyApp();
    }

    private void notifyApp() {
        onBundleChangeListener.onBundleChangeListener();
    }

    @SuppressWarnings("unused")
    private void restartApp() {
        Context context = getReactApplicationContext();
        Intent activity = new Intent(context, MainActivity.class);
        int mPendingIntentId = 123456;
        PendingIntent mPendingIntent = PendingIntent.getActivity(context, mPendingIntentId, activity,
                PendingIntent.FLAG_CANCEL_CURRENT);
        AlarmManager mgr = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        mgr.set(AlarmManager.RTC, System.currentTimeMillis() + 100, mPendingIntent);
        System.exit(0);
    }
}
