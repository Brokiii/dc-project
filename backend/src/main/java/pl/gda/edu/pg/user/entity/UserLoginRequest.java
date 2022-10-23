package pl.gda.edu.pg.user.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class UserLoginRequest {
    private String email;
    private String password;
}
