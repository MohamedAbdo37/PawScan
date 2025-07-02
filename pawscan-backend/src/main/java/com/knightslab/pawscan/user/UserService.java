package com.knightslab.pawscan.user;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;


@Service
public class UserService {

    private final Firestore db;

    public UserService(Firestore db) {
        this.db = db;
    }

    public void createProfile(UserProfile user) throws Exception {
        db.collection("users").document(user.getUid()).set(user);
    }

    public UserProfile getProfile(String uid) throws Exception {
        DocumentSnapshot doc = db.collection("users").document(uid).get().get();
        if (!doc.exists()) throw new RuntimeException("User not found");
        return doc.toObject(UserProfile.class);
    }

    public void addHistory(String uid, HistoryItem item) throws Exception {
        DocumentReference docRef = db.collection("users").document(uid);
        ApiFuture<WriteResult> arrayUnion = docRef.update("history", FieldValue.arrayUnion(item));
        arrayUnion.get(); // block until written
    }


    public String signUpUser(String uid,
                             String email,
                             String username) throws Exception{
        UserProfile profile = new UserProfile(  uid, username,
                                                email, "",
                                                new ArrayList<>(),
                                                LocalDateTime.now().toString());

        this.db.collection("users").document(uid).set(profile);
        return "User profile created!";
    }

    public void updateProfileImage(String uid, String imageUrl) throws Exception {
        DocumentReference docRef = db.collection("users").document(uid);
        ApiFuture<WriteResult> writeResult = docRef.update("profileImageUrl", imageUrl);
        writeResult.get(); // wait for completion
    }

    public void updateProfileUsername(String uid, String username) throws Exception {
        DocumentReference docRef = db.collection("users").document(uid);
        ApiFuture<WriteResult> writeResult = docRef.update("username", username);
        writeResult.get(); // wait for completion
    }



}
