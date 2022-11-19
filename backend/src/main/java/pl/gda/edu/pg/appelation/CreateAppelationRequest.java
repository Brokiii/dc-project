package pl.gda.edu.pg.appelation;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class CreateAppelationRequest {

    @NotNull
    int lossId;

    @NotNull
    String reason;
}
