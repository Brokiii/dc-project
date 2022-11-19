package pl.gda.edu.pg.appelation;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import pl.gda.edu.pg.loss.entity.Loss;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

@Entity
@Table(name = "appellation", schema = "public")
public class Appellation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id", nullable = false)
    private Integer appellationId;

    @Column(name="decision_comment", nullable = false)
    private String decisionComment;

    @Column(name="client_comment", nullable = false)
    private String clientComment;

    private boolean consideredFavourably;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "loss_reportId")
    private Loss loss;
}
