package pl.gda.edu.pg.configuration;

import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class JwtBlackList {
    private final ArrayList<String> jwtBlackList;

    public JwtBlackList() {
        this.jwtBlackList = new ArrayList<String>();
    }

    public boolean jwtOnBlacklist(String jwt) {
        for(String jwtList : jwtBlackList) {
            if(jwtList.equals(jwt))
                return true;
        }
        return false;
    }

    public void addToBlackList(String jwt) {
        jwtBlackList.add(jwt);
    }
}
