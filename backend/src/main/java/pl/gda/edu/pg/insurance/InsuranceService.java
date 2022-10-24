package pl.gda.edu.pg.insurance;

import org.springframework.stereotype.Service;
import pl.gda.edu.pg.insurance.entity.entity.Insurance;
import pl.gda.edu.pg.insurance.entity.entity.InsuranceCreationRequest;
import pl.gda.edu.pg.insurance.entity.exception.CreateNewInsuranceException;
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
    @Transactional
    public Insurance createNewInsurance(InsuranceCreationRequest insurance){
        Integer userId = Integer.valueOf(insurance.getUserId());
        if(!userRepository.findById(userId).isPresent()){
            throw new NoUserWithIdException("Creating new insurance failed, couldn't find user with id: " + insurance.getUserId());
        }
        try {
            Insurance tmp = Insurance.builder()
                    .goodType(insurance.getGoodType())
                    .insuranceType(insurance.getInsuranceType())
                    .user(userRepository.findById(userId).get())
                    .build();

            return insuranceRepository.save(tmp);
        }
        catch(Exception e){
            throw new CreateNewInsuranceException("Creating new insurance failed", e);
        }
    }

    @Transactional
    public void delete(Long id){
        Optional<Insurance> tmp = insuranceRepository.findById(id);

        tmp.ifPresent(insuranceRepository::delete);
    }
}
