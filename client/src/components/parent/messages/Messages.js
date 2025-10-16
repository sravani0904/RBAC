import React, { useEffect, useState } from "react";
import { listMessages } from "../../../redux/api";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await listMessages();
        setMessages(res.data || []);
      } catch (e) {
        setError("Failed to load messages");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="flex-[0.8] p-6 space-y-4 overflow-y-auto">
      <h1 className="text-xl font-bold">Messages</h1>
      {loading && <div className="text-gray-500">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && !error && messages.length === 0 && (
        <div className="text-gray-500">No messages yet.</div>
      )}
      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m._id} className="bg-white rounded-lg shadow p-3">
            <div className="text-sm text-gray-500">{new Date(m.createdAt).toLocaleString()}</div>
            <div className="mt-1">{m.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
