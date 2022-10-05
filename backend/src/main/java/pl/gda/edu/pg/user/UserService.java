package pl.gda.edu.pg.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.gda.edu.pg.user.entity.User;
import pl.gda.edu.pg.user.entity.UserRequest;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Long createNewUser(UserRequest userRequest) {
        User user = User.builder()
                .firstName(userRequest.getFirstName())
                .lastName(userRequest.getLastName())
                .email(userRequest.getEmail())
                .password(userRequest.getHashedPassword())
                .build();
        userRepository.save(user);
        return user.getUserId();
    }

    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }
}
