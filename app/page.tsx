"use client";
import { useState } from "react";
export default function Page() {
  const [bal, setBal] = useState(0);
  const [done, setDone] = useState<string[]>([]);
  const tasks = [
    { id: "yt", name: "YouTube Video Dekho", rs: 50 },
    { id: "ad", name: "Ads Dekho", rs: 30 },
    { id: "app", name: "App Install Karo", rs: 100 },
    { id: "like", name: "Facebook Like", rs: 20 },
    { id: "survey", name: "Survey Complete", rs: 70 },
    { id: "ref", name: "Friend Invite Karo", rs: 150 },
  ];
  function doTask(id: string, rs: number) {
    if (done.includes(id)) return;
    setDone([...done, id]);
    setBal(bal + rs);
  }
  return (
    <div style={{ minHeight: "100vh", background: "#f0fdf4", padding: "16px" }}>
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <div style={{ background: "white", borderRadius: "16px", padding: "16px" }}>
          <h1 style={{ fontWeight: "bold" }}>Earning Platform</h1>
          <div style={{ background: "#16a34a", color: "white", padding: "12px", borderRadius: "12px", marginTop: "12px" }}>
            <p>Balance</p><h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Rs. {bal}</h2>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          {tasks.map((t) => (
            <div key={t.id} style={{ background: "white", padding: "14px", borderRadius: "12px", marginBottom: "12px", display: "flex", justifyContent: "space-between" }}>
              <div><p style={{ fontWeight: "bold" }}>{t.name}</p><p style={{ fontSize: "12px" }}>Rs.{t.rs}</p></div>
              <button onClick={() => doTask(t.id, t.rs)} style={{ padding: "8px 16px", borderRadius: "8px", border: "none", background: done.includes(t.id) ? "#e5e7eb" : "#16a34a", color: done.includes(t.id) ? "black" : "white" }}>{done.includes(t.id) ? "Done" : "Start"}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}