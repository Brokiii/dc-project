package pl.gda.edu.pg.loss.excpeption;

public class LossNotFoundException extends RuntimeException{
    public LossNotFoundException(String errorMessage) {
        super(errorMessage);
    }
}
