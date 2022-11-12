package pl.gda.edu.pg.user.entity;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter

public class UserLoginRequest {
    private String email;
    private String password;
}
