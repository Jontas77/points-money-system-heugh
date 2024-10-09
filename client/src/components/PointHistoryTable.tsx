import React from "react";
import "../styles/PointsHistoryTable.css";

interface PointHistoryEntry {
  points: number;
  reason: string;
  date: string;
}

interface PointHistoryTableProps {
  pointHistory: PointHistoryEntry[];
}

const PointHistoryTable: React.FC<PointHistoryTableProps> = ({
  pointHistory,
}) => {
  return (
    <table className="table-container">
      <thead>
        <tr>
          <th>Points</th>
          <th>Reason</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {pointHistory.map((entry, index) => (
          <tr key={index}>
            <td>{entry.points}</td>
            <td>{entry.reason}</td>
            <td>{new Date(entry.date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PointHistoryTable;
