import React from "react";
import { useNavigate } from "react-router-dom";

const SummaryCards = ({ stats }) => {
  const navigate = useNavigate();
  const safeStats = stats || {};

  const cards = [
    {
      title: "Registered Users",
      value: safeStats.totalUsers ?? "-",
      path: "/userList",
    },
    {
      title: "Registered Lawyers",
      value: safeStats.totalLawyers ?? "-",
      path: "/lawyerList",
    },
    {
      title: "Appointments",
      value: safeStats.totalAppointments ?? "-",
    },
    {
      title: "Bot Sessions",
      value: safeStats.totalBotSessions ?? "-",
    },
    {
      title: "Documents Generated",
      value: safeStats.totalDocGenerated ?? "-",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {cards.map((card, i) => {
        const isClickable = !!card.path;

        return (
          <div
            key={i}
            onClick={() => isClickable && navigate(card.path)}
            className={`bg-white shadow-md rounded-xl p-4 text-center transition-shadow duration-200 ${
              isClickable
                ? "hover:shadow-lg cursor-pointer"
                : "cursor-default"
            }`}
          >
            <h3 className="text-sm text-gray-500 font-medium mb-1">{card.title}</h3>
            <p className="text-3xl font-bold text-blue-600">{card.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;