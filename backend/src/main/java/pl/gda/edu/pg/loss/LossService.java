package pl.gda.edu.pg.loss;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pl.gda.edu.pg.loss.entity.CreateLossRequest;
import pl.gda.edu.pg.loss.entity.Loss;
import pl.gda.edu.pg.loss.excpeption.LossNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class LossService {

    private final LossRepository lossRepository;

    public Loss create(CreateLossRequest createLossRequest) {
        Loss loss = Loss.CreateRequestToLossMapper(createLossRequest);
        return lossRepository.save(loss);
    }

    public Loss read(int lossId) {
        Optional<Loss> found = lossRepository.findById(lossId);
        if (found.isPresent()) {
            return found.get();
        } else {
            throw new LossNotFoundException("Loss not found");
        }
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
