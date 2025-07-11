"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export const Report = () => {
  const { data: session } = useSession();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ report: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);  
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const esc = (e) => {
      if (e.key === "Escape") setShow(false);
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");
    if (!session?.user?.email) {
      setFeedback("You must be logged in to submit a report.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: session.user.email,
          report: form.report,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");

      setForm({ report: "" });
      setSubmitted(true);     
      setLoading(false);

      setTimeout(() => {
        setShow(false);
        setSubmitted(false);
      }, 2000);

    } catch (err) {
      setFeedback(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-start bottom-20 left-5 fixed z-50">
      <div
        className="Poppins rounded-3xl backdrop-blur-md backdrop-saturate-150 shadow-lg cursor-pointer border border-white/10 relative p-3 text-xs text-white"
        onClick={() => setShow(true)}
      >
        ! report
      </div>

      {show && (
        <div
          onClick={() => setShow(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[25px]"
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-[90%] max-w-md rounded-[30px] bg-white/5 border border-white/10 backdrop-blur-[40px] shadow-[0_20px_40px_rgba(0,0,0,0.25)] px-10 py-12 flex flex-col items-center"
            style={{
              boxShadow:
                "0 20px 40px rgba(0,0,0,0.25), inset 0 0 40px rgba(0, 0, 0, 0.1)",
            }}
          >
              <h2 className="relative text-sm Poppins tracking-tighter text-gray-300 mb-6 select-none">
              ⚠️ Report an Issue
            </h2>

            <form onSubmit={handleSubmit} className="w-full">
              <textarea
                name="report"
                value={form.report}
                onChange={handleChange}
                placeholder="Write your concern here..."
                required
                className="w-full px-4 py-2 bg-transparent border border-white/20 text-white rounded resize-none focus:outline-none mb-4"
                disabled={loading || submitted}
              />

              {feedback && (
                <div
                  className={`text-xs text-center mb-2 ${
                    feedback.startsWith("✅") ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {feedback}
                </div>
              )}

              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  disabled={loading || !form.report.trim() || submitted}
                  className="p-2 flex justify-center Poppins items-center py-2 bg-white text-black rounded hover:bg-white/20 transition"
                >
                  {loading
                    ? "Sending..."
                    : submitted
                    ? "Submitted"
                    : "Submit Report"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
