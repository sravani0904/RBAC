import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5001";

const FeedbackForm = () => {
  const [parentInput, setParentInput] = useState("");
  const [parents, setParents] = useState([]);
  const [selectedParent, setSelectedParent] = useState("");
  const [message, setMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");
  const [searchError, setSearchError] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/admin/getallparent`, {
          headers: authHeaders,
        });
        let arr = res.data.result || res.data;
        if (!Array.isArray(arr) && Array.isArray(res.data)) arr = res.data;
        setParents(arr || []);
      } catch (e) {
        setParents([]);
      }
    })();
  }, []);

  const resolveParent = (query) => {
    if (!query) return null;
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return (
      parents.find((p) => (p.email || "").toLowerCase() === q || (p.username || "").toLowerCase() === q || (p.name || "").toLowerCase() === q) ||
      parents.find((p) => (p.email || "").toLowerCase().includes(q) || (p.username || "").toLowerCase().includes(q) || (p.name || "").toLowerCase().includes(q)) ||
      null
    );
  };

  const searchParent = (e) => {
    e && e.preventDefault();
    setSubmitStatus("");
    setSearchError("");
    const match = resolveParent(parentInput);
    if (match) {
      setSelectedParent(match._id);
    } else {
      setSelectedParent("");
      setSearchError("Parent not found");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("");
    setSearchError("");

    if (!selectedParent) {
      const match = resolveParent(parentInput);
      if (match) setSelectedParent(match._id);
    }

    if (!selectedParent || !message.trim()) {
      setSubmitStatus("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/api/comm/message/send`,
        { toId: selectedParent, content: message.trim() },
        { headers: authHeaders }
      );
      if (res.data?.success) {
        setSubmitStatus("Feedback sent successfully!");
        setParentInput("");
        setSelectedParent("");
        setMessage("");
      } else {
        setSubmitStatus("Failed to send feedback.");
      }
    } catch (err) {
      setSubmitStatus(err.response?.data?.error || "Error sending feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4 text-center">Send Feedback to Parent</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-medium">Enter Parent Name/Username/Email</label>
          <div className="flex gap-2">
            <input
              className="w-full border rounded p-2 mt-1"
              value={parentInput}
              onChange={(e) => setParentInput(e.target.value)}
              placeholder="parent name, username, or email"
              disabled={loading}
              required
            />
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded mt-1 hover:bg-blue-600"
              onClick={searchParent}
              disabled={loading}
            >
              Search
            </button>
          </div>
          {selectedParent && <div className="text-sm text-green-700 mt-1">Parent selected.</div>}
          {searchError && <span className="text-red-600 text-sm">{searchError}</span>}
        </div>

        <div>
          <label className="font-medium">Message</label>
          <textarea
            className="w-full border rounded p-2 mt-1"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" disabled={loading}>
          Send Feedback
        </button>
        {submitStatus && (
          <div className={`mt-2 text-center ${submitStatus.includes("success") ? "text-green-600" : "text-red-600"}`}>{submitStatus}</div>
        )}
      </form>
    </div>
  );
};

export default FeedbackForm;
