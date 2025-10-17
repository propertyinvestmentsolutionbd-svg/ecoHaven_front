"use client";

const YouTubeSection = () => {
  return (
    <div className="youtube-section">
      <div className="youtube-container">
        <div className="video-wrapper">
          <iframe
            src={`https://www.youtube.com/embed/0Lf4Qwj6V68?si=7H-qtEVFbIhyxxSz`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="youtube-iframe"
          />
        </div>

        {/* Optional: Video title or description */}
        <div className="video-info">
          <h3 className="video-title">Our Creative Process</h3>
          <p className="video-description">
            Watch how we bring digital ideas to life at Digitmark Creative
          </p>
        </div>
      </div>
    </div>
  );
};

export default YouTubeSection;
