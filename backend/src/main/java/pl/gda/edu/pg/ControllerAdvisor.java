package pl.gda.edu.pg;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import pl.gda.edu.pg.user.UserService;
import pl.gda.edu.pg.user.exception.CreateNewUserException;
import pl.gda.edu.pg.user.exception.LoginWrongPasswordException;
import pl.gda.edu.pg.user.exception.UserAlreadyExistException;
import pl.gda.edu.pg.user.exception.UserNotFoundException;

@RestControllerAdvice
public class ControllerAdvisor {
    private final Logger LOG = LoggerFactory.getLogger(ControllerAdvisor.class);


    @ExceptionHandler(UserAlreadyExistException.class)
    public ResponseEntity<String> handleUserAlreadyExistException(
            UserAlreadyExistException ex,
            WebRequest request) {
        LOG.error(ex.getMessage(), ex);
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ex.getMessage());
    }

    @ExceptionHandler(CreateNewUserException.class)
    public ResponseEntity<String> handleCreateNewUserException(
            CreateNewUserException ex,
            WebRequest request) {
        LOG.error(ex.getMessage(), ex);
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ex.getMessage());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFoundException(
            UserNotFoundException ex,
            WebRequest request) {
        LOG.error(ex.getMessage(), ex);
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ex.getMessage());
    }

    @ExceptionHandler(LoginWrongPasswordException.class)
    public ResponseEntity<String> handleLoginWrongPasswordException(
            LoginWrongPasswordException ex,
            WebRequest request) {
        LOG.error(ex.getMessage(), ex);
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(ex.getMessage());
    }
}
