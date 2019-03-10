package com.dynamicmodules2.bundlebuilder;

import java.io.IOException;
import java.io.InputStream;

public interface ISource {
    InputStream open() throws IOException;
}
