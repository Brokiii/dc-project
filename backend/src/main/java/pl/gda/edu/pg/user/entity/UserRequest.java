package pl.gda.edu.pg.user.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class UserRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String hashedPassword;
}
