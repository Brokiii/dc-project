package pl.gda.edu.pg.user.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class UserRegisterRequest {
    private String name;
    private String surname;
    private String email;
    private String password;
    private String accountType;
}
