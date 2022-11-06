package pl.gda.edu.pg.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.gda.edu.pg.configuration.authentication.JwtUtil;
import pl.gda.edu.pg.user.entity.MyUserDetails;
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
    private final AuthenticationManager authenticationManager;
    private final MyUserDetailsService myUserDetailsService;
    private final JwtUtil jwtUtil;

    @Autowired
    public UserService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            MyUserDetailsService myUserDetailsService,
            JwtUtil jwtUtil) {
        this.bCryptPasswordEncoder = new BCryptPasswordEncoder();
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.myUserDetailsService = myUserDetailsService;
        this.jwtUtil = jwtUtil;
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

    public String authenticateUser(UserLoginRequest userLoginRequest) {
        User user = getUser(userLoginRequest.getEmail());
        if(!bCryptPasswordEncoder.matches(userLoginRequest.getPassword(), user.getHashedPassword()))
            throw new LoginWrongPasswordException("Password is wrong");

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            userLoginRequest.getEmail(),
                            userLoginRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new LoginWrongPasswordException("Login credentials are wrong");
        }

        UserDetails userDetails = myUserDetailsService.loadUserByUsername(
                userLoginRequest.getEmail()
        );

        return jwtUtil.generateToken(userDetails);
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
