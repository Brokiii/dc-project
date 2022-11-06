package pl.gda.edu.pg.insurance;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.gda.edu.pg.insurance.entity.entity.Insurance;
import pl.gda.edu.pg.insurance.entity.entity.InsuranceCreationRequest;
import pl.gda.edu.pg.insurance.entity.entity.InsuranceUpdateAgentRequest;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/insurance")
public class InsuranceController {
    private final Logger LOG = LoggerFactory.getLogger(InsuranceController.class);
    private final InsuranceService insuranceService;

    @Autowired
    public InsuranceController(InsuranceService insuranceService) {
        this.insuranceService = insuranceService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Insurance>> getAllInsurances(){
        List<Insurance> allInsurances = insuranceService.findAll();
        return new ResponseEntity<>(allInsurances, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Insurance> getInsurance(@PathVariable("id") int id){
        if(insuranceService.findById(id).isPresent()){
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
    public ResponseEntity<HttpStatus> deleteInsurance(@PathVariable("id") int id){
        insuranceService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Insurance> updateAgentInInsurance(@PathVariable("id") int id, @RequestBody InsuranceUpdateAgentRequest insuranceRequest){
        if(insuranceService.findById(id).isPresent()){
            Insurance result = insuranceService.updateAgentValue(insuranceService.findById(id).get(), insuranceRequest);
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
