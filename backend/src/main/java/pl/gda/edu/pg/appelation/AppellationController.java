package pl.gda.edu.pg.appelation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appellation")
@Slf4j
@RequiredArgsConstructor
public class AppellationController {
    
    private final AppellationService appellationService;

    @PostMapping
    public ResponseEntity<Appellation> create(@RequestBody CreateAppelationRequest createAppelationRequest) {
        Appellation created = appellationService.create(createAppelationRequest);
        return ResponseEntity.ok(created);
    }

    @GetMapping
    public ResponseEntity<Appellation> getAppelation(@RequestParam int AppelationId) {
        Appellation found = appellationService.read(AppelationId);
        return ResponseEntity.ok(found);
    }

    @DeleteMapping
    public ResponseEntity delete(@RequestParam int AppelationId) {
        appellationService.delete(AppelationId);
        return ResponseEntity.accepted().build();
    }


    @GetMapping("/all")
    public ResponseEntity<List<Appellation>> getAllAppelationes() {
        return ResponseEntity.ok(appellationService.getAll());
    }
}
