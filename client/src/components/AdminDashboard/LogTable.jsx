import React from "react";

const LogTable = ({ logs }) => {
  const isMetadataKey = (key) => ["userId", "metadata"].includes(key);

  return (
    <div className="bg-white shadow rounded-xl p-4 overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Recent Logs</h2>
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Timestamp</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">Event Details</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, idx) => (
            <tr key={idx} className="border-t">
              <td className="px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
              <td className="px-4 py-2">{log.eventType}</td>
              <td className="px-4 py-2">{log.details.userId || "Unregistered User"}</td>
              <td className="px-4 py-2">
                <div className="space-y-1">
                  {Object.entries(log.details || {})
                    .filter(([key]) => !isMetadataKey(key)).length > 0 ? (
                    Object.entries(log.details || {})
                      .filter(([key]) => !isMetadataKey(key))
                      .map(([key, value]) => (
                        <div key={key}>
                          <span className="font-medium">{key}:</span>{" "}
                          <span>{JSON.stringify(value)}</span>
                        </div>
                      ))
                  ) : (
                    <div className="text-gray-500 italic">Event details not Present</div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogTable;
