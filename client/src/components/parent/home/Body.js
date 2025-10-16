import React from "react";

const Body = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const p = user?.result;
  return (
    <div className="flex-[0.8] p-6 space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow">
          <h3 className="font-semibold">Children</h3>
          <ul className="list-disc ml-5 mt-2 text-sm">
            {(p?.children || []).length === 0 && <li>No children linked</li>}
            {(p?.children || []).map((c)=> (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <h3 className="font-semibold">Recent Feedback</h3>
          <p className="text-sm mt-2">Use Messages tab to see conversations.</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow">
          <h3 className="font-semibold">Quick Links</h3>
          <ul className="list-disc ml-5 mt-2 text-sm">
            <li>Child Attendance</li>
            <li>Child Results</li>
            <li>Messages</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Body;









