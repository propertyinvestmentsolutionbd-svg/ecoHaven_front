// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Card } from "antd";

export const JobCard = ({
  title,
  educationalRequirements,
  deadline,
  isExpired = false,
}) => {
  return (
    <Card className="job-card">
      {/* <CardHeader className="job-card-header">
        <CardTitle className="job-card-title">{title}</CardTitle>
        </CardHeader> */}
      <h2>{title}</h2>
      <div className="job-card-content">
        <p className="job-card-label">Educational Requirements:</p>
        <p className="job-card-text">{educationalRequirements}</p>
        <p className="job-card-deadline">
          Application Deadline: {deadline}
          {isExpired && <span className="job-card-expired"> (Expired)</span>}
        </p>
      </div>
    </Card>
  );
};
