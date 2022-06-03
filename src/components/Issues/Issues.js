import React from "react";
import { useSelector } from "react-redux";

import "./Issues.css";

const Issues = () => {
  const { issues, activeRepoName } = useSelector((state) => state.repositories);

  console.log("ISSUES", issues);
  return (
    <div className="page_wrapper">
      <h3>{activeRepoName} Issues</h3>
      {issues.length > 0 ? (
        <>
          {issues.map((issue) => (
            <div key={issue.id} className="issue_wrapper">
              <div className="issue_title">
                <div className="bold_text">Title:</div>
                <div className="light_text">{issue.title}</div>
              </div>
              <div className="issue_body">
                <div className="bold_text">Body:</div>
                <div className="light_text">{issue.body}</div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>No opened issues on this repository</p>
      )}
    </div>
  );
};

export default Issues;
