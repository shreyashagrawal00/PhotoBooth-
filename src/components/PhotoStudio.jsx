import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import html2canvas from "html2canvas";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { PHOTO_BOOTH_CONFIG } from "../config";
import "./PhotoStudio.css";

const PhotoStudio = () => {
  const [selectedFilter, setSelectedFilter] = useState(PHOTO_BOOTH_CONFIG.filters[0]);
  const [photos, setPhotos] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const webcamRef = useRef(null);

  const takePhoto = useCallback(async () => {
    const video = webcamRef.current?.video;
    if (!video || video.readyState < 2) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");

    ctx.filter = selectedFilter.filterStyle;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const filteredImg = canvas.toDataURL("image/jpeg", 0.9);
    setPhotos((prev) => [
      ...prev,
      { src: filteredImg, filter: selectedFilter },
    ]);
  }, [selectedFilter]);

  const startPhotoSequence = async () => {
    setIsCapturing(true);
    setPhotos([]);
    setShowResult(false);

    for (let i = 0; i < PHOTO_BOOTH_CONFIG.photosPerStrip; i++) {
      for (let count = PHOTO_BOOTH_CONFIG.countdownDuration; count > 0; count--) {
        setCountdown(count);
        await new Promise((r) => setTimeout(r, 1000));
      }
      setCountdown("Smile!");
      await takePhoto();
      await new Promise((r) => setTimeout(r, 500));
      setCountdown(null);
      await new Promise((r) => setTimeout(r, PHOTO_BOOTH_CONFIG.interPhotoDelay));
    }

    setIsCapturing(false);
    setShowResult(true);
  };

  const handleReshoot = () => {
    setPhotos([]);
    setShowResult(false);
  };

  const handleDownload = async () => {
    const frame = document.getElementById("photostrip-canvas-source");
    if (!frame) return;

    try {
      const canvas = await html2canvas(frame, {
        useCORS: true,
        scale: 2, // Higher quality
        backgroundColor: "#ffffff"
      });
      const dataURL = canvas.toDataURL("image/jpeg", 1.0);

      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `${PHOTO_BOOTH_CONFIG.captionPrefix}-strip.jpg`;
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <Motion.div
      className="studio-root"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {!showResult ? (
          <Motion.div
            key="studio"
            className="studio-layout"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
          >
            <section className="studio-preview-section">
              <div className="webcam-container">
                <AnimatePresence>
                  {countdown && (
                    <Motion.div
                      className="countdown-toast"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 1 }}
                      exit={{ scale: 2, opacity: 0 }}
                    >
                      {countdown}
                    </Motion.div>
                  )}
                </AnimatePresence>

                <div className={`webcam-frame ${selectedFilter.cssClass}`}>
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    className="webcam-source"
                    mirrored={true}
                  />
                </div>
              </div>

              <div className="filter-controls">
                {PHOTO_BOOTH_CONFIG.filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter)}
                    className={`filter-chip ${selectedFilter.id === filter.id ? "is-active" : ""}`}
                    disabled={isCapturing}
                  >
                    {filter.name}
                  </button>
                ))}
              </div>

              <button
                className="trigger-btn"
                onClick={startPhotoSequence}
                disabled={isCapturing}
                aria-label="Start photo sequence"
              >
                {isCapturing ? "📸..." : "📸 TAKE PHOTOS"}
              </button>
            </section>
          </Motion.div>
        ) : (
          <Motion.div
            key="result"
            className="result-layout"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="result-card">
              <div className="photostrip-container" id="photostrip-canvas-source">
                <div className="photostrip-content">
                  {photos.map((photo, idx) => (
                    <div className="photostrip-item" key={idx}>
                      <img
                        src={photo.src}
                        alt={`Capture ${idx + 1}`}
                        className="photostrip-img"
                      />
                    </div>
                  ))}
                  <footer className="photostrip-footer">
                    <span className="brand">{PHOTO_BOOTH_CONFIG.captionPrefix}</span>
                    <span className="date">
                      {new Date().toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </footer>
                </div>
              </div>

              <nav className="result-actions">
                <button onClick={handleReshoot} className="btn-secondary">
                  Reshoot
                </button>
                <button onClick={handleDownload} className="btn-primary">
                  Download Strip
                </button>
              </nav>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.div>
  );
};

export default PhotoStudio;
