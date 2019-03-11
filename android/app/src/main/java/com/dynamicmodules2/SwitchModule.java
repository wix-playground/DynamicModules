package com.dynamicmodules2;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SwitchModule extends ReactContextBaseJavaModule {
    public SwitchModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "SwitchModule";
    }

    @ReactMethod
    public void switchModule() {
        String module = SwitchModuleHelper.currentModule(getReactApplicationContext());
        switch (module) {
            case "":
                module = "console_module.js";
                break;
            case "console_module.js":
                module = "toast_module.js";
                break;
            case "toast_module.js":
                module = "console_module.js";
                break;
        }

        SwitchModuleHelper.saveCurrentModule(getReactApplicationContext(), module);

        restartApp();
    }

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
