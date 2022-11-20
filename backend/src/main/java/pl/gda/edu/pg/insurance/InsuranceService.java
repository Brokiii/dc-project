package pl.gda.edu.pg.insurance;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Lazy;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.gda.edu.pg.configuration.drive.DriveService;
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
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

@Service
public class InsuranceService {

    private final InsuranceRepository insuranceRepository;
    private final UserRepository userRepository;
    private final DriveService driveService;

    private final LossService lossService;

    public InsuranceService(InsuranceRepository insuranceRepository, UserRepository userRepository,@Lazy LossService lossService,@Lazy DriveService driveService){
        this.insuranceRepository = insuranceRepository;
        this.userRepository = userRepository;
        this.lossService = lossService;
        this.driveService = driveService;
    }

    public List<Insurance> findAll() {
        return (List<Insurance>) insuranceRepository.findAll();
    }

    public List<Insurance> findAllForUser(String email) {

        User tmp = userRepository.getUserByEmail(email).orElseThrow(() ->
                new UserNotFoundException("User not found!"));


        return insuranceRepository.getInsurancesByUser(tmp);
    }

    public void sendInsuranceWithLossesToGoogleDrive(int id) throws Exception {
        InsuranceDownload insurance = createDownloadDto(id);
        ObjectMapper mapper = new ObjectMapper();
        String insuranceJson = mapper.writeValueAsString(insurance);
        MultipartFile fichier = new MockMultipartFile("x.json",
                "insuranceWithLosses.json",
                "application/json",
                insuranceJson.getBytes(StandardCharsets.UTF_8));

        driveService.deleteOldInsurance(insurance.getClientEmail(), Integer.toString(insurance.getId()));
        driveService.addInsuranceWithLosses(fichier, insurance.getClientEmail(), Integer.toString(insurance.getId()));
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

            Insurance insurance1 = insuranceRepository.save(tmp);
            sendInsuranceWithLossesToGoogleDrive(insurance1.getInsuranceId());
            return insurance1;
        }
        catch(Exception e){
            throw new CreateNewInsuranceException("Creating new insurance failed", e);
        }
    }
    @Transactional
    public Insurance updateAgentValue(Insurance insurance, InsuranceUpdateAgentRequest insuranceRequest){
        String email = insuranceRequest.getEmail();
        if(!userRepository.getUserByEmail(email).isPresent()){
            throw new NoUserWithIdException("Creating new insurance failed, couldn't find client with email: " + email);
        }

        try{
            insurance.setUserAgent(userRepository.getUserByEmail(email).get());
            sendInsuranceWithLossesToGoogleDrive(insurance.getInsuranceId());
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
                    .losses(insurance.getLoss())
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
                    .losses(insurance.getLoss())
                    .build();

            return tmp;
        }
    }
}
