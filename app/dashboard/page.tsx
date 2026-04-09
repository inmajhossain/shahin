"use client";

import { useState, useEffect } from "react";

interface Submission {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load submissions
  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/contacts");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Loaded submissions:", data); // Debug log
      
      setSubmissions(data);
      setError(null);
    } catch (error) {
      console.error("Error loading submissions:", error);
      setError("Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  // Delete submission
  const deleteSubmission = async (id: string) => {
    console.log("Delete function called with ID:", id);
    
    if (!id) {
      setError("No ID provided for deletion");
      return;
    }

    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Delete response status:", response.status);
      const data = await response.json();
      console.log("Delete response data:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete submission");
      }

      // Remove from UI
      setSubmissions(submissions.filter(sub => sub._id !== id));
      setSuccess("Submission deleted successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Error deleting submission:", error);
      setError(error instanceof Error ? error.message : "Failed to delete submission");
      setTimeout(() => setError(null), 3000);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  if (loading) {
    return (
      <main className="bg-background px-4 py-20 min-h-screen">
        <div className="mx-auto max-w-5xl">
          <div className="flex justify-center items-center py-20">
            <div className="border-primary border-b-2 rounded-full w-12 h-12 animate-spin"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background px-4 py-20 min-h-screen">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-2">
          <h1 className="font-bold text-text-heading text-4xl">Dashboard</h1>
          <button
            onClick={loadSubmissions}
            className="bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-lg text-primary text-sm transition-colors"
          >
            Refresh ↻
          </button>
        </div>
        <p className="mb-10 text-text-muted">
          Contact form submissions ({submissions.length})
        </p>

        {/* Success Message */}
        {success && (
          <div className="bg-green-500/10 mb-6 p-4 border border-green-500/30 rounded-xl text-green-400">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 mb-6 p-4 border border-red-500/30 rounded-xl text-red-400">
            {error}
          </div>
        )}

        {/* Submissions List */}
        {submissions.length === 0 ? (
          <div className="bg-surface p-12 border border-primary/10 rounded-xl text-center">
            <p className="text-text-muted text-lg">No submissions yet.</p>
            <p className="mt-2 text-text-muted/60 text-sm">
              Submissions will appear here once users fill out the contact form.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((sub) => (
              <div
                key={sub._id}
                className="group space-y-3 bg-surface p-6 border border-primary/10 hover:border-primary/30 rounded-xl transition-all"
              >
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-heading text-xl">
                      {sub.name}
                    </h3>
                    <a
                      href={`mailto:${sub.email}`}
                      className="text-primary/70 hover:text-primary text-sm transition-colors"
                    >
                      {sub.email}
                    </a>
                    <div className="mt-1 text-text-muted/50 text-xs">
                      ID: {sub._id}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <time className="text-text-muted text-xs">
                      {new Date(sub.createdAt).toLocaleString()}
                    </time>
                    
                    {/* Direct Delete Button */}
                    <button
                      onClick={() => {
                        console.log("Delete button clicked for ID:", sub._id);
                        if (confirm("Are you sure you want to delete this submission?")) {
                          deleteSubmission(sub._id);
                        }
                      }}
                      className="bg-red-500/10 hover:bg-red-500/20 p-2 rounded-lg text-red-400 transition-all"
                      title="Delete submission"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <p className="mt-1 pt-3 border-primary/10 border-t text-text-muted leading-relaxed">
                  {sub.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}