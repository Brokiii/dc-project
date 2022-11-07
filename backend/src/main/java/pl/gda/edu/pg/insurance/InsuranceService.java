package pl.gda.edu.pg.insurance;

import org.springframework.stereotype.Service;
import pl.gda.edu.pg.insurance.entity.entity.Insurance;
import pl.gda.edu.pg.insurance.entity.entity.InsuranceCreationRequest;
import pl.gda.edu.pg.insurance.entity.entity.InsuranceUpdateAgentRequest;
import pl.gda.edu.pg.insurance.entity.exception.CreateNewInsuranceException;
import pl.gda.edu.pg.insurance.entity.exception.InsuranceNotFoundException;
import pl.gda.edu.pg.insurance.entity.exception.NoUserWithIdException;
import pl.gda.edu.pg.user.UserRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class InsuranceService {

    private final InsuranceRepository insuranceRepository;
    private final UserRepository userRepository;

    public InsuranceService(InsuranceRepository insuranceRepository, UserRepository userRepository){
        this.insuranceRepository = insuranceRepository;
        this.userRepository = userRepository;
    }

    public List<Insurance> findAll() {
        return (List<Insurance>) insuranceRepository.findAll();
    }

    public Optional<Insurance> findById(int id) { return insuranceRepository.findById(id);}
    @Transactional
    public Insurance createNewInsurance(InsuranceCreationRequest insurance){
        Integer clientId = Integer.valueOf(insurance.getClientId());
        if(!userRepository.findById(clientId).isPresent()){
            throw new NoUserWithIdException("Creating new insurance failed, couldn't find client with id: " + clientId);
        }

        try {
            Insurance tmp = Insurance.builder()
                    .goodType(insurance.getGoodType())
                    .insuranceType(insurance.getInsuranceType())
                    .user(userRepository.findById(clientId).get())
                    .userAgent(null)
                    .build();

            return insuranceRepository.save(tmp);
        }
        catch(Exception e){
            throw new CreateNewInsuranceException("Creating new insurance failed", e);
        }
    }

    public Insurance updateAgentValue(Insurance insurance, InsuranceUpdateAgentRequest insuranceRequest){
        Integer agentId = Integer.valueOf(insuranceRequest.getUserAgentId());
        if(!userRepository.findById(agentId).isPresent()){
            throw new NoUserWithIdException("Creating new insurance failed, couldn't find client with id: " + agentId);
        }

        try{
            insurance.setUserAgent(userRepository.findById(agentId).get());

            return insuranceRepository.save(insurance);
        }
        catch(Exception e){
            throw new CreateNewInsuranceException("Creating new insurance failed", e);
        }
    }

    @Transactional
    public void delete(int id){
        if(insuranceRepository.existsById(id)){
            insuranceRepository.deleteById(id);
        }
        else{
            throw new InsuranceNotFoundException("Couldn't find insurance with id: " + id);
        }

    }
}
