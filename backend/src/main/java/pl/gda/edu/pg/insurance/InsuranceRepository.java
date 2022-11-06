package pl.gda.edu.pg.insurance;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.gda.edu.pg.insurance.entity.entity.Insurance;

@Repository
public interface InsuranceRepository extends CrudRepository<Insurance, Integer> {
}
