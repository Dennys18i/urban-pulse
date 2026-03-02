"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = activeTab === "login" ? "login" : "register";
      const res = await fetch(`https://localhost:7036/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: "User" }),
      });

      if (!res.ok) {
        setError(activeTab === "login" ? "Invalid email or password." : "Email already in use.");
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0a0a0a;
          font-family: 'DM Sans', sans-serif;
        }

        .card {
          width: 100%;
          max-width: 400px;
          padding: 0 36px 32px;
          animation: fadeUp 0.4s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .logo {
          text-align: center;
          margin-bottom: 24px;
        }
        .logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 500;
          color: #fff;
          letter-spacing: -0.5px;
        }
        .logo-dot {
          display: inline-block;
          width: 7px; height: 7px;
          background: #4ade80;
          border-radius: 50%;
          margin-left: 3px;
          vertical-align: middle;
          margin-bottom: 6px;
        }

        .tabs {
          display: flex;
          border-radius: 14px;
          padding: 4px;
          margin-bottom: 28px;
          gap: 4px;
          background: #161616;
        }
        .tab {
          flex: 1;
          padding: 10px;
          border: none;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          background: transparent;
          color: rgba(255,255,255,0.35);
        }
        .tab.active {
          background: #4ade80;
          color: #0a0a0a;
        }

        .field {
          margin-bottom: 12px;
        }
        .field-label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 7px;
        }
        .field-input {
          width: 100%;
          padding: 13px 16px;
          background: #161616;
          border: 1px solid #222;
          border-radius: 12px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s;
        }
        .field-input::placeholder { color: rgba(255,255,255,0.18); }
        .field-input:focus {
          border-color: #4ade80;
        }

        .forgot {
          text-align: right;
          margin-top: 6px;
          margin-bottom: 20px;
        }
        .forgot a {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          transition: color 0.2s;
        }
        .forgot a:hover { color: rgba(255,255,255,0.6); }

        .error-msg {
          font-size: 13px;
          color: #ff6b6b;
          text-align: center;
          margin-bottom: 14px;
          padding: 10px 14px;
          background: rgba(255,107,107,0.08);
          border-radius: 10px;
          border: 1px solid rgba(255,107,107,0.15);
        }

        .btn-primary {
          width: 100%;
          padding: 14px;
          background: #4ade80;
          color: #0a0a0a;
          border: none;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
        }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
        .btn-primary:active { transform: translateY(0); }
        .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0;
        }
        .divider-line {
          flex: 1;
          height: 1px;
          background: #222;
        }
        .divider-text {
          font-size: 12px;
          color: rgba(255,255,255,0.2);
          font-weight: 500;
        }

        .btn-google {
          width: 100%;
          padding: 13px;
          background: #161616;
          border: 1px solid #222;
          border-radius: 12px;
          color: rgba(255,255,255,0.65);
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.2s;
        }
        .btn-google:hover {
          background: #1e1e1e;
          border-color: #333;
          color: #fff;
        }

        .terms {
          text-align: center;
          margin-top: 20px;
          font-size: 11.5px;
          color: rgba(255,255,255,0.18);
          line-height: 1.6;
        }
        .terms a {
          color: rgba(255,255,255,0.3);
          text-decoration: underline;
          text-decoration-color: rgba(255,255,255,0.12);
          text-underline-offset: 2px;
          transition: color 0.2s;
        }
        .terms a:hover { color: rgba(255,255,255,0.55); }
      `}</style>

      <div className="login-root">
        <div className="card">

          {/* Logo */}
          <div className="logo">
            <span className="logo-text">UrbanPulse</span>
            <span className="logo-dot" />
          </div>

          {/* Tabs */}
          <div className="tabs">
            <button
              className={`tab ${activeTab === "login" ? "active" : ""}`}
              onClick={() => setActiveTab("login")}
              type="button"
            >
              Log In
            </button>
            <button
              className={`tab ${activeTab === "signup" ? "active" : ""}`}
              onClick={() => setActiveTab("signup")}
              type="button"
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {activeTab === "signup" && (
              <div className="field">
                <label className="field-label">Full Name</label>
                <input className="field-input" type="text" placeholder="FulStack Fusion" />
              </div>
            )}

            <div className="field">
              <label className="field-label">Email</label>
              <input
                className="field-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label className="field-label">Password</label>
              <input
                className="field-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {activeTab === "login" && (
              <div className="forgot">
                <Link href="/forgot-password">Forgot password?</Link>
              </div>
            )}

            {activeTab === "signup" && <div style={{ marginBottom: "20px" }} />}

            {error && <div className="error-msg">{error}</div>}

            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? "Please wait..." : activeTab === "login" ? "Continue" : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">or</span>
            <div className="divider-line" />
          </div>

          {/* Google */}
          <button className="btn-google" type="button">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Terms */}
          <p className="terms">
            By continuing, you agree to our{" "}
            <Link href="/terms">Terms of Service</Link> and{" "}
            <Link href="/privacy">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </>
  );
}