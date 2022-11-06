package pl.gda.edu.pg.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.gda.edu.pg.user.entity.MyUserDetails;
import pl.gda.edu.pg.user.entity.User;
import pl.gda.edu.pg.user.exception.UserNotFoundException;

@Service
public class MyUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Autowired
    public MyUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UserNotFoundException {
        User user = userRepository.getUserByEmail(email).orElseThrow(() ->
                new UserNotFoundException("User not found!"));
        return MyUserDetails.builder()
                .Id(user.getId())
                .email(user.getEmail())
                .login(user.getLogin())
                .hashedPassword(user.getHashedPassword())
                .build();
    }
}
