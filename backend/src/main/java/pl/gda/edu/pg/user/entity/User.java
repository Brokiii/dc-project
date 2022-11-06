package pl.gda.edu.pg.user.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import pl.gda.edu.pg.insurance.entity.entity.Insurance;

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
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Integer Id;

    @Column(nullable = false, unique = true)
    private String login;

    @Column(nullable = false)
    @JsonIgnore
    private String hashedPassword;

    @Column(unique = true, nullable = false)
    private String email;

    private String accountType;

    @Column(nullable = false)
    private String name;

    private String surname;

    @OneToMany(mappedBy = "user")
    private Set<Insurance> insurances;
}
