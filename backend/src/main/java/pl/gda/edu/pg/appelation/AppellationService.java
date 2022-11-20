package pl.gda.edu.pg.appelation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.gda.edu.pg.loss.LossService;
import pl.gda.edu.pg.loss.entity.Loss;
import pl.gda.edu.pg.loss.excpeption.LossNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AppellationService {

    private final AppellationRepository appellationRepository;

    private final LossService lossService;

    public Appellation create(CreateAppelationRequest createAppelationRequest) {
        Loss loss = lossService.read(createAppelationRequest.getLossId());
        if (loss == null) throw new LossNotFoundException("Loss not found");

        Appellation appellation = Appellation.builder()
                .loss(loss)
                .clientComment(createAppelationRequest.getReason())
                .build();

        return appellationRepository.save(appellation);
    }

    public Appellation read(int id) {
        Optional<Appellation> found = appellationRepository.findById(id);
        if (found.isPresent()) {
            return found.get();
        } else {
            throw new LossNotFoundException("Appelation not found");
        }
    }

    public Appellation update(Appellation appellation) {
        if (appellationRepository.existsById(appellation.getAppellationId())) {
            return appellationRepository.save(appellation);
        } else {
            throw new LossNotFoundException("Appelation not found");
        }
    }

    public void delete(int id) {
        if (appellationRepository.existsById(id)) {
            appellationRepository.deleteById(id);
        } else {
            throw new LossNotFoundException("Appelation not found");
        }
    }

    public List<Appellation> getAll() {
        return (List<Appellation>) appellationRepository.findAll();
    }
}
