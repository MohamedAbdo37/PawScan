package com.knightslab.pawscan.ModelService;

import jakarta.servlet.http.HttpServletRequest;
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

@RestController
@RequestMapping("/api/v1")
public class ScanController {

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

        System.out.println(response.getBody().toString());
        return ResponseEntity.ok(response.getBody());
    }
}
