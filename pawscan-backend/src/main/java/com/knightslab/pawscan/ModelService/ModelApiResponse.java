package com.knightslab.pawscan.ModelService;

public class ModelApiResponse {
    private String classification;
    private String detection_img;
    private String mask_img;

    public String getClassification() {
        return classification;
    }

    public void setClassification(String classification) {
        this.classification = classification;
    }

    public String getDetection_img() {
        return detection_img;
    }

    public void setDetection_img(String detection_img) {
        this.detection_img = detection_img;
    }

    public String getMask_img() {
        return mask_img;
    }

    public void setMask_img(String mask_img) {
        this.mask_img = mask_img;
    }
}
