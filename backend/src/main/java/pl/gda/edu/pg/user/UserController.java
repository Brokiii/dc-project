package pl.gda.edu.pg.user;

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

    @PostMapping("/create")
    public ResponseEntity<String> createNewUser(
            @RequestBody UserRequest userRequest
            ) {
        try {
            Long userId = userService.createNewUser(userRequest);
            LOG.info("Successfully created user with ID: " + userId);
            return ResponseEntity.ok("Created user with ID: " + userId);
        } /*catch (ConstraintViolationException e) {
            LOG.error("User with email " + userRequest.getEmail() + " already exist!", e);
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("User with email " + userRequest.getEmail() + " already exist!");
        } catch (PropertyValueException e) {
            LOG.error("Some fields are null!", e);
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Some fields are null!");
        }*/
        catch (Exception e) {
            LOG.error("Creating new user error", e);
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Something went wrong creating new user with email: " + userRequest.getEmail());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

}
