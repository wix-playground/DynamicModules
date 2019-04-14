package com.dynamicmodules2.bundlebuilder;

import android.support.annotation.NonNull;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public interface ISource {
    @NonNull
    String[] names();

    InputStream open(@NonNull String name) throws IOException;

    long size(@NonNull String name) throws IOException;
}
