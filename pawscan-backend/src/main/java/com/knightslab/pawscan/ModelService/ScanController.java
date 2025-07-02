package com.knightslab.pawscan.ModelService;

import com.knightslab.pawscan.image.ImageUploadService;
import com.knightslab.pawscan.user.HistoryItem;
import com.knightslab.pawscan.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class ScanController {

    @Autowired
    private UserService userService;


    @Autowired
    private ImageUploadService imageUploadService;

    @PostMapping("/scan")
    public ResponseEntity<?> handleScan (
            @RequestParam("file")MultipartFile file,
            HttpServletRequest request)
        throws IOException {

        String modelURL = "https://moh737abdo-pawscan-docker-api.hf.space/analyze";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new MultipartInputStreamFileResource(file.getInputStream(),
                file.getOriginalFilename()));

        HttpEntity<MultiValueMap<String, Object>> req = new HttpEntity<>(body,headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<ModelApiResponse> response =
                restTemplate.exchange(
                    modelURL,
                    HttpMethod.POST,
                    req,
                    ModelApiResponse.class
                );

        System.out.println(response.getBody());
        return ResponseEntity.ok(response.getBody());
    }

    @PostMapping("/upload/image")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file,
                                                @RequestParam("uid") String uid) {
        try {
            String imageUrl = imageUploadService.uploadImage(file);
            int id = userService.getProfile(uid).getHistory().size();
            HistoryItem item = new HistoryItem(id+1, imageUrl, LocalDate.now().toString());
            userService.addHistory(uid, item);

            System.out.println("imageUrl" + imageUrl);
            return ResponseEntity.ok(Map.of("imageUrl", imageUrl));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
}
