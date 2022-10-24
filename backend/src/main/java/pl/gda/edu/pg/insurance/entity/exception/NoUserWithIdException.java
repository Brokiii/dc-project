package pl.gda.edu.pg.insurance.entity.exception;

public class NoUserWithIdException extends RuntimeException{

    public NoUserWithIdException(String errorMessage) {
        super(errorMessage);
    }
}
