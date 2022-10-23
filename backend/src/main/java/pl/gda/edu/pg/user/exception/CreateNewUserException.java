package pl.gda.edu.pg.user.exception;

public class CreateNewUserException extends RuntimeException{
    public CreateNewUserException(String errorMessage, Throwable err) {
        super(errorMessage, err);
    }
}
