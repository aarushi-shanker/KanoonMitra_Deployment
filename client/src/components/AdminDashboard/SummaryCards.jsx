import React from "react";

const SummaryCards = ({ stats }) => {
  const cards = [
    { title: "Total Users", value: stats.totalUsers },
    { title: "Total Lawyers", value: stats.totalLawyers },
    { title: "Appointments", value: stats.totalAppointments },
    { title: "Bot Sessions", value: stats.totalBotSessions },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div key={i} className="bg-white shadow-md rounded-xl p-4 text-center">
          <h3 className="text-lg font-semibold">{card.title}</h3>
          <p className="text-2xl font-bold text-blue-600">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;