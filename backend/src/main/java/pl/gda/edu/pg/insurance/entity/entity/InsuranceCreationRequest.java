package pl.gda.edu.pg.insurance.entity.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InsuranceCreationRequest {

    private String goodType;
    private String insuranceType;
    private String email;
}
