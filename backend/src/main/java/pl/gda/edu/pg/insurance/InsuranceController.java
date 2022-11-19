package pl.gda.edu.pg.insurance;

import com.google.api.services.drive.model.File;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.core.config.plugins.validation.constraints.Required;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.gda.edu.pg.configuration.drive.DriveService;
import pl.gda.edu.pg.insurance.entity.entity.Insurance;
import pl.gda.edu.pg.insurance.entity.entity.InsuranceCreationRequest;
import pl.gda.edu.pg.insurance.entity.entity.InsuranceDownload;
import pl.gda.edu.pg.insurance.entity.entity.InsuranceUpdateAgentRequest;
import pl.gda.edu.pg.loss.LossService;
import pl.gda.edu.pg.loss.entity.Loss;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/insurance")
@RequiredArgsConstructor
@Slf4j
public class InsuranceController {

    private final InsuranceService insuranceService;

    private final DriveService driveService;

    @GetMapping("/all")
    public ResponseEntity<List<Insurance>> getAllInsurances(@RequestParam String email) {
        List<Insurance> allInsurances = insuranceService.findAllForUser(email);
        return new ResponseEntity<>(allInsurances, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Insurance> getInsurance(@PathVariable("id") int id) {
        if (insuranceService.findById(id).isPresent()) {
            return new ResponseEntity<>(insuranceService.findById(id).get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping()
    public ResponseEntity<Insurance> createInsurance(@RequestBody InsuranceCreationRequest insuranceRequest) {
        Insurance insurance = insuranceService.createNewInsurance(insuranceRequest);
        return new ResponseEntity<>(insurance, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteInsurance(@PathVariable("id") int id) {
        insuranceService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Insurance> updateAgentInInsurance(@PathVariable("id") int id, @RequestBody InsuranceUpdateAgentRequest insuranceRequest) {
        if (insuranceService.findById(id).isPresent()) {
            Insurance result = insuranceService.updateAgentValue(insuranceService.findById(id).get(), insuranceRequest);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @GetMapping("/{id}/download")
    public ResponseEntity<InsuranceDownload> getInsuranceDto(@PathVariable("id") int id) {
        InsuranceDownload insuranceDownload = insuranceService.createDownloadDto(id);
        return new ResponseEntity<>(insuranceDownload, HttpStatus.OK);
    }

    @PostMapping(value = "/addAttachment", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity addAttachment(@RequestBody MultipartFile file,
                                        @RequestParam int insuranceId,
                                        UsernamePasswordAuthenticationToken principal) {
        Optional<Insurance> insurance = insuranceService.findById(insuranceId);
        if (insurance.isPresent()) {
            return new ResponseEntity(driveService.addAttachmentToInsurance(file, insurance.get(), principal.getName()), HttpStatus.ACCEPTED);
        } else {
            return new ResponseEntity<>("Not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/getAttachments")
    public ResponseEntity<List<File>> getAttachments(@RequestParam int insuranceId,
                                                     UsernamePasswordAuthenticationToken principal) throws Exception {
        Optional<Insurance> insurance = insuranceService.findById(insuranceId);
        if (insurance.isPresent()) {
            return new ResponseEntity(driveService.getInsuranceAttachmentIds(insurance.get(), principal.getName()), HttpStatus.OK);
        } else {
            return ResponseEntity.notFound()
                    .build();
        }
    }
}
