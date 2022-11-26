package pl.gda.edu.pg.loss.entity;

import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor

public class UpdateLossStatusRequest {
    Integer lossId;
    ReportStage status;
}
