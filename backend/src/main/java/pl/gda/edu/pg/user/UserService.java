package pl.gda.edu.pg.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.gda.edu.pg.user.entity.User;
import pl.gda.edu.pg.user.entity.UserLoginRequest;
import pl.gda.edu.pg.user.entity.UserRegisterRequest;
import pl.gda.edu.pg.user.exception.CreateNewUserException;
import pl.gda.edu.pg.user.exception.LoginWrongPasswordException;
import pl.gda.edu.pg.user.exception.UserAlreadyExistException;
import pl.gda.edu.pg.user.exception.UserNotFoundException;

import java.util.List;

@Service
public class UserService {
    private final Logger LOG = LoggerFactory.getLogger(UserService.class);
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.bCryptPasswordEncoder = new BCryptPasswordEncoder();
        this.userRepository = userRepository;
    }

    @Transactional
    public User createNewUser(UserRegisterRequest userRegisterRequest) throws UserAlreadyExistException, CreateNewUserException {
        if(userRepository.getUserByEmail(userRegisterRequest.getEmail()).isPresent())
            throw new UserAlreadyExistException("User already exist!");
        try {
            User user = User.builder()
                    .login(userRegisterRequest.getEmail())
                    .hashedPassword(bCryptPasswordEncoder.encode(userRegisterRequest.getPassword()))
                    .email(userRegisterRequest.getEmail())
                    .name(userRegisterRequest.getName())
                    .surname(userRegisterRequest.getSurname())
                    .accountType(userRegisterRequest.getAccountType())
                    .build();
            return userRepository.save(user);
        } catch (Exception e) {
            LOG.error("Creating new user error", e);
            throw new CreateNewUserException("Creating new user with email: " + userRegisterRequest.getEmail()+ " error", e);
        }
    }

    public User loginGetUser(UserLoginRequest userLoginRequest) {
        User user = getUser(userLoginRequest.getEmail());
        if(!bCryptPasswordEncoder.matches(userLoginRequest.getPassword(), user.getHashedPassword()))
            throw new LoginWrongPasswordException("Password is wrong");
        return user;
    }

    public User getUser(String email) {
        return userRepository.getUserByEmail(email).orElseThrow(() ->
                new UserNotFoundException("User not found!"));
    }

    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    public User logoutUser(String email) {
        return userRepository.getUserByEmail(email).orElseThrow(() ->
                new UserNotFoundException("User not found!"));
    }
}
