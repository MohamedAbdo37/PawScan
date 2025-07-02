package com.knightslab.pawscan.user;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.knightslab.pawscan.image.ImageUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class UserController {

    @Autowired
    private UserService userService;


    @Autowired
    private ImageUploadService imageUploadService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> body) {
        try {
            String idToken = body.get("idToken");
            String username = body.get("username");

            // Verify the token
            FirebaseToken decoded = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String uid = decoded.getUid();
            String email = decoded.getEmail();

            // Call the service to create a profile
            String message = userService.signUpUser(uid, email, username);

            userService.createProfile(
                    new UserProfile(
                            uid ,
                            username,
                            email,
                            "",
                            new ArrayList<>(),
                            LocalDateTime.now().toString()
                    ));

            // Return success response
            return ResponseEntity.ok(Map.of(
                    "message", message,
                    "uid", uid,
                    "email", email,
                    "username", username
            ));
        } catch (Exception e) {
            // Return error response
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "error", "Token verification failed or profile creation error",
                    "details", e.getMessage()
            ));
        }
    }

    @GetMapping("/login")
    public ResponseEntity<?>getUserInfo(@NotNull Authentication authentication) {
        String uid = (String) authentication.getPrincipal();
        return  ResponseEntity.ok("Hello user with UID: " + uid);
    }

    @PostMapping("/profile")
    public ResponseEntity<?> createProfile(@RequestBody UserProfile profile) {
        try {
            userService.createProfile(profile);
            return ResponseEntity.ok(Map.of("message", "Profile created"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/profile/{uid}")
    public ResponseEntity<?> getProfile(@PathVariable String uid) {
        try {
            UserProfile profile = userService.getProfile(uid);
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }
    }

    @GetMapping("/profile/image/{uid}")
    public ResponseEntity<?> getProfileImage(@PathVariable String uid) {
        try {
            UserProfile profile = userService.getProfile(uid);
            return ResponseEntity.ok(Map.of("imgURL", profile.getProfileImageUrl()));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }
    }

    @PostMapping("/profile/{uid}/history")
    public ResponseEntity<?> addHistory(@PathVariable String uid, @RequestBody HistoryItem item) {
        try {
            userService.addHistory(uid, item);
            return ResponseEntity.ok(Map.of("message", "History added"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/history/{uid}")
    public ResponseEntity<?> getHistory(@PathVariable String uid, @RequestBody HistoryItem item) {
        try {
            userService.addHistory(uid, item);
            return ResponseEntity.ok(Map.of("message", "History added"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/profile/image/{uid}")
    public ResponseEntity<?> updateProfileImage(@PathVariable String uid, @RequestBody Map<String, String> body) {
        try {
            String imageUrl = body.get("imageUrl");
            if (imageUrl == null || imageUrl.isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("error", "imageUrl is required"));
            }
            userService.updateProfileImage(uid, imageUrl);
            return ResponseEntity.ok(Map.of("message", "Profile image updated"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping(path = "/upload/profile-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadProfileImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("uid") String uid) {
        try {
            String imageUrl = imageUploadService.uploadImage(file);
            userService.updateProfileImage(uid, imageUrl);
            return ResponseEntity.ok(Map.of("imageUrl", imageUrl));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/update/profile/{uid}")
    public ResponseEntity<?> updateUsername(@RequestBody Map<String, String> body,
                                                @PathVariable String uid) {
        try {
            String username = body.get("username");
            userService.updateProfileUsername(uid, username);
            return ResponseEntity.ok(Map.of("username", username));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

}
