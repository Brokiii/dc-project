package pl.gda.edu.pg.insurance.entity.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import pl.gda.edu.pg.loss.entity.Loss;
import pl.gda.edu.pg.user.entity.User;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

@Entity
@Table(name = "insurance", schema = "public")
public class Insurance {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id", nullable = false)
    private Integer insuranceId;

    @Column(name="good_type", nullable = false)
    private String goodType;

    @Column(name="insurance_type", nullable = false)
    private String insuranceType;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "client_id")
    private User user;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "agent_id")
    private User userAgent;

    @OneToMany(mappedBy = "insurance")
    private Set<Loss> loss;
}
