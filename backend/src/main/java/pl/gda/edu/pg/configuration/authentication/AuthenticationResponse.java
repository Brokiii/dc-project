package pl.gda.edu.pg.configuration.authentication;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter

public class AuthenticationResponse {
    private String jwt;
    private String accountType;
    private String email;
}
