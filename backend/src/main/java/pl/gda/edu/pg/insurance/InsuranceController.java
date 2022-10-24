package pl.gda.edu.pg.insurance;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.gda.edu.pg.insurance.entity.entity.Insurance;
import pl.gda.edu.pg.insurance.entity.entity.InsuranceCreationRequest;

import java.util.List;

@RestController
@RequestMapping("/api/insurance")
public class InsuranceController {
    private final Logger LOG = LoggerFactory.getLogger(InsuranceController.class);
    private final InsuranceService insuranceService;

    @Autowired
    public InsuranceController(InsuranceService insuranceService) {
        this.insuranceService = insuranceService;
    }

    @RequestMapping("/siema")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("ok siema");
    }

    @GetMapping("/all")
    public ResponseEntity<List<Insurance>> getAllInsurances(){
        List<Insurance> allInsurances = insuranceService.findAll();
        return new ResponseEntity<>(allInsurances, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Insurance> createInsurance(@RequestBody InsuranceCreationRequest insuranceRequest) {
        Insurance insurance = insuranceService.createNewInsurance(insuranceRequest);
        return new ResponseEntity<>(insurance, HttpStatus.CREATED);
    }

}
