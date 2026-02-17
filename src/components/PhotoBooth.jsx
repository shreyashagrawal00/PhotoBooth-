import React, { useState } from "react";
import Webcam from "react-webcam";
import PhotoStudio from "./PhotoStudio";
import { PHOTO_BOOTH_CONFIG } from "../config";
import "./PhotoBooth.css";

const PhotoBooth = () => {
  const [coinInserted, setCoinInserted] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [showStudio, setShowStudio] = useState(false);

  const handleInsertClick = () => setCoinInserted(true);

  const handleCoinClick = () => {
    setCurtainOpen(true);
    setTimeout(() => {
      setShowStudio(true);
    }, 1000);
  };

  if (showStudio) {
    return <PhotoStudio />;
  }

  return (
    <div className="booth-container">
      <header className="booth-header">
        <h1>{PHOTO_BOOTH_CONFIG.appName}😏🐼</h1>
      </header>

      <main className="booth-body">
        <aside className="coin-slot-section">
          <div className="coin-slot">
            {!coinInserted ? (
              <button
                className="insert-coin-btn"
                onClick={handleInsertClick}
                aria-label="Insert coin"
              >
                INSERT
                <br />
                COIN HERE
              </button>
            ) : (
              <div
                className="coin-token"
                onClick={handleCoinClick}
                role="button"
                aria-label="Click to start booth"
              />
            )}
            <div className="slot-visual" />
          </div>
        </aside>

        <section className="curtain-container">
          <div className="webcam-preview-wrapper">
            <Webcam
              audio={false}
              screenshotFormat="image/jpeg"
              className="webcam-preview"
            />
          </div>
          <div className={`booth-curtain ${curtainOpen ? "is-open" : ""}`} />
        </section>
      </main>
    </div>
  );
};

export default PhotoBooth;
