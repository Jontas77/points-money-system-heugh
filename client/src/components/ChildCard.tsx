import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Child } from "../types";
import "../styles/ChildCard.css";

interface ChildCardProps {
  child: Child;
//   onCreateTask?: (
//     childId: string,
//     taskDescription: string,
//     taskPoints: number
//   ) => void;
  onUpdatePointsAndMoney: (
    childId: string,
    points: number,
    money: number,
    reason: string
  ) => void;
}

const ChildCard: React.FC<ChildCardProps> = ({
  child,
//   onCreateTask,
  onUpdatePointsAndMoney,
}) => {
//   const [taskDescription, setTaskDescription] = useState("");
//   const [taskPoints, setTaskPoints] = useState<number | string>(0);
  const [points, setPoints] = useState<number | string>(0);
  const [money, setMoney] = useState<number | string>(0);
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

//   const handleCreateTask = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     onCreateTask(child._id, taskDescription, Number(taskPoints));
//     setTaskDescription("");
//     setTaskPoints(0);
//   };

  const handleUpdatePointsAndMoney = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdatePointsAndMoney(child._id, Number(points), Number(money), reason);
    setPoints(0);
    setMoney(0);
    setReason("");
  };

  return (
    <div
      className="child-card"
      onClick={() => navigate(`/child/${child._id}`)}
      style={{
        backgroundColor: "#FFFFFF",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        marginBottom: "16px",
        color: "#000",
        cursor: "pointer",
      }}
    >
      <div style={{ padding: "16px" }}>
        <h2>
          {child.firstName} {child.lastName}
        </h2>
        <p>Points: <strong>{child.points}</strong></p>
        <p>Money: <strong>{`R${child.money}`}</strong></p>
        {/* <ul>
          {child.tasks?.map((task) => (
            <li key={task.id}>{task.description}</li>
          ))}
        </ul>
        <div className="task-form">
            <h4>Tasks</h4>
          <input
            placeholder="Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
          <input
            type="number"
            placeholder="Task Points"
            value={taskPoints === 0 ? "" : taskPoints}
            onChange={(e) =>
              setTaskPoints(e.target.value === "" ? 0 : Number(e.target.value))
            }
            onClick={(e) => e.stopPropagation()}
          />
          <button onClick={handleCreateTask}>Create Task</button>
        </div> */}
        <div className="points-form">
            <h4>Points and Money</h4>
        <input
          type="number"
          placeholder="Points"
          value={points === 0 ? "" : points}
          onChange={(e) =>
            setPoints(e.target.value === "" ? 0 : Number(e.target.value))
          }
          onClick={(e) => e.stopPropagation()}
        />
        <input
          type="number"
          placeholder="Money"
          value={money === 0 ? "" : money}
          onChange={(e) =>
            setMoney(e.target.value === "" ? 0 : Number(e.target.value))
          }
          onClick={(e) => e.stopPropagation()}
        />
        <input
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        />
        <button onClick={handleUpdatePointsAndMoney}>
          Update Points and Money
        </button>
        </div>
      </div>
    </div>
  );
};

export default ChildCard;
