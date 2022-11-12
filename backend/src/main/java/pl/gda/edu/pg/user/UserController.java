package pl.gda.edu.pg.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.gda.edu.pg.configuration.authentication.AuthenticationResponse;
import pl.gda.edu.pg.user.entity.User;
import pl.gda.edu.pg.user.entity.UserLoginRequest;
import pl.gda.edu.pg.user.entity.UserRegisterRequest;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final Logger LOG = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> createNewUser(
            @RequestBody UserRegisterRequest userRegisterRequest) {
        User user = userService.createNewUser(userRegisterRequest);
        LOG.info("Successfully created user with ID: " + user.getId());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(user);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody UserLoginRequest userLoginRequest) {
        String jwt = userService.authenticateUser(userLoginRequest);
        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

    @GetMapping("/logout")
    public ResponseEntity<User> logout(
            @RequestParam String email) {
        User user = userService.logoutUser(email);
        return ResponseEntity.ok(user);
    }

    @GetMapping()
    public ResponseEntity<User> getUser(
            @RequestParam String email
    ) {
        User user = userService.getUser(email);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

}
