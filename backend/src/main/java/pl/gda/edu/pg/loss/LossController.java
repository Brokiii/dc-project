package pl.gda.edu.pg.loss;

import com.google.api.services.drive.model.File;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.gda.edu.pg.configuration.drive.DriveService;
import pl.gda.edu.pg.loss.entity.CreateLossRequest;
import pl.gda.edu.pg.loss.entity.Loss;

import java.util.List;

@RestController
@RequestMapping("/api/loss")
@Slf4j
@RequiredArgsConstructor
public class LossController {

    private final LossService lossService;

    private final DriveService driveService;

    @PostMapping
    public ResponseEntity<Loss> create(@RequestBody CreateLossRequest createLossRequest) throws Exception {
        Loss created = lossService.create(createLossRequest);
        return ResponseEntity.ok(created);
    }

    @GetMapping()
    public ResponseEntity<Loss> getLoss(@RequestParam int lossId) {
        Loss found = lossService.read(lossId);
        return ResponseEntity.ok(found);
    }

    @DeleteMapping
    public ResponseEntity delete(@RequestParam int lossId) {
        lossService.delete(lossId);
        return ResponseEntity.accepted().build();
    }


    @GetMapping("/all")
    public ResponseEntity<List<Loss>> getAllLosses() {
        return ResponseEntity.ok(lossService.getAll());
    }

    @PostMapping(value = "/addAttachment", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void addAttachment(@RequestBody MultipartFile file,
                              @RequestParam int lossId,
                              UsernamePasswordAuthenticationToken principal) {
        Loss loss = lossService.read(lossId);
        driveService.addAttachmentToLossReport(file, loss, principal.getName());
    }

    @GetMapping(value = "/getAttachments")
    public ResponseEntity<List<File>> getAttachments(@RequestParam int lossId,
                                                     UsernamePasswordAuthenticationToken principal) throws Exception {
        Loss loss = lossService.read(lossId);
        return ResponseEntity.ok(driveService.getLossReportAttachmentIds(loss, principal.getName()));
    }
}
