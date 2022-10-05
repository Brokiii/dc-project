package pl.gda.edu.pg.user;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.gda.edu.pg.user.entity.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

}
