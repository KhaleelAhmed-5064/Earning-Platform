"use client";
import { useState, useEffect } from "react";
export default function Page() {
  const [balance, setBalance] = useState(0);
  const [tasks, setTasks] = useState([
    { id: 1, t: "YouTube Video Dekho (30s)", r: 20, d: false },
    { id: 2, t: "Ad par Click Karo", r: 15, d: false },
    { id: 3, t: "App Install Karo", r: 50, d: false },
    { id: 4, t: "Friend ko Share Karo", r: 30, d: false },
    { id: 5, t: "Daily Check-in", r: 10, d: false },
    { id: 6, t: "Survey Complete Karo", r: 80, d: false },
  ]);
  const [show, setShow] = useState(false);
  const [method, setMethod] = useState("Easypaisa");
  const [num, setNum] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => { const b = localStorage.getItem("b"); if (b) setBalance(parseInt(b)); }, []);
  useEffect(() => { localStorage.setItem("b", balance.toString()); }, [balance]);
  const doTask = (id: number) => {
    const x = tasks.find((a) => a.id === id);
    if (!x || x.d) return;
    setTasks(tasks.map((a) => (a.id === id? {...a, d: true } : a)));
    setBalance((b) => b + x.r);
  };
  const wd = () => {
    if (balance < 300 ||!num) return;
    setDone(true); setBalance(0);
    setTasks(tasks.map((a) => ({...a, d: false })));
  };
  return (
    <div className="min-h-screen bg-green-50 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-black text-center mt-4 text-green-800">Pakistan Earning Platform</h1>
        <p className="text-center text-sm text-gray-600">300 PKR par Instant Withdraw</p>
        <div className="bg-white rounded-2xl p-5 mt-6 shadow-lg border-2 border-green-200 text-center">
          <p className="text-gray-500 text-sm">Aapka Balance</p>
          <p className="text-4xl font-black text-green-600">Rs. {balance}</p>
          <div className="w-full bg-gray-200 h-3 rounded-full mt-3 overflow-hidden">
            <div className="bg-green-500 h-3" style={{ width: Math.min(100, (balance / 300) * 100) + "%" }}></div>
          </div>
          <p className="text-xs mt-2">{balance >= 300? "Withdraw ready!" : (300 - balance) + " PKR aur kamao"}</p>
          <button onClick={() => setShow(true)} disabled={balance < 300} className={`w-full mt-4 py-3 rounded-xl font-bold text-white ${balance >= 300? "bg-green-600" : "bg-gray-400"}`}>Withdraw 300 PKR</button>
        </div>
        <div className="mt-6 space-y-3">
          {tasks.map((t) => (
            <div key={t.id} className="bg-white p-4 rounded-xl flex justify-between items-center shadow">
              <div><p className="font-bold text-sm">{t.t}</p><p className="text-xs text-green-600">+ Rs. {t.r}</p></div>
              <button onClick={() => doTask(t.id)} disabled={t.d} className={`px-4 py-1.5 rounded-full text-xs font-bold ${t.d? "bg-gray-200" : "bg-green-600 text-white"}`}>{t.d? "Done" : "Start"}</button>
            </div>
          ))}
        </div>
        {show && (
          <div className="fixed inset-0 bg-black/50 flex items-end justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-6">
              {!done? <>
                <h3 className="font-black text-lg">Withdraw Karein</h3>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => setMethod("Easypaisa")} className={`flex-1 py-2 rounded-xl border font-bold ${method === "Easypaisa"? "bg-green-600 text-white" : "bg-white"}`}>Easypaisa</button>
                  <button onClick={() => setMethod("JazzCash")} className={`flex-1 py-2 rounded-xl border font-bold ${method === "JazzCash"? "bg-red-600 text-white" : "bg-white"}`}>JazzCash</button>
                </div>
                <input value={num} onChange={(e) => setNum(e.target.value)} placeholder="03XX XXXXXXX" className="w-full mt-4 border-2 p-3 rounded-xl" />
                <button onClick={wd} className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl font-bold">Confirm Withdraw</button>
                <button onClick={() => setShow(false)} className="w-full mt-2 text-gray-500">Cancel</button>
              </> : <>
                <div className="text-center py-6">
                  <h3 className="font-black text-xl">Request Send!</h3>
                  <p className="text-sm text-gray-600 mt-2">Rs. 300 aapke {method} {num} par ayega.</p>
                  <button onClick={() => { setShow(false); setDone(false); setNum(""); }} className="w-full mt-6 bg-green-600 text-white py-3 rounded-xl font-bold">OK</button>
                </div>
              </>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}