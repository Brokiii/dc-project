package pl.gda.edu.pg.insurance;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.gda.edu.pg.insurance.entity.entity.Insurance;
import pl.gda.edu.pg.user.entity.User;

import java.util.List;

@Repository
public interface InsuranceRepository extends CrudRepository<Insurance, Integer> {

    List<Insurance> getInsurancesByUser(User user);
}
