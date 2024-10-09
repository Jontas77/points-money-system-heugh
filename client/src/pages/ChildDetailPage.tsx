import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../services/api";
import { Child } from "../types";
import PointHistoryTable from "../components/PointHistoryTable";
import "../styles/ChildDetailsPage.css";

const ChildDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [child, setChild] = useState<Child | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChild = async () => {
      try {
        const response = await getUserById(id ?? "");
        setChild(response.data);
      } catch (error) {
        console.error("Failed to fetch child", error);
      }
    }

    fetchChild();

  }, [id]);

  if (!child) {
    return <div>Loading...</div>;
  }

  return (
    <div className="child-detail">
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>
      <h1>
        {child?.firstName} {child?.lastName}
      </h1>
      <p>Points: <strong>{child?.points}</strong></p>
      <p>Money: <strong>{`R${child?.money}`}</strong></p>
      {/* <h2>Tasks</h2>
      <ul>
        {child.tasks?.map((task) => (
          <li key={task.id}>{task.description}</li>
        ))}
      </ul> */}
      <h2>Point History</h2>
      <PointHistoryTable pointHistory={child?.pointHistory ?? []} />
    </div>
  );
};

export default ChildDetail;
