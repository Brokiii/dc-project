package pl.gda.edu.pg.user;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.gda.edu.pg.user.entity.User;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> getUserByEmail(String email);
    Optional<User> getUserByLogin(String login);
}
