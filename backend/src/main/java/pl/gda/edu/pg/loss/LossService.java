package pl.gda.edu.pg.loss;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import pl.gda.edu.pg.insurance.InsuranceService;
import pl.gda.edu.pg.insurance.entity.entity.Insurance;
import pl.gda.edu.pg.insurance.entity.exception.InsuranceNotFoundException;
import pl.gda.edu.pg.loss.entity.CreateLossRequest;
import pl.gda.edu.pg.loss.entity.Loss;
import pl.gda.edu.pg.loss.entity.UpdateLossStatusRequest;
import pl.gda.edu.pg.loss.excpeption.LossNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class LossService {

    private final LossRepository lossRepository;
    private final InsuranceService insuranceService;

    public Loss create(CreateLossRequest createLossRequest) throws Exception {
        Insurance insurance = insuranceService.findById((int) createLossRequest.getInsuranceId()).orElseThrow();
        Loss loss = Loss.CreateRequestToLossMapper(createLossRequest, insurance);
        Loss lossSaved = lossRepository.save(loss);
        insuranceService.sendInsuranceWithLossesToGoogleDrive(insurance.getInsuranceId());
        return lossSaved;
    }

    public Loss read(int lossId) {
        Optional<Loss> found = lossRepository.findById(lossId);
        if (found.isPresent()) {
            return found.get();
        } else {
            throw new LossNotFoundException("Loss not found");
        }
    }

    public Loss updateStatus(UpdateLossStatusRequest request) throws Exception {
        Loss loss = read(request.getLossId());
        loss.setReportStage(request.getStatus());
        insuranceService.sendInsuranceWithLossesToGoogleDrive(loss.getInsurance().getInsuranceId());
        return lossRepository.save(loss);
    }

    public Loss update(Loss loss) {
        if (lossRepository.existsById(loss.getId())) {
            return lossRepository.save(loss);
        } else {
            throw new LossNotFoundException("Loss not found");
        }
    }

    public void delete(int lossId) {
        if (lossRepository.existsById(lossId)) {
            lossRepository.deleteById(lossId);
        } else {
            throw new LossNotFoundException("Loss not found");
        }
    }

    public List<Loss> getAll()
    {
        return (List<Loss>) lossRepository.findAll();
    }
}
