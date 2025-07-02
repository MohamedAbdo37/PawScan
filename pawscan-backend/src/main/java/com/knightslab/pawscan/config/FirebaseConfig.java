package com.knightslab.pawscan.config;

import com.google.api.client.util.Value;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    private String firebaseCredentialPath = "/home/ubuntu/PawScan/serviceAccountKey.json";

    @Bean
    public Firestore firestore() throws IOException {
        System.out.println("FIREBASE_CREDENTIAL_PATH = " + firebaseCredentialPath);
        FileInputStream serviceAccount = new FileInputStream(firebaseCredentialPath);

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }

        System.out.println("✅ Firebase has been initialized.");

        return FirestoreClient.getFirestore();
    }

}

