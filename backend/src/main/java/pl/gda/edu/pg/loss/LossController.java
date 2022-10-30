package pl.gda.edu.pg.loss;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.gda.edu.pg.loss.entity.CreateLossRequest;
import pl.gda.edu.pg.loss.entity.Loss;
import pl.gda.edu.pg.user.entity.User;
import pl.gda.edu.pg.user.entity.UserLoginRequest;

import java.util.List;

@RestController
@RequestMapping("/api/loss")
@Slf4j
@RequiredArgsConstructor
public class LossController {

    private final LossService lossService;


    @PostMapping
    public ResponseEntity<Loss> create(@RequestBody CreateLossRequest createLossRequest) {
        Loss created = lossService.create(createLossRequest);
        return ResponseEntity.ok(created);
    }

    @GetMapping()
    public ResponseEntity<Loss> getLoss(@RequestParam int lossId) {
        Loss found = lossService.read(lossId);
        return ResponseEntity.ok(found);
    }

    @DeleteMapping
    public ResponseEntity delete(@RequestParam int lossId) {
        lossService.delete(lossId);
        return ResponseEntity.accepted().build();
    }


    @GetMapping("/all")
    public ResponseEntity<List<Loss>> getAllLosses() {
        return ResponseEntity.ok(lossService.getAll());
    }
}
