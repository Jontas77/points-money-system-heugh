/*
import { useEffect } from "react";
import {
  // createTask,
  getAllChildren,
  getAllUsers,
  getUserById,
  updatePointsAndMoney,
} from "../services/api";
import { Child, User } from "../types";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import ChildCard from "../components/ChildCard";
import "../styles/ParentDashboard.css";
import { useQuery } from "@tanstack/react-query";

const ParentDashboard = () => {
  const { user, logout, loading } = useAuth();
  console.log(user?._id);
  // const
  // const [children, setChildren] = useState<Child[]>([]);
  // const [users, setUsers] = useState<User[]>([]);
  // const [parent, setParent] = useState<User | null>(null);
  const { data: children, refetch: refetchChildren } = useQuery({
    queryKey: ["children"],
    queryFn: getAllChildren,
  });
  const { data: parent, refetch: refetchParent } = useQuery({
    queryKey: ["parent", user?._id],
    queryFn: () => getUserById(user?._id ?? ""),
    enabled: !!user?._id,
  });
  const { data: users, refetch: refetchUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  const navigate = useNavigate();
  const getParent = localStorage.getItem("user");
  if (getParent) {
    console.log(JSON.parse(getParent));
  }
  console.log(children?.data);
  console.log(parent?.data);
  console.log(users?.data);

  // const fetchChildren = async () => {
  //   try {
  //     const response = await getAllChildren();
  //     setChildren(response.data);
  //   } catch (error) {
  //     console.error("Failed to fetch children", error);
  //   }
  // };

  // const fetchUsers = async () => {
  //   try {
  //     const response = await getAllUsers();
  //     setUsers(response.data);
  //   } catch (error) {
  //     console.error("Failed to fetch users", error);
  //   }
  // };

  useEffect(() => {
    // const fetchParent = async () => {
    //   try {
    //     const response = await getUserById(user?._id ?? "");
    //     setParent(response.data);
    //   } catch (error) {
    //     console.error("Failed to fetch parent", error);
    //   }
    // };

    if (!loading && user?._id) {
      refetchParent();
      refetchChildren();
      refetchUsers();
    }
  }, [user?._id, loading, refetchParent, refetchChildren, refetchUsers]);


  // const handleCreateTask = async (
  //   childId: string,
  //   taskDescription: string,
  //   taskPoints: number
  // ) => {
  //   try {
  //     await createTask(taskDescription, taskPoints, childId);
  //     alert("Task Created Successfully");
  //     fetchChildren(); // Refresh children data
  //   } catch (error) {
  //     console.error("Task creation failed", error);
  //   }
  // };

  const handleUpdatePointsAndMoney = async (
    childId: string,
    points: number,
    money: number,
    reason: string
  ) => {
    try {
      await updatePointsAndMoney(childId, points, money, reason);
      alert("Points and Money Updated Successfully");
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="parent-dashboard">
      <h1>{parent?.data?.firstName} Dashboard</h1>
      <div className="child-cards">
        {children?.data?.map((child: Child) => (
          <ChildCard
            key={child._id}
            child={child}
            // onCreateTask={handleCreateTask}
            onUpdatePointsAndMoney={handleUpdatePointsAndMoney}
          />
        ))}
      </div>
      <h2>All Users</h2>
      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users?.data?.map((user: User) => (
              <tr
                key={user?._id}
                onClick={() => navigate(`/user/update/${user?._id}`)}
                className="user-row"
              >
                <td>{user?.firstName}</td>
                <td>{user?.lastName}</td>
                <td>{user?.username}</td>
                <td>{user?.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => {
          logout();
          navigate("/auth/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default ParentDashboard;
*/
import { useEffect, useState } from "react";
import {
  getAllChildren,
  getAllUsers,
  getUserById,
  updatePointsAndMoney,
} from "../services/api";
import { Child, User } from "../types";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import ChildCard from "../components/ChildCard";
import "../styles/ParentDashboard.css";
import { useQuery } from "@tanstack/react-query";

const ParentDashboard = () => {
  const { user: authUser, logout, loading: authLoading } = useAuth();
  const [localUser, setLocalUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLocalUser(JSON.parse(storedUser));
    }
  }, []);

  const user = localUser || authUser;

  const { data: children, refetch: refetchChildren, isLoading: childrenLoading } = useQuery({
    queryKey: ["children"],
    queryFn: getAllChildren,
    enabled: !!user?._id,
  });

  const { data: parent, refetch: refetchParent, isLoading: parentLoading } = useQuery({
    queryKey: ["parent", user?._id],
    queryFn: () => getUserById(user?._id ?? ""),
    enabled: !!user?._id,
  });

  const { data: users, refetch: refetchUsers, isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    enabled: !!user?._id,
  });

  useEffect(() => {
    if (!authLoading && user?._id) {
      refetchParent();
      refetchChildren();
      refetchUsers();
    }
  }, [user?._id, authLoading, refetchParent, refetchChildren, refetchUsers]);

  const handleUpdatePointsAndMoney = async (
    childId: string,
    points: number,
    money: number,
    reason: string
  ) => {
    try {
      await updatePointsAndMoney(childId, points, money, reason);
      alert("Points and Money Updated Successfully");
      refetchChildren();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  if (authLoading || parentLoading || childrenLoading || usersLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="parent-dashboard">
      <h1>{localUser?.firstName ?? parent?.data?.firstName} Dashboard</h1>
      <div className="child-cards">
        {children?.data?.map((child: Child) => (
          <ChildCard
            key={child._id}
            child={child}
            onUpdatePointsAndMoney={handleUpdatePointsAndMoney}
          />
        ))}
      </div>
      <h2>All Users</h2>
      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users?.data?.map((user: User) => (
              <tr
                key={user._id}
                onClick={() => navigate(`/user/update/${user._id}`)}
                className="user-row"
              >
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => {
          logout();
          navigate("/auth/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default ParentDashboard;