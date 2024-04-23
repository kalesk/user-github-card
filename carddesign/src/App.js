import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Collapse } from "react-bootstrap";
import "./App.css";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [showCard, setShowCard] = useState(false);

  const GitHubUserCard = ({ userData }) => {
    const { avatar_url, login, name, public_repos, public_gists, created_at } =
      userData;

    return (
      <div className="github-card ">
        <div className="user-info">
          <div className="avatar-container">
            <img src={avatar_url} alt={login} className="avatar-img" />
          </div>
          <div>
            <h2>{name}</h2>
            <p>Username: {login}</p>
            <p>Public Repos: {public_repos}</p>
            <p>Public Gists: {public_gists}</p>
            <p>
              Profile Created At: {new Date(created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const UserForm = ({ onSubmit }) => {
    const formik = useFormik({
      initialValues: {
        username: "",
      },
      onSubmit: (values) => {
        onSubmit(values.username);
      },
    });

    return (
      <form onSubmit={formik.handleSubmit} className="github-card">
        <h1>Github Profile Info</h1>
        <div className="form-group">
          <input
            id="username"
            name="username"
            type="text"
            className="form-control"
            placeholder="Enter GitHub username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Get User GitHub Info
        </button>{" "}
        {formik.errors.username && (
          <div className="error-message">{formik.errors.username}</div>
        )}
      </form>
    );
  };

  const fetchUserData = async (username) => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUserData(response.data);
      setShowCard(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="container">
      <div className="github-card">
        <UserForm onSubmit={fetchUserData} />
        <Collapse in={showCard}>
          <div>{userData && <GitHubUserCard userData={userData} />}</div>
        </Collapse>
      </div>
    </div>
  );
};

export default App;
