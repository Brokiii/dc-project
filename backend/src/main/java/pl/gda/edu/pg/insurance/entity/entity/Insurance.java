package pl.gda.edu.pg.insurance.entity.entity;

import lombok.*;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="insurance_id", nullable = false)
    private Long insuranceId;

    @Column(name="good_type", nullable = false)
    private String goodType;

    @Column(name="insurance_type", nullable = false)
    private String insuranceType;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private User user;
}
