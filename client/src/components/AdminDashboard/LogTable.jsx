import React from "react";

const LogTable = ({ logs }) => {
  const isMetadataKey = (key) => ["metadata"].includes(key);

  return (
    <div className="bg-white shadow rounded-xl p-4 overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Recent Logs</h2>
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Timestamp</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, idx) => (
            <tr key={idx} className="border-t">
              <td className="px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
              <td className="px-4 py-2">{log.type}</td>
              <td className="px-4 py-2">{log.details.userId || "Unregistered User"}</td>
              <td className="px-4 py-2">
                <div className="space-y-1">
                  {Object.entries(log.details || {})
                    .filter(([key]) => !isMetadataKey(key))
                    .map(([key, value]) => (
                      <div key={key}>
                        <span className="font-medium">{key}:</span>{" "}
                        <span>{JSON.stringify(value)}</span>
                      </div>
                    ))}
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
