package pl.gda.edu.pg.user.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String errorMessage) {
        super(errorMessage);
    }
}
