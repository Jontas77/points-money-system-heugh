import { useEffect, useState } from "react";
import { getChildById } from "../services/api";
import { Child } from "../types";
import { useAuth } from "../context/useAuth";
import PointHistoryTable from "../components/PointHistoryTable";
import { useNavigate } from "react-router-dom";

const ChildDashboard = () => {
  const { user, logout } = useAuth();
  const [child, setChild] = useState<Child | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchChildData = async () => {
      try {
        const childResponse = await getChildById(user?._id ?? "");
        setChild(childResponse.data);
      } catch (error) {
        console.error("Failed to fetch child data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChildData();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!child) {
  //   return (
  //     <div>
  //       <h3>Failed to load child data</h3>
  //     </div>
  //   );
  // }

  return (
    <div className="child-detail">
      <button
        onClick={() => {
          logout();
          navigate("/auth/login");
        }}
      >
        Logout
      </button>
      <h1>
        {child?.firstName} {child?.lastName}
      </h1>
      <p>
        Points: <strong>{child?.points}</strong>
      </p>
      <p>
        Money: <strong>{`R${child?.money}`}</strong>
      </p>

      <h2>Point History</h2>
      <PointHistoryTable pointHistory={child?.pointHistory ?? []} />
    </div>
  );
};

export default ChildDashboard;
