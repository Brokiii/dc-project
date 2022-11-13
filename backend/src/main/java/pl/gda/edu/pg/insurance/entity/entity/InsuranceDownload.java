package pl.gda.edu.pg.insurance.entity.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class InsuranceDownload {

    private int id;
    private String goodType;
    private String insuranceType;

    private String clientEmail;
    private String clientName;
    private String clientSurname;

    private String agentEmail;
    private String agentName;
    private String agentSurname;
}
