package pl.gda.edu.pg.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.hibernate.PropertyValueException;
import org.hibernate.exception.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.gda.edu.pg.user.entity.User;
import pl.gda.edu.pg.user.entity.UserLoginRequest;
import pl.gda.edu.pg.user.entity.UserRequest;

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
    public ResponseEntity<String> createNewUser(
            @RequestBody UserRequest userRequest) {
        Long userId = userService.createNewUser(userRequest);
        LOG.info("Successfully created user with ID: " + userId);
        return ResponseEntity.ok("Created user with ID: " + userId);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(
            @RequestBody UserLoginRequest userLoginRequest) {
        User user = userService.loginGetUser(userLoginRequest);
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
