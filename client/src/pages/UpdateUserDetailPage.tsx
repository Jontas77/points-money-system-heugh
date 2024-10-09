import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../services/api";
import { updateUserInput, User } from "../types";
import "../styles/UpdateUserDetail.css";

const UpdateUserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<updateUserInput>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(id ?? "");
        setUser(response.data);
        setUserData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          username: response.data.username,
          password: "",
          role: response.data.role,
        });
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(id ?? "", userData);
      navigate(`/user/${id}`);
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="update-user-detail">
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>
      <h1>Update User Details</h1>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={userData.role}
            onChange={handleChange}
          >
            <option value="parent">Parent</option>
            <option value="child">Child</option>
          </select>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUserDetailPage;
