package co.fitcom.capacitor;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import net.lingala.zip4j.ZipFile;
import net.lingala.zip4j.exception.ZipException;
import net.lingala.zip4j.model.FileHeader;
import net.lingala.zip4j.model.ZipParameters;
import net.lingala.zip4j.model.enums.CompressionLevel;
import net.lingala.zip4j.model.enums.CompressionMethod;
import net.lingala.zip4j.progress.ProgressMonitor;

import java.io.File;
import java.util.List;


@CapacitorPlugin()
public class ZipPlugin extends Plugin {

    @PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
    public void unZip(PluginCall call) {

        String source = call.getString("source", "");
        String destination = call.getString("destination", "");
        Boolean overwrite = call.getBoolean("overwrite", true);
        String password = call.getString("password");

        if (source.contains("_capacitor_")) {
            source = source.replace("_capacitor_", "");
        }

        if (source.contains("file://")) {
            source = source.replace("file://", "");
        }

        if (destination.contains("_capacitor_")) {
            destination = destination.replace("_capacitor_", "");
        }

        if (destination.contains("file://")) {
            destination = destination.replace("file://", "");
        }

        File archive = new File(source);
        if (!archive.exists()) {
            call.reject("File does not exist, invalid archive path: " + archive.getAbsolutePath());
        }

        try {
            ZipFile zipFile = new ZipFile(archive);
            if (zipFile.isEncrypted() && !password.equals("")) {
                zipFile.setPassword(password.toCharArray());
            }

            File d = new File(destination);
            if (!d.exists()) {
                d.mkdirs();
            }
            List<FileHeader> fileHeaders = zipFile.getFileHeaders();
            for (FileHeader header : fileHeaders) {
                if (header.isDirectory()) {
                    if (d.exists()) {
                        File f = new File(destination, header.getFileName());
                        f.mkdirs();
                        zipFile.extractFile(header, f.toString());
                    }
                }
            }
            ProgressMonitor monitor = zipFile.getProgressMonitor();
            zipFile.setRunInThread(false);

            JSObject statusObject = new JSObject();
            zipFile.extractAll(destination);

            final String destPath = destination;
            new Thread(new Runnable() {
                @Override
                public void run() {
                    int progress;
                    while (!monitor.getState().equals(ProgressMonitor.State.READY)) {
                        progress = monitor.getPercentDone();
                        statusObject.put("status", "progressing");
                        statusObject.put("progress", progress);
                        statusObject.put("completed", false);
                        call.resolve(statusObject);
                        try {
                            Thread.sleep(100);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                    ProgressMonitor.Result result = monitor.getResult();
                    if(monitor.getResult().equals(ProgressMonitor.Result.SUCCESS))
                    {
                        JSObject object = new JSObject();
                        object.put("status", "completed");
                        object.put("completed", true);
                        object.put("progress", 100);
                        object.put("path", destPath);
                        call.resolve(object);
                    }
                    else if(monitor.getResult().equals(ProgressMonitor.Result.ERROR))
                    {
                        call.reject(monitor.getException().getMessage());
                    }
                    else if(monitor.getResult().equals(ProgressMonitor.Result.CANCELLED))
                    {
                        call.reject("Cancelled");
                    }
                }
            }).start();
        } catch (ZipException e) {
            call.reject(e.getMessage());
        }

    }

//    @PluginMethod(returnType = PluginMethod.RETURN_CALLBACK)
    @PluginMethod()
    public void zip(PluginCall call) {
        String source = call.getString("source", "");
        String destination = call.getString("destination", "");
        Boolean overwrite = call.getBoolean("overwrite", true);
        String password = call.getString("password");


        if (source.contains("_capacitor_")) {
            source = source.replace("_capacitor_", "");
        }

        if (source.contains("file://")) {
            source = source.replace("file://", "");
        }

        if (destination.contains("_capacitor_")) {
            destination = destination.replace("_capacitor_", "");
        }

        if (destination.contains("file://")) {
            destination = destination.replace("file://", "");
        }

        File folder = new File(source);
        File dest = new File(destination);

        if (!folder.exists()) {
            call.reject("Folder does not exist, invalid folder path: " + folder.getAbsolutePath());
        }

        if (overwrite && dest.exists()) {
            Boolean deleted = dest.delete();
        }
        try {
            ZipFile zipFile = new ZipFile(dest);
            zipFile.setRunInThread(true);
            ZipParameters parameters = new ZipParameters();

            parameters.setCompressionMethod(CompressionMethod.DEFLATE);
            parameters.setCompressionLevel(CompressionLevel.NORMAL);
            if (!password.isEmpty()) {
                zipFile.setPassword(password.toCharArray());
            }
            zipFile.addFolder(folder, parameters);
            int progress;
            JSObject statusObject = new JSObject();
            ProgressMonitor monitor = zipFile.getProgressMonitor();

//            call.setKeepAlive(true);
            while (monitor.getState() == ProgressMonitor.State.BUSY) {
                progress = monitor.getPercentDone();
                statusObject.put("status", "progressing");
                statusObject.put("progress", progress);
                statusObject.put("completed", false);
//                call.resolve(statusObject);
            }

            ProgressMonitor.Result result = monitor.getResult();
            if(monitor.getResult().equals(ProgressMonitor.Result.SUCCESS))
            {
                JSObject object = new JSObject();
                object.put("status", "completed");
                object.put("completed", true);
                call.resolve(object);
                call.release(this.getBridge());
            }
            else if(monitor.getResult().equals(ProgressMonitor.Result.ERROR))
            {
                call.reject(monitor.getException().getMessage());
            }
            else if(monitor.getResult().equals(ProgressMonitor.Result.CANCELLED))
            {
                call.reject("cancelled");
            }

        } catch (ZipException e) {
            call.reject(e.getMessage());
        }

    }
}
