package pl.gda.edu.pg.insurance.entity.exception;

public class InsuranceNotFoundException extends RuntimeException{

    public InsuranceNotFoundException(String errorMessage) {
        super(errorMessage);
    }
}
