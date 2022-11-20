package pl.gda.edu.pg.insurance;

import org.springframework.stereotype.Service;
import pl.gda.edu.pg.insurance.entity.entity.Insurance;
import pl.gda.edu.pg.insurance.entity.entity.InsuranceCreationRequest;
import pl.gda.edu.pg.insurance.entity.entity.InsuranceDownload;
import pl.gda.edu.pg.insurance.entity.entity.InsuranceUpdateAgentRequest;
import pl.gda.edu.pg.insurance.entity.exception.CreateNewInsuranceException;
import pl.gda.edu.pg.insurance.entity.exception.InsuranceNotFoundException;
import pl.gda.edu.pg.insurance.entity.exception.NoUserWithIdException;
import pl.gda.edu.pg.loss.LossService;
import pl.gda.edu.pg.user.UserRepository;
import pl.gda.edu.pg.user.entity.User;
import pl.gda.edu.pg.user.exception.UserNotFoundException;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class InsuranceService {

    private final InsuranceRepository insuranceRepository;
    private final UserRepository userRepository;
    private final LossService lossService;

    public InsuranceService(InsuranceRepository insuranceRepository, UserRepository userRepository, LossService lossService){
        this.insuranceRepository = insuranceRepository;
        this.userRepository = userRepository;
        this.lossService = lossService;
    }

    public List<Insurance> findAll() {
        return (List<Insurance>) insuranceRepository.findAll();
    }

    public List<Insurance> findAllForUser(String email) {

        User tmp = userRepository.getUserByEmail(email).orElseThrow(() ->
                new UserNotFoundException("User not found!"));


        return insuranceRepository.getInsurancesByUser(tmp);
    }

    public Optional<Insurance> findById(int id) { return insuranceRepository.findById(id);}
    @Transactional
    public Insurance createNewInsurance(InsuranceCreationRequest insurance){
        String email = insurance.getEmail();
        if(!userRepository.getUserByEmail(email).isPresent()){
            throw new NoUserWithIdException("Creating new insurance failed, couldn't find client with email: " + email);
        }

        try {
            Insurance tmp = Insurance.builder()
                    .goodType(insurance.getGoodType())
                    .insuranceType(insurance.getInsuranceType())
                    .user(userRepository.getUserByEmail(email).get())
                    .userAgent(null)
                    .build();

            return insuranceRepository.save(tmp);
        }
        catch(Exception e){
            throw new CreateNewInsuranceException("Creating new insurance failed", e);
        }
    }
    @Transactional
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

    public InsuranceDownload createDownloadDto(int id){
        if(!insuranceRepository.findById(id).isPresent()) {
            throw new InsuranceNotFoundException("Couldn't find insurance with id: " + id);
        }

        Insurance insurance = insuranceRepository.findById(id).get();
        int clientId = insurance.getUser().getId();

        if(insurance.getUserAgent() == null){
            InsuranceDownload tmp = InsuranceDownload.builder()
                    .id(id)
                    .goodType(insurance.getGoodType())
                    .insuranceType(insurance.getInsuranceType())
                    .clientEmail(userRepository.findById(clientId).get().getEmail())
                    .clientName(userRepository.findById(clientId).get().getName())
                    .clientSurname(userRepository.findById(clientId).get().getSurname())
                    .build();

            return tmp;
        }
        else {
            int agentId = insurance.getUserAgent().getId();

            InsuranceDownload tmp = InsuranceDownload.builder()
                    .id(id)
                    .goodType(insurance.getGoodType())
                    .insuranceType(insurance.getInsuranceType())
                    .clientEmail(userRepository.findById(clientId).get().getEmail())
                    .clientName(userRepository.findById(clientId).get().getName())
                    .clientSurname(userRepository.findById(clientId).get().getSurname())
                    .agentEmail(userRepository.findById(agentId).get().getEmail())
                    .agentName(userRepository.findById(agentId).get().getName())
                    .agentSurname(userRepository.findById(agentId).get().getSurname())
                    .build();

            return tmp;
        }
    }
}
