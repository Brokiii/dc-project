package pl.gda.edu.pg.user.exception;

public class LoginWrongPasswordException extends RuntimeException{
    public LoginWrongPasswordException(String errorMessage) {
        super(errorMessage);
    }
}
