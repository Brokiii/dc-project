package pl.gda.edu.pg.loss.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class Loss {

    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Integer Id;

    @Enumerated(EnumType.STRING)
    @NotNull
    private ReportStage reportStage;

    @Size(max = 500)
    @Column(name = "decisionComment")
    private String decisionComment;

    private boolean consideredFavourably;

    @Size(max = 1500)
    @NotNull
    private String reason;

    public static Loss CreateRequestToLossMapper(CreateLossRequest createLossRequest)
    {
        return Loss.builder()
            .reason(createLossRequest.getReason())
            .reportStage(ReportStage.RECEIVED)
            .build();
    }
}
