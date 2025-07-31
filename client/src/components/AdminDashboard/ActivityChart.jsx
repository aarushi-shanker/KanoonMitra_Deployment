import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "./UICards.jsx";

const ActivityChart = ({ data }) => {
  return (
    <Card className="shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Weekly Activity Report
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="newUsers"
              stroke="#3b82f6"
              name="New Users"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="appointments"
              stroke="#10b981"
              name="Appointments"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="botSessions"
              stroke="#f59e0b"
              name="Bot Sessions"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="docGenerations"
              stroke="#a91055ff"
              name="Document Generations"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;