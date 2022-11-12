package pl.gda.edu.pg.loss.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.gda.edu.pg.insurance.entity.entity.Insurance;

import javax.persistence.*;
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

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "insurance_id")
    private Insurance insurance;

    public static Loss CreateRequestToLossMapper(CreateLossRequest createLossRequest)
    {
        return Loss.builder()
            .reason(createLossRequest.getReason())
            .reportStage(ReportStage.RECEIVED)
            .build();
    }
}
