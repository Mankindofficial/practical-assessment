import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  getRepositories,
  getIssues,
  updateActiveRepo,
} from "../../redux/slices";
import "./RepositoriesTable.css";

const RepositoriesTable = () => {
  const dispatch = useDispatch();
  const seachInput = useRef(null);
  const repositories = useSelector((state) => state.repositories.list);

  const handleClick = (e) => {
    if (e.key == "Enter") {
      dispatch(getRepositories(seachInput.current.value));
    }
  };

  const handleIssues = (repo) => {
    const { name, issues_url } = repo;
    dispatch(updateActiveRepo(name));
    dispatch(getIssues(issues_url.replace("{/number}", ""), name));
  };

  return (
    <div className="page_wrapper">
      <h3 className="heading">Search Repositories</h3>
      <p className="description">Type in the repository name and hit enter</p>
      <div className="input_wrapper">
        <input
          type="search"
          onKeyPress={handleClick}
          ref={seachInput}
          placeholder="Enter repository name here"
        />
      </div>
      <div className="page_body">
        {repositories.length > 0 && (
          <table className="table">
            <thead className="table_head">
              <tr>
                <th>Name</th>
                <th>Url</th>
                <th>Forks count</th>
                <th>Stargazers count</th>
                <th>Open Issues count</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="table_body">
              {repositories.map((repo) => (
                <tr key={repo.id}>
                  <td>{repo.name}</td>
                  <td>
                    <a href={repo.html_url} target="_blank">
                      {repo.html_url}
                    </a>
                  </td>
                  <td>{repo.forks_count}</td>
                  <td>{repo.stargazers_count}</td>
                  <td>{repo.open_issues_count}</td>
                  <td className="description">{repo.description}</td>
                  <Link
                    className="show_issues"
                    to="/issues"
                    onClick={() => handleIssues(repo)}
                  >
                    Show Issues
                  </Link>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RepositoriesTable;
