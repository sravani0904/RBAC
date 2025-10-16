import React from "react";

const Body = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const p = user?.result || {};
  return (
    <div className="flex-[0.8] p-6 space-y-4">
      <div className="bg-white rounded-xl p-4 shadow">
        <h2 className="text-xl font-semibold mb-2">Profile</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><span className="font-medium">Name:</span> {p.name}</div>
          <div><span className="font-medium">Email:</span> {p.email || '—'}</div>
          <div><span className="font-medium">Contact:</span> {p.contactNumber || '—'}</div>
          <div><span className="font-medium">Address:</span> {p.address || '—'}</div>
          <div><span className="font-medium">Username:</span> {p.username}</div>
        </div>
      </div>
    </div>
  );
};

export default Body;









