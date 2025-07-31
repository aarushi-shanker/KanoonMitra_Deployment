import React from "react";

const SummaryCards = ({ stats }) => {
  // Provide safe fallback values if stats is null or undefined
  const safeStats = stats || {};

  const cards = [
    { title: "Total Users", value: safeStats.totalUsers ?? "-" },
    { title: "Total Lawyers", value: safeStats.totalLawyers ?? "-" },
    { title: "Appointments", value: safeStats.totalAppointments ?? "-" },
    { title: "Bot Sessions", value: safeStats.totalBotSessions ?? "-" },
    { title: "Documents Generated", value: safeStats.totalDocGenerated ?? "-" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-white shadow-md rounded-xl p-4 text-center hover:shadow-lg transition-shadow duration-200"
        >
          <h3 className="text-sm text-gray-500 font-medium mb-1">{card.title}</h3>
          <p className="text-3xl font-bold text-blue-600">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;