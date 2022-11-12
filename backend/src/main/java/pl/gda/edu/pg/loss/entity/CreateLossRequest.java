package pl.gda.edu.pg.loss.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
public class CreateLossRequest {

    @Size(max = 1500)
    @NotNull
    private String reason;

    @NotNull
    long insuranceId;
}
