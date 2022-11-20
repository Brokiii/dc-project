package pl.gda.edu.pg.configuration.drive;

import com.google.api.client.http.InputStreamContent;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.gda.edu.pg.insurance.entity.entity.Insurance;
import pl.gda.edu.pg.loss.entity.Loss;
import pl.gda.edu.pg.user.entity.User;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Collections;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor

public class DriveService {

    final private static String ATTACHMENT_LOSS_PATH = "attachmentsLoss/";
    final private static String ATTACHMENT_INSURANCE_PATH = "attachmentsInsurance/";
    final private static String POLICIES_PATH = "policies/";
    private final Drive drive;

    public List<File> listEverything() throws IOException {
        // Print the names and IDs for up to 10 files.
        FileList result = drive.files().list()
            .setPageSize(10)
            .setFields("nextPageToken, files(id, name)")
            .execute();
        return result.getFiles();
    }

    private String searchFolderId(String folderName, Drive service) throws Exception {
        return searchFolderId(null, folderName, service);
    }

    private String searchFolderId(String parentId, String folderName, Drive service) throws Exception {
        String folderId = null;
        String pageToken = null;
        FileList result = null;

        File fileMetadata = new File();
        fileMetadata.setMimeType("application/vnd.google-apps.folder");
        fileMetadata.setName(folderName);

        do {
            String query = " mimeType = 'application/vnd.google-apps.folder' ";
            if (parentId == null) {
                query = query + " and 'root' in parents";
            } else {
                query = query + " and '" + parentId + "' in parents";
            }
            result = service.files().list().setQ(query)
                .setSpaces("drive")
                .setFields("nextPageToken, files(id, name)")
                .setPageToken(pageToken)
                .execute();

            for (File file : result.getFiles()) {
                if (file.getName().equalsIgnoreCase(folderName)) {
                    folderId = file.getId();
                }
            }
            pageToken = result.getNextPageToken();
        } while (pageToken != null && folderId == null);

        return folderId;
    }

    private String findOrCreateFolder(String parentId, String folderName, Drive driveInstance) throws Exception {
        String folderId = searchFolderId(parentId, folderName, driveInstance);
        // Folder already exists, so return id
        if (folderId != null) {
            return folderId;
        }
        //Folder dont exists, create it and return folderId
        File fileMetadata = new File();
        fileMetadata.setMimeType("application/vnd.google-apps.folder");
        fileMetadata.setName(folderName);

        if (parentId != null) {
            fileMetadata.setParents(Collections.singletonList(parentId));
        }
        return driveInstance.files().create(fileMetadata)
            .setFields("id")
            .execute()
            .getId();
    }

    public String getFolderId(String path) throws Exception {
        String parentId = null;
        String[] folderNames = path.split("/");
        for (String name : folderNames) {
            parentId = findOrCreateFolder(parentId, name, drive);
        }
        return parentId;
    }

    public String addFile(java.io.File file,String filename, String path, User user) throws IOException {
        MultipartFile multipartFile = new MockMultipartFile(filename, new FileInputStream(file));
        return addFile(multipartFile, user.getLogin() + "/" + path);
    }

    public String addPolicy(java.io.File file, Insurance insurance, User user) throws IOException {
        MultipartFile multipartFile = new MockMultipartFile("polisa_" + insurance.getInsuranceId(), new FileInputStream(file));
        return addFile(multipartFile, user.getLogin() + "/policies");
    }

    public List<File> getUserPolicies(User user) throws Exception {
        String id = getFolderId(user.getLogin() + "/policies");
        return listFolderContent(id);
    }

    public String addAttachmentToLossReport(MultipartFile file, Loss loss, String user) {
        return addFile(file, user + "/" + ATTACHMENT_LOSS_PATH + loss.getId());
    }

    public String addAttachmentToInsurance(MultipartFile file, Insurance insurance, String user) {
        return addFile(file, user + "/" + ATTACHMENT_INSURANCE_PATH  + insurance.getInsuranceId());
    }

    public List<File> getLossReportAttachmentIds(Loss loss, String user) throws Exception {
        String folderId = getFolderId(user + "/"+ ATTACHMENT_LOSS_PATH + loss.getId());
        return listFolderContent(folderId);
    }

    public List<File> getInsuranceAttachmentIds(Insurance insurance, String user) throws Exception {
        String folderId = getFolderId(user + "/" + ATTACHMENT_INSURANCE_PATH + insurance.getInsuranceId());
        return listFolderContent(folderId);
    }

    public String addFile(MultipartFile file, String filePath) {
        try {
            String folderId = getFolderId(filePath);
            if (null != file) {
                File fileMetadata = new File();
                fileMetadata.setParents(Collections.singletonList(folderId));
                fileMetadata.setName(file.getOriginalFilename());
                File uploadFile = drive
                    .files()
                    .create(fileMetadata, new InputStreamContent(
                        file.getContentType(),
                        new ByteArrayInputStream(file.getBytes()))
                    )
                    .setFields("id").execute();
                return uploadFile.getId();
            }
        } catch (Exception e) {
            log.error("Error: ", e);
        }
        return null;
    }

    public void downloadFile(String id, OutputStream outputStream) throws IOException {
        if (id != null) {
            String fileId = id;
            drive.files().get(fileId).executeMediaAndDownloadTo(outputStream);
        }
    }

    public List<File> listFolderContent(String parentId) throws IOException {
        if(parentId == null){
            parentId = "root";
        }
        String query = "'" + parentId + "' in parents";
        FileList result = drive.files().list()
            .setQ(query)
            .setPageSize(10)
            .setFields("nextPageToken, files(id, name)")
            .execute();
        return result.getFiles();
    }
}
