import "./FeatureCard.css";

export const FeatureCard = ({ icon: Icon, title }) => {
  return (
    <div className="feature-card">
      <div className="feature-card-icon">
        <Icon size={32} strokeWidth={2.5} />
      </div>
      <h3 className="feature-card-title">{title}</h3>
    </div>
  );
};
