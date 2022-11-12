package pl.gda.edu.pg.insurance.entity.exception;

public class CreateNewInsuranceException extends RuntimeException{
    public CreateNewInsuranceException(String errorMessage, Throwable err) {
        super(errorMessage, err);
    }
}
