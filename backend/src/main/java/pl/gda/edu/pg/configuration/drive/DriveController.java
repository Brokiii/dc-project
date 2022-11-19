package pl.gda.edu.pg.configuration.drive;

import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/drive")
@Slf4j
@RequiredArgsConstructor
public class DriveController {

    private final DriveService driveService;

    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void addFile(@RequestBody MultipartFile file) {
        this.driveService.addFile(file, "testPath");
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<File>> getAll() throws IOException {
        List<File> files = this.driveService.listEverything();
        return ResponseEntity.ok(files);
    }

    @GetMapping("/download")
    public void downloadFile(@RequestParam String fileId,
                             HttpServletResponse response,
                             UsernamePasswordAuthenticationToken principal) throws IOException {
        driveService.downloadFile(fileId, response.getOutputStream());
    }
}
