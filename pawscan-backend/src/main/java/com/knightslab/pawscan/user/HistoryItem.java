package com.knightslab.pawscan.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistoryItem {
    private int id;
    private String originalImageUrl;
    private String analysisDate;
}
