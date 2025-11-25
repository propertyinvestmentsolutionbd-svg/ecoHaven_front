import { Card } from "antd";
import Link from "next/link";

export const JobCard = ({
  title,
  educationalRequirements,
  deadline,
  isExpired = false,
  jobType,
  redirectLink,
}) => {
  // Format the deadline date
  const formatDeadline = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Remove HTML tags from description for preview
  const getPlainText = (html) => {
    if (!html) return "No requirements specified";
    return html.replace(/<[^>]*>/g, "");
  };

  const cardContent = (
    <Card className={`job-card ${isExpired ? "expired" : ""}`}>
      {/* Job Type Badge */}
      {jobType && (
        <div className="job-type-badge">
          {jobType.charAt(0).toUpperCase() + jobType.slice(1)}
        </div>
      )}

      <h2 className="job-card-title">{title}</h2>

      <div className="job-card-content">
        <p className="job-card-label">Requirements:</p>
        <p
          className="job-card-text"
          dangerouslySetInnerHTML={{ __html: educationalRequirements }}
        ></p>

        <p className="job-card-deadline">
          Application Deadline: {formatDeadline(deadline)}
          {isExpired && <span className="job-card-expired"> (Expired)</span>}
        </p>

        {/* Apply Button for active jobs with redirect link */}
        {!isExpired && redirectLink && (
          <div className="job-card-apply">
            <span className="apply-text">Click to apply</span>
          </div>
        )}
      </div>
    </Card>
  );

  // If there's a redirect link and the job is active, make the card clickable
  if (redirectLink && !isExpired) {
    return (
      <Link
        href={redirectLink}
        target="_blank"
        rel="noopener noreferrer"
        className="job-card-link"
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};
