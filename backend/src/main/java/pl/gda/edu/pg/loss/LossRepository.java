package pl.gda.edu.pg.loss;

import org.springframework.data.repository.CrudRepository;
import pl.gda.edu.pg.loss.entity.Loss;

public interface LossRepository extends CrudRepository<Loss, Integer> {
}
