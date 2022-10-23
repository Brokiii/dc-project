package pl.gda.edu.pg.user.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import pl.gda.edu.pg.insurance.entity.Insurance;

import javax.persistence.*;
import java.util.Set;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "user", schema = "public")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(nullable = false, unique = true)
    private String login;

    @Column(nullable = false)
    @JsonIgnore
    private String hashedPassword;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "account_type")
    private String accountType;

    @Column(nullable = false)
    private String name;

    private String surname;

    @OneToMany(mappedBy = "user")
    private Set<Insurance> insurances;
}
