package com.dynamicmodules2.bundlebuilder.ram;

import android.support.annotation.NonNull;

import com.dynamicmodules2.bundlebuilder.ISource;

import org.json.JSONException;

import java.io.FileOutputStream;
import java.io.IOException;

public class RamBundleBuilder {

    @NonNull
    private ISource base;

    @NonNull
    private ISource[] modules;

    @NonNull
    private String dst;

    private RamBase ramBase;

    private RamModule[] ramModules;


    private byte[] header;
    private StringBuilder body;

    public RamBundleBuilder(@NonNull ISource base,
                            @NonNull ISource[] modules,
                            @NonNull String dst) {
        this.base = base;
        this.modules = modules;
        this.dst = dst;
    }

    public void build() throws IOException, JSONException {
        this.ramBase = new RamBase(base);
        this.ramModules = new RamModule[modules.length];
        for (int i = 0; i < modules.length; i++) {
            this.ramModules[i] = new RamModule(modules[i]);
        }


        createHeader();
        createBody();
        writeBundle();
    }

    private void createHeader() throws IOException {
        int size = ramBase.getHeaderSize();

        for (RamModule module : ramModules) {
            int moduleHeaderSize = module.getHeaderSize();
            size += moduleHeaderSize;
        }

        header = new byte[size];

        // copy ramBase header
        byte[] baseHeader = ramBase.getHeader();
        System.arraycopy(baseHeader, 0, header, 0, baseHeader.length);

        // change numModules
        int numModules = (size - 3 * 4) / (2 * 4);
        RamHeaderUtils.setIntByOffset(header, RamHeaderUtils.offset(1), numModules);

        // copy module headers
        int offset = baseHeader.length;
        for (RamModule module : ramModules) {
            byte[] moduleHeader = module.getHeader();
            System.arraycopy(moduleHeader, 0, header, offset, offset + moduleHeader.length);
            offset += moduleHeader.length;
        }
    }

    private void createRegIdxArray(@NonNull StringBuilder sb) throws IOException {
        // $__dmRegIdxArray = [idx1, ..., idxN];

        sb.append("$__dmRegIdxArray=[");

        int offset = (ramBase.getHeaderSize() - 3 * 4) / (2 * 4);

        boolean notFirst = false;
        for (RamModule module : ramModules) {
            int entryPoint = module.getConfig().getEntryPoint() + offset;
            offset += module.getHeaderSize() / (2 * 4);
            if (notFirst) {
                sb.append(",");
            } else {
                notFirst = true;
            }
            sb.append(entryPoint);
        }

        sb.append("];");
    }

    private void deltaOffsets(int fromPos, int toPos, int delta) {
        for (int pos = fromPos; pos < toPos; pos += 2) {
            int offset = RamHeaderUtils.offset(pos);
            int value = RamHeaderUtils.getIntByOffset(header, offset);
            if (value > 0) {
                value += delta;
                RamHeaderUtils.setIntByOffset(header, offset, value);
            }
        }
    }

    private String intToString(int value, int length) {
        StringBuilder sb = new StringBuilder();
        sb.append(value);
        while (sb.length() < length) {
            sb.append(" ");
        }
        return sb.toString();
    }

    private void createBody() throws IOException {
        StringBuilder sb = new StringBuilder();
        createRegIdxArray(sb);

        int delta = sb.length();

        sb.append(ramBase.getBody());

        // set startupCodeLength
        RamHeaderUtils.setIntByOffset(header, RamHeaderUtils.offset(2), sb.length());

        // ramBase body
        int numModules = (ramBase.getHeaderSize() - 3 * 4) / (2 * 4);
        deltaOffsets(3, 3 + numModules * 2, delta);

        delta = sb.length();
        int dmStartIndex = numModules;
        String dmStartIndexName = "\\$__dmStartIndex";
        int dmStartIndexNameLength = dmStartIndexName.length();
        for (RamModule module : ramModules) {
            // replace $__dmStartIndex with literal number in module.body
            String dmStartIndexValue = intToString(dmStartIndex, dmStartIndexNameLength);
            String moduleBody = module.getBody().replaceAll(dmStartIndexName, dmStartIndexValue);

            // add fixed module.body to body
            body.append(moduleBody);

            // call deltaOffsets()
            numModules = module.getHeaderSize() / (2 * 4);
            deltaOffsets(dmStartIndex - 3, dmStartIndex - 3 + numModules * 2, delta);

            // update delta & dmStartIndex
            delta += moduleBody.length();
            dmStartIndex += numModules;
        }
    }

    @SuppressWarnings("TryFinallyCanBeTryWithResources")
    private void writeBundle() throws IOException {
        FileOutputStream fos = new FileOutputStream(dst);
        try {
            fos.write(header);
            fos.write(body.toString().getBytes());
        } finally {
            fos.close();
        }
    }
}
