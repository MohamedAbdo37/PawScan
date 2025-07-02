package com.knightslab.pawscan.user;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserProfile {
    private String uid;
    private String username;
    private String email;
    private String profileImageUrl;
    private List<HistoryItem> history = new ArrayList<>();
    private String createdAt;
}
