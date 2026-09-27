import React, { useState, useEffect } from "react";
import {
  Home,
  CheckSquare,
  TrendingUp,
  Wallet,
  MoreHorizontal,
  Sparkles,
  ShieldCheck,
  LogOut,
  Eye,
  EyeOff,
  Smartphone,
  Maximize2,
  Minimize2,
  Terminal,
  User,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Sun,
  Info,
  Lock,
  Compass,
  Activity,
  Trophy,
  PiggyBank,
  BookOpen,
  Shirt,
  Wifi,
  Battery,
} from "lucide-react";

interface StoredUser {
  id: number;
  username: string;
  is_active: boolean;
  created_at: string;
}

type ScreenType = "splash" | "login" | "signup" | "main";
type TabType = "home" | "tasks" | "progress" | "money" | "more";

export default function App() {
  // Mobile Device Emulator state
  const [deviceWidth, setDeviceWidth] = useState<number>(390); // 360, 390, 412
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showArchPanel, setShowArchPanel] = useState<boolean>(false);

  // App navigation state
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("splash");
  const [activeTab, setActiveTab] = useState<TabType>("home");

  // Auth State
  const [user, setUser] = useState<StoredUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Form State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Sub-tabs for Progress, Money, More
  const [progressSegment, setProgressSegment] = useState<"roadmap" | "fitness" | "hackathons">("roadmap");
  const [moneySegment, setMoneySegment] = useState<"finance" | "savings">("finance");
  const [moreSegment, setMoreSegment] = useState<"settings" | "fashion" | "notes">("settings");

  // Health check state
  const [backendStatus, setBackendStatus] = useState<string>("Checking API...");

  // Clock for Android Status Bar
  const [timeStr, setTimeStr] = useState<string>("09:41");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Check health on boot
  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "healthy") {
          setBackendStatus("Connected to AURA API");
        }
      })
      .catch(() => {
        setBackendStatus("Backend local mode");
      });
  }, []);

  // Initial token verification & splash transition
  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem("aura_jwt_token");
      if (savedToken) {
        try {
          const res = await fetch("/api/auth/me", {
            headers: { Authorization: `Bearer ${savedToken}` },
          });
          if (res.ok) {
            const userData = await res.json();
            setUser(userData);
            setToken(savedToken);
            setTimeout(() => {
              setCurrentScreen("main");
            }, 1200);
            return;
          }
        } catch {
          localStorage.removeItem("aura_jwt_token");
        }
      }

      setTimeout(() => {
        setCurrentScreen("login");
      }, 1500);
    };

    checkAuth();
  }, []);

  // Auth Handlers
  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAuthError(null);

    const cleanUsername = username.trim();
    if (!cleanUsername) {
      setAuthError("Please enter your username.");
      return;
    }
    if (!password) {
      setAuthError("Please enter your password.");
      return;
    }

    setAuthLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: cleanUsername, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "Authentication failed.");
      }

      localStorage.setItem("aura_jwt_token", data.access_token);
      setToken(data.access_token);
      setUser(data.user);
      setPassword("");
      setCurrentScreen("main");
    } catch (err: any) {
      setAuthError(err.message || "Failed to sign in.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignup = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAuthError(null);

    const cleanUsername = username.trim();
    if (!cleanUsername) {
      setAuthError("Please enter a username.");
      return;
    }
    if (cleanUsername.length < 3) {
      setAuthError("Username must be at least 3 characters.");
      return;
    }
    if (!password) {
      setAuthError("Please enter a password.");
      return;
    }
    if (password.length < 6) {
      setAuthError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setAuthError("Passwords do not match.");
      return;
    }

    setAuthLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: cleanUsername,
          password,
          confirm_password: confirmPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "Registration failed.");
      }

      localStorage.setItem("aura_jwt_token", data.access_token);
      setToken(data.access_token);
      setUser(data.user);
      setPassword("");
      setConfirmPassword("");
      setCurrentScreen("main");
    } catch (err: any) {
      setAuthError(err.message || "Failed to create account.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("aura_jwt_token");
    setToken(null);
    setUser(null);
    setCurrentScreen("login");
    setActiveTab("home");
  };

  // Date formatting for Home
  const today = new Date();
  const dateFormatted = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col items-center justify-center font-sans antialiased text-[#111827]">
      {/* Top Device & Architecture Control Bar */}
      <header className="w-full max-w-4xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-[#4B5563]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="font-semibold tracking-wider text-[#111827]">AURA</span>
          <span className="text-[#9CA3AF]">|</span>
          <span className="text-[#6B7280]">Personal Operating System • Phase 1 Mobile</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Viewport switchers */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-1 flex items-center shadow-xs">
            <button
              onClick={() => { setDeviceWidth(360); setIsFullscreen(false); }}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                deviceWidth === 360 && !isFullscreen ? "bg-[#111827] text-white" : "text-[#4B5563] hover:text-[#111827]"
              }`}
              title="360px Compact Android"
            >
              360px
            </button>
            <button
              onClick={() => { setDeviceWidth(390); setIsFullscreen(false); }}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                deviceWidth === 390 && !isFullscreen ? "bg-[#111827] text-white" : "text-[#4B5563] hover:text-[#111827]"
              }`}
              title="390px Standard Android"
            >
              390px
            </button>
            <button
              onClick={() => { setDeviceWidth(412); setIsFullscreen(false); }}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                deviceWidth === 412 && !isFullscreen ? "bg-[#111827] text-white" : "text-[#4B5563] hover:text-[#111827]"
              }`}
              title="412px Pixel / Galaxy"
            >
              412px
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className={`p-1 rounded transition-colors ${
                isFullscreen ? "bg-[#111827] text-white" : "text-[#4B5563] hover:text-[#111827]"
              }`}
              title="Toggle Fullscreen Canvas"
            >
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
          </div>

          {/* Architecture & CLI Modal Trigger */}
          <button
            onClick={() => setShowArchPanel(!showArchPanel)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-lg font-medium text-[#111827] shadow-xs transition-colors"
          >
            <Terminal size={14} className="text-[#10B981]" />
            <span>CLI & Specs</span>
          </button>
        </div>
      </header>

      {/* Main Container: Android Mobile Frame or Fullscreen Mobile */}
      <main className="w-full flex items-center justify-center p-2 sm:p-4">
        <div
          style={{
            width: isFullscreen ? "100%" : `${deviceWidth}px`,
            maxWidth: isFullscreen ? "600px" : `${deviceWidth}px`,
            height: isFullscreen ? "94vh" : "844px",
          }}
          className={`relative bg-[#FAFAFA] flex flex-col overflow-hidden transition-all duration-200 ${
            isFullscreen
              ? "rounded-2xl border border-[#E5E7EB] shadow-lg"
              : "rounded-[42px] border-[10px] border-[#1F2937] shadow-2xl ring-1 ring-black/5"
          }`}
        >
          {/* Android Status Bar */}
          <div className="w-full bg-[#FAFAFA] px-6 pt-3 pb-1 flex items-center justify-between text-[11px] font-medium text-[#1F2937] z-20 select-none">
            <span>{timeStr}</span>
            {/* Front Camera cutout for phone shell */}
            {!isFullscreen && (
              <div className="w-4 h-4 rounded-full bg-[#111827] border-2 border-[#1F2937]" />
            )}
            <div className="flex items-center gap-1.5">
              <Wifi size={13} strokeWidth={2.2} />
              <div className="text-[10px] font-semibold text-[#10B981]">5G</div>
              <Battery size={14} strokeWidth={2} />
            </div>
          </div>

          {/* SCREEN CONTENT AREA */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {/* 1. SPLASH SCREEN */}
            {currentScreen === "splash" && (
              <div className="flex-1 flex flex-col items-center justify-between py-16 px-6 bg-[#FAFAFA] select-none animate-fadeIn">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-[#E5E7EB] flex items-center justify-center relative shadow-xs mb-5">
                    <div className="w-7 h-7 rounded-lg border-[1.5px] border-[#111827]" />
                    <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  </div>
                  <h1 className="text-3xl font-bold tracking-[0.25em] text-[#111827] mb-2">AURA</h1>
                  <p className="text-xs tracking-wider text-[#6B7280]">Your Personal Operating System</p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-5 h-5 border-2 border-[#10B981] border-t-transparent rounded-full animate-spin" />
                  <span className="text-[11px] text-[#9CA3AF] font-medium tracking-wide">
                    Initializing Phase 1 System
                  </span>
                </div>
              </div>
            )}

            {/* 2. LOGIN SCREEN */}
            {currentScreen === "login" && (
              <div className="flex-1 flex flex-col justify-center px-6 py-8 overflow-y-auto bg-[#FAFAFA]">
                <div className="flex flex-col items-center mb-8">
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center mb-3 shadow-xs">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  </div>
                  <h2 className="text-xl font-bold tracking-widest text-[#111827]">AURA</h2>
                  <p className="text-xs text-[#6B7280] mt-1">Sign in to your Personal OS</p>
                </div>

                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-xs">
                  <h3 className="text-base font-semibold text-[#111827] mb-1">Welcome back</h3>
                  <p className="text-xs text-[#6B7280] mb-5">Enter your username and password</p>

                  {authError && (
                    <div className="mb-4 p-3 rounded-lg bg-[#FEF2F2] border border-[#FCA5A5] text-[#EF4444] text-xs flex items-start gap-2">
                      <AlertCircle size={15} className="shrink-0 mt-0.5" />
                      <span>{authError}</span>
                    </div>
                  )}

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#374151] mb-1.5">
                        Username
                      </label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value); setAuthError(null); }}
                        placeholder="e.g. surya_cricketer"
                        className="w-full h-11 px-3.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-hidden focus:border-[#10B981] focus:bg-white transition-all"
                        disabled={authLoading}
                        autoCapitalize="none"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-[#374151]">Password</label>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-[11px] font-medium text-[#059669] hover:underline"
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => { setPassword(e.target.value); setAuthError(null); }}
                          placeholder="Enter your password"
                          className="w-full h-11 px-3.5 pr-10 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-hidden focus:border-[#10B981] focus:bg-white transition-all"
                          disabled={authLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-[#9CA3AF] hover:text-[#4B5563]"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={authLoading}
                      className="w-full h-11 mt-2 rounded-lg bg-[#111827] hover:bg-[#1F2937] active:scale-[0.99] text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-xs disabled:opacity-60"
                    >
                      {authLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Sign In</span>
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </form>
                </div>

                <div className="mt-6 text-center">
                  <span className="text-xs text-[#6B7280]">Don't have an account? </span>
                  <button
                    onClick={() => { setAuthError(null); setCurrentScreen("signup"); }}
                    className="text-xs font-semibold text-[#059669] hover:underline"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            )}

            {/* 3. SIGNUP SCREEN */}
            {currentScreen === "signup" && (
              <div className="flex-1 flex flex-col justify-center px-6 py-8 overflow-y-auto bg-[#FAFAFA]">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center mb-3 shadow-xs">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  </div>
                  <h2 className="text-xl font-bold tracking-widest text-[#111827]">AURA</h2>
                  <p className="text-xs text-[#6B7280] mt-1">Create your Personal Operating System</p>
                </div>

                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-xs">
                  <h3 className="text-base font-semibold text-[#111827] mb-1">Create Account</h3>
                  <p className="text-xs text-[#6B7280] mb-4">Username & password authentication only</p>

                  {authError && (
                    <div className="mb-4 p-3 rounded-lg bg-[#FEF2F2] border border-[#FCA5A5] text-[#EF4444] text-xs flex items-start gap-2">
                      <AlertCircle size={15} className="shrink-0 mt-0.5" />
                      <span>{authError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSignup} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#374151] mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value); setAuthError(null); }}
                        placeholder="Choose a username (min 3 chars)"
                        className="w-full h-10 px-3.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-hidden focus:border-[#10B981] focus:bg-white transition-all"
                        disabled={authLoading}
                        autoCapitalize="none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#374151] mb-1">Password</label>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setAuthError(null); }}
                        placeholder="Min 6 characters"
                        className="w-full h-10 px-3.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-hidden focus:border-[#10B981] focus:bg-white transition-all"
                        disabled={authLoading}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#374151] mb-1">
                        Confirm Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); setAuthError(null); }}
                        placeholder="Confirm your password"
                        className="w-full h-10 px-3.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-hidden focus:border-[#10B981] focus:bg-white transition-all"
                        disabled={authLoading}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={authLoading}
                      className="w-full h-11 mt-3 rounded-lg bg-[#059669] hover:bg-[#047857] active:scale-[0.99] text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-xs disabled:opacity-60"
                    >
                      {authLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Create Account</span>
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </form>
                </div>

                <div className="mt-5 text-center">
                  <span className="text-xs text-[#6B7280]">Already have an account? </span>
                  <button
                    onClick={() => { setAuthError(null); setCurrentScreen("login"); }}
                    className="text-xs font-semibold text-[#059669] hover:underline"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            )}

            {/* 4. MAIN APPLICATION (BOTTOM TABS) */}
            {currentScreen === "main" && (
              <div className="flex-1 flex flex-col overflow-hidden bg-[#FAFAFA]">
                {/* Top App Header */}
                <div className="bg-white px-5 py-3 border-b border-[#E5E7EB] flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center shadow-2xs">
                      <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                    </div>
                    <div>
                      <h2 className="text-xs font-bold tracking-widest text-[#111827]">AURA</h2>
                      <p className="text-[10px] text-[#9CA3AF] font-medium">Personal OS</p>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#E5E7EB] hover:bg-[#F9FAFB] text-[11px] font-medium text-[#6B7280] transition-colors"
                    title="Sign Out"
                  >
                    <LogOut size={13} />
                    <span>Exit</span>
                  </button>
                </div>

                {/* Tab Views Scroll Area */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5">
                  {/* TAB 1: HOME (Personal Command Center) */}
                  {activeTab === "home" && (
                    <>
                      {/* Greeting Header */}
                      <div>
                        <p className="text-xs font-medium text-[#6B7280]">{dateFormatted}</p>
                        <h1 className="text-xl font-bold text-[#111827] tracking-tight mt-0.5">
                          Good morning,{" "}
                          <span className="text-[#059669]">{user?.username || "Surya"}</span>
                        </h1>
                      </div>

                      {/* Phase 1 Status Pill */}
                      <div className="flex items-center gap-2 px-3 py-2 bg-[#ECFDF5] border border-[#D1FAE5] rounded-xl text-[#065F46] text-xs font-medium shadow-2xs">
                        <ShieldCheck size={15} className="text-[#059669] shrink-0" />
                        <span>Phase 1 Foundation Active • JWT Authenticated</span>
                      </div>

                      {/* TODAY'S FOCUS */}
                      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-xs">
                        <div className="flex items-center gap-1.5 text-[#059669] text-[11px] font-bold tracking-wider mb-1.5">
                          <Sparkles size={13} />
                          <span>TODAY'S FOCUS</span>
                        </div>
                        <p className="text-sm font-semibold text-[#111827] leading-snug">
                          Complete Python DSA practice & verify AURA Phase 1
                        </p>
                      </div>

                      {/* TODAY'S TASKS PREVIEW */}
                      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-xs">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <CheckSquare size={16} className="text-[#111827]" />
                            <span className="text-xs font-bold tracking-wide text-[#111827]">
                              TODAY'S TASKS
                            </span>
                          </div>
                          <button
                            onClick={() => setActiveTab("tasks")}
                            className="text-xs text-[#059669] font-semibold hover:underline"
                          >
                            Tasks tab
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold text-[#111827]">0 / 0</div>
                            <div className="text-xs text-[#6B7280] mt-0.5">Tasks completed today</div>
                          </div>
                          <div className="px-2.5 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md text-[11px] font-medium text-[#6B7280]">
                            Ready for Phase 2
                          </div>
                        </div>
                      </div>

                      {/* PROGRESS BREAKDOWN */}
                      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-xs">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <TrendingUp size={16} className="text-[#111827]" />
                            <span className="text-xs font-bold tracking-wide text-[#111827]">
                              PROGRESS
                            </span>
                          </div>
                          <button
                            onClick={() => setActiveTab("progress")}
                            className="text-xs text-[#059669] font-semibold hover:underline"
                          >
                            View
                          </button>
                        </div>

                        <div className="grid grid-cols-3 divide-x divide-[#E5E7EB] text-center">
                          <div className="px-2">
                            <span className="text-[11px] text-[#6B7280] block">Fitness</span>
                            <span className="text-base font-bold text-[#111827] mt-0.5 block">0%</span>
                            <span className="text-[10px] text-[#9CA3AF] mt-0.5 block">Phase 4</span>
                          </div>
                          <div className="px-2">
                            <span className="text-[11px] text-[#6B7280] block">AI Roadmap</span>
                            <span className="text-base font-bold text-[#111827] mt-0.5 block">0%</span>
                            <span className="text-[10px] text-[#9CA3AF] mt-0.5 block">Phase 3</span>
                          </div>
                          <div className="px-2">
                            <span className="text-[11px] text-[#6B7280] block">Hackathon</span>
                            <span className="text-base font-bold text-[#111827] mt-0.5 block">0%</span>
                            <span className="text-[10px] text-[#9CA3AF] mt-0.5 block">Phase 7</span>
                          </div>
                        </div>
                      </div>

                      {/* MONEY OVERVIEW */}
                      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-xs">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Wallet size={16} className="text-[#111827]" />
                            <span className="text-xs font-bold tracking-wide text-[#111827]">
                              MONEY
                            </span>
                          </div>
                          <button
                            onClick={() => setActiveTab("money")}
                            className="text-xs text-[#059669] font-semibold hover:underline"
                          >
                            Manage
                          </button>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <span className="text-[11px] text-[#6B7280] block">Income</span>
                            <span className="text-sm font-bold text-[#111827]">₹0</span>
                          </div>
                          <div>
                            <span className="text-[11px] text-[#6B7280] block">Expenses</span>
                            <span className="text-sm font-bold text-[#111827]">₹0</span>
                          </div>
                          <div>
                            <span className="text-[11px] text-[#6B7280] block">Balance</span>
                            <span className="text-sm font-bold text-[#059669]">₹0</span>
                          </div>
                        </div>
                      </div>

                      {/* SAVINGS PREVIEW */}
                      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-xs">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <PiggyBank size={16} className="text-[#111827]" />
                            <span className="text-xs font-bold tracking-wide text-[#111827]">
                              SAVINGS
                            </span>
                          </div>
                          <span className="text-[11px] text-[#9CA3AF]">Phase 6</span>
                        </div>
                        <p className="text-xs text-[#6B7280] leading-relaxed">
                          No active savings targets yet. Target goals and progress will appear once added.
                        </p>
                      </div>

                      {/* RECENT NOTES PREVIEW */}
                      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-xs">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <BookOpen size={16} className="text-[#111827]" />
                            <span className="text-xs font-bold tracking-wide text-[#111827]">
                              RECENT NOTES
                            </span>
                          </div>
                          <button
                            onClick={() => { setActiveTab("more"); setMoreSegment("notes"); }}
                            className="text-xs text-[#059669] font-semibold hover:underline"
                          >
                            Notes
                          </button>
                        </div>
                        <p className="text-xs text-[#6B7280] leading-relaxed">
                          Your thoughts, AI ideas, and memos will be captured in Phase 9.
                        </p>
                      </div>
                    </>
                  )}

                  {/* TAB 2: TASKS */}
                  {activeTab === "tasks" && (
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-xl font-bold text-[#111827]">Task Manager</h2>
                        <p className="text-xs text-[#6B7280] mt-0.5">Scheduled for Phase 2 Implementation</p>
                      </div>

                      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 text-center shadow-xs">
                        <div className="w-12 h-12 mx-auto rounded-xl bg-[#ECFDF5] border border-[#D1FAE5] flex items-center justify-center text-[#059669] mb-3">
                          <CheckSquare size={24} />
                        </div>
                        <h3 className="text-base font-semibold text-[#111827] mb-1">
                          Phase 2: Complete Task Management
                        </h3>
                        <p className="text-xs text-[#6B7280] max-w-sm mx-auto leading-relaxed mb-4">
                          Features scheduled: Task CRUD, Categories (Personal, College, AI, Coding, Hackathon, Fitness, Finance), Priority (Low, Medium, High, Critical), Status (Todo, In Progress, Completed), Due Dates, and Real-time Filters.
                        </p>
                        <div className="inline-block px-3 py-1.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md text-xs font-medium text-[#4B5563]">
                          Waiting for Phase 1 Sign-Off
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: PROGRESS */}
                  {activeTab === "progress" && (
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-xl font-bold text-[#111827]">Progress Center</h2>
                        <p className="text-xs text-[#6B7280] mt-0.5">Fitness • AI Roadmap • Hackathons</p>
                      </div>

                      {/* Segmented Control */}
                      <div className="grid grid-cols-3 bg-[#F3F4F6] p-1 rounded-xl border border-[#E5E7EB]">
                        <button
                          onClick={() => setProgressSegment("roadmap")}
                          className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            progressSegment === "roadmap" ? "bg-white text-[#111827] shadow-xs" : "text-[#6B7280]"
                          }`}
                        >
                          AI Roadmap
                        </button>
                        <button
                          onClick={() => setProgressSegment("fitness")}
                          className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            progressSegment === "fitness" ? "bg-white text-[#111827] shadow-xs" : "text-[#6B7280]"
                          }`}
                        >
                          Fitness
                        </button>
                        <button
                          onClick={() => setProgressSegment("hackathons")}
                          className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            progressSegment === "hackathons" ? "bg-white text-[#111827] shadow-xs" : "text-[#6B7280]"
                          }`}
                        >
                          Hackathons
                        </button>
                      </div>

                      {progressSegment === "roadmap" && (
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 text-center shadow-xs">
                          <div className="w-12 h-12 mx-auto rounded-xl bg-[#ECFDF5] flex items-center justify-center text-[#059669] mb-3">
                            <Compass size={24} />
                          </div>
                          <h3 className="text-base font-semibold text-[#111827] mb-1">
                            AI Engineer Roadmap
                          </h3>
                          <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                            Foundation, Web Dev, Backend, AI Fundamentals, Generative AI (Gemini API, LangChain, Agents, RAG), Advanced AI, and Portfolio Projects (Kural AI, Chuvi AI).
                          </p>
                          <span className="px-3 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md text-xs text-[#6B7280] font-medium">
                            Activation: Phase 3
                          </span>
                        </div>
                      )}

                      {progressSegment === "fitness" && (
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 text-center shadow-xs">
                          <div className="w-12 h-12 mx-auto rounded-xl bg-[#ECFDF5] flex items-center justify-center text-[#059669] mb-3">
                            <Activity size={24} />
                          </div>
                          <h3 className="text-base font-semibold text-[#111827] mb-1">
                            Fitness Tracker
                          </h3>
                          <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                            Deterministic logging for body measurements, workouts, exercises, sets, reps, weight, steps, and water intake.
                          </p>
                          <span className="px-3 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md text-xs text-[#6B7280] font-medium">
                            Activation: Phase 4
                          </span>
                        </div>
                      )}

                      {progressSegment === "hackathons" && (
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 text-center shadow-xs">
                          <div className="w-12 h-12 mx-auto rounded-xl bg-[#ECFDF5] flex items-center justify-center text-[#059669] mb-3">
                            <Trophy size={24} />
                          </div>
                          <h3 className="text-base font-semibold text-[#111827] mb-1">
                            Hackathon Tracker
                          </h3>
                          <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                            23-point preparation checklist, deadlines, MVP architecture, demo readiness, and judge rehearsal workflows.
                          </p>
                          <span className="px-3 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md text-xs text-[#6B7280] font-medium">
                            Activation: Phase 7
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 4: MONEY */}
                  {activeTab === "money" && (
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-xl font-bold text-[#111827]">Money & Finance</h2>
                        <p className="text-xs text-[#6B7280] mt-0.5">Transactions & Savings Goals</p>
                      </div>

                      <div className="grid grid-cols-2 bg-[#F3F4F6] p-1 rounded-xl border border-[#E5E7EB]">
                        <button
                          onClick={() => setMoneySegment("finance")}
                          className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            moneySegment === "finance" ? "bg-white text-[#111827] shadow-xs" : "text-[#6B7280]"
                          }`}
                        >
                          Finance
                        </button>
                        <button
                          onClick={() => setMoneySegment("savings")}
                          className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            moneySegment === "savings" ? "bg-white text-[#111827] shadow-xs" : "text-[#6B7280]"
                          }`}
                        >
                          Savings Goals
                        </button>
                      </div>

                      {moneySegment === "finance" ? (
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 text-center shadow-xs">
                          <div className="w-12 h-12 mx-auto rounded-xl bg-[#ECFDF5] flex items-center justify-center text-[#059669] mb-3">
                            <Wallet size={24} />
                          </div>
                          <h3 className="text-base font-semibold text-[#111827] mb-1">
                            Personal Finance
                          </h3>
                          <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                            Transactions (Income/Expense), category breakdowns (Food, Travel, Education, Projects), and monthly deterministic analytics.
                          </p>
                          <span className="px-3 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md text-xs text-[#6B7280] font-medium">
                            Activation: Phase 5
                          </span>
                        </div>
                      ) : (
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 text-center shadow-xs">
                          <div className="w-12 h-12 mx-auto rounded-xl bg-[#ECFDF5] flex items-center justify-center text-[#059669] mb-3">
                            <PiggyBank size={24} />
                          </div>
                          <h3 className="text-base font-semibold text-[#111827] mb-1">
                            Savings Goals
                          </h3>
                          <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                            Target savings goals (e.g. Laptop ₹80,000), target dates, deposit history, and deterministic progress calculation.
                          </p>
                          <span className="px-3 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md text-xs text-[#6B7280] font-medium">
                            Activation: Phase 6
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 5: MORE */}
                  {activeTab === "more" && (
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-xl font-bold text-[#111827]">More Options</h2>
                        <p className="text-xs text-[#6B7280] mt-0.5">Settings • Wardrobe • Personal Notes</p>
                      </div>

                      <div className="grid grid-cols-3 bg-[#F3F4F6] p-1 rounded-xl border border-[#E5E7EB]">
                        <button
                          onClick={() => setMoreSegment("settings")}
                          className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            moreSegment === "settings" ? "bg-white text-[#111827] shadow-xs" : "text-[#6B7280]"
                          }`}
                        >
                          Settings
                        </button>
                        <button
                          onClick={() => setMoreSegment("fashion")}
                          className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            moreSegment === "fashion" ? "bg-white text-[#111827] shadow-xs" : "text-[#6B7280]"
                          }`}
                        >
                          Wardrobe
                        </button>
                        <button
                          onClick={() => setMoreSegment("notes")}
                          className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            moreSegment === "notes" ? "bg-white text-[#111827] shadow-xs" : "text-[#6B7280]"
                          }`}
                        >
                          Notes
                        </button>
                      </div>

                      {moreSegment === "settings" && (
                        <div className="space-y-3">
                          {/* User Profile Info */}
                          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 flex items-center gap-3 shadow-xs">
                            <div className="w-11 h-11 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center text-[#111827]">
                              <User size={20} />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-[#111827]">
                                {user?.username || "Guest User"}
                              </h4>
                              <p className="text-xs text-[#6B7280]">
                                Authenticated Account #{user?.id || 1}
                              </p>
                            </div>
                          </div>

                          {/* Settings Details */}
                          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 space-y-3 shadow-xs">
                            <div className="text-[11px] font-bold tracking-wider text-[#9CA3AF]">
                              SYSTEM ATTRIBUTES
                            </div>

                            <div className="flex items-center justify-between text-xs py-1">
                              <div className="flex items-center gap-2 text-[#4B5563]">
                                <Info size={15} />
                                <span>Version</span>
                              </div>
                              <span className="font-semibold text-[#111827]">v1.0.0 (Phase 1)</span>
                            </div>

                            <div className="flex items-center justify-between text-xs py-1">
                              <div className="flex items-center gap-2 text-[#4B5563]">
                                <Sun size={15} />
                                <span>Default Theme</span>
                              </div>
                              <span className="font-semibold text-[#111827]">Light System</span>
                            </div>

                            <div className="flex items-center justify-between text-xs py-1">
                              <div className="flex items-center gap-2 text-[#4B5563]">
                                <ShieldCheck size={15} className="text-[#059669]" />
                                <span>Auth Engine</span>
                              </div>
                              <span className="font-semibold text-[#059669]">JWT + Argon2/Bcrypt</span>
                            </div>
                          </div>

                          {/* Sign out */}
                          <button
                            onClick={handleLogout}
                            className="w-full py-3 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] text-[#EF4444] text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#FEE2E2] transition-colors"
                          >
                            <LogOut size={15} />
                            <span>Sign Out of AURA</span>
                          </button>
                        </div>
                      )}

                      {moreSegment === "fashion" && (
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 text-center shadow-xs">
                          <div className="w-12 h-12 mx-auto rounded-xl bg-[#ECFDF5] flex items-center justify-center text-[#059669] mb-3">
                            <Shirt size={24} />
                          </div>
                          <h3 className="text-base font-semibold text-[#111827] mb-1">
                            Wardrobe & Fashion
                          </h3>
                          <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                            Wardrobe items, outfits, and wishlist planning will be created in Phase 8.
                          </p>
                          <span className="px-3 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md text-xs text-[#6B7280] font-medium">
                            Activation: Phase 8
                          </span>
                        </div>
                      )}

                      {moreSegment === "notes" && (
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 text-center shadow-xs">
                          <div className="w-12 h-12 mx-auto rounded-xl bg-[#ECFDF5] flex items-center justify-center text-[#059669] mb-3">
                            <BookOpen size={24} />
                          </div>
                          <h3 className="text-base font-semibold text-[#111827] mb-1">
                            Personal Notes
                          </h3>
                          <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                            Capture AI Ideas, Hackathon Ideas, Project Ideas, tags, and pinned notes scheduled for Phase 9.
                          </p>
                          <span className="px-3 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md text-xs text-[#6B7280] font-medium">
                            Activation: Phase 9
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* MOBILE BOTTOM TAB BAR */}
                <div className="bg-white border-t border-[#E5E7EB] px-2 py-1.5 flex items-center justify-around shrink-0 select-none shadow-xs">
                  <button
                    onClick={() => setActiveTab("home")}
                    className={`flex flex-col items-center py-1 px-3 transition-colors ${
                      activeTab === "home" ? "text-[#111827]" : "text-[#9CA3AF] hover:text-[#4B5563]"
                    }`}
                  >
                    <Home size={19} strokeWidth={activeTab === "home" ? 2.4 : 1.8} />
                    <span className="text-[10px] font-bold tracking-wider mt-1">HOME</span>
                    {activeTab === "home" && <div className="w-1 h-1 rounded-full bg-[#10B981] mt-0.5" />}
                  </button>

                  <button
                    onClick={() => setActiveTab("tasks")}
                    className={`flex flex-col items-center py-1 px-3 transition-colors ${
                      activeTab === "tasks" ? "text-[#111827]" : "text-[#9CA3AF] hover:text-[#4B5563]"
                    }`}
                  >
                    <CheckSquare size={19} strokeWidth={activeTab === "tasks" ? 2.4 : 1.8} />
                    <span className="text-[10px] font-bold tracking-wider mt-1">TASKS</span>
                    {activeTab === "tasks" && <div className="w-1 h-1 rounded-full bg-[#10B981] mt-0.5" />}
                  </button>

                  <button
                    onClick={() => setActiveTab("progress")}
                    className={`flex flex-col items-center py-1 px-3 transition-colors ${
                      activeTab === "progress" ? "text-[#111827]" : "text-[#9CA3AF] hover:text-[#4B5563]"
                    }`}
                  >
                    <TrendingUp size={19} strokeWidth={activeTab === "progress" ? 2.4 : 1.8} />
                    <span className="text-[10px] font-bold tracking-wider mt-1">PROGRESS</span>
                    {activeTab === "progress" && <div className="w-1 h-1 rounded-full bg-[#10B981] mt-0.5" />}
                  </button>

                  <button
                    onClick={() => setActiveTab("money")}
                    className={`flex flex-col items-center py-1 px-3 transition-colors ${
                      activeTab === "money" ? "text-[#111827]" : "text-[#9CA3AF] hover:text-[#4B5563]"
                    }`}
                  >
                    <Wallet size={19} strokeWidth={activeTab === "money" ? 2.4 : 1.8} />
                    <span className="text-[10px] font-bold tracking-wider mt-1">MONEY</span>
                    {activeTab === "money" && <div className="w-1 h-1 rounded-full bg-[#10B981] mt-0.5" />}
                  </button>

                  <button
                    onClick={() => setActiveTab("more")}
                    className={`flex flex-col items-center py-1 px-3 transition-colors ${
                      activeTab === "more" ? "text-[#111827]" : "text-[#9CA3AF] hover:text-[#4B5563]"
                    }`}
                  >
                    <MoreHorizontal size={19} strokeWidth={activeTab === "more" ? 2.4 : 1.8} />
                    <span className="text-[10px] font-bold tracking-wider mt-1">MORE</span>
                    {activeTab === "more" && <div className="w-1 h-1 rounded-full bg-[#10B981] mt-0.5" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Android Navigation Pill */}
          <div className="w-full bg-[#FAFAFA] py-1.5 flex items-center justify-center z-20 select-none">
            <div className="w-32 h-1 bg-[#D1D5DB] rounded-full" />
          </div>
        </div>
      </main>

      {/* Slide-out CLI & Specs Drawer */}
      {showArchPanel && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end backdrop-blur-xs">
          <div className="w-full max-w-md bg-white h-full overflow-y-auto p-6 flex flex-col justify-between shadow-2xl animate-slideLeft">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                <div>
                  <h3 className="text-base font-bold text-[#111827]">Phase 1 Architecture</h3>
                  <p className="text-xs text-[#6B7280]">Expo React Native + FastAPI SQLite</p>
                </div>
                <button
                  onClick={() => setShowArchPanel(false)}
                  className="px-2.5 py-1 text-xs font-semibold rounded bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]"
                >
                  Close
                </button>
              </div>

              {/* API Status Badge */}
              <div className="p-3 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#6B7280] block">API Status</span>
                  <span className="text-xs font-semibold text-[#059669] flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    {backendStatus}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#6B7280] block">Target</span>
                  <span className="text-xs font-semibold text-[#111827]">Android (APK/AAB)</span>
                </div>
              </div>

              {/* Backend Command */}
              <div>
                <h4 className="text-xs font-bold text-[#374151] mb-1.5 flex items-center gap-1.5">
                  <Terminal size={13} className="text-[#059669]" />
                  <span>BACKEND RUN COMMAND</span>
                </h4>
                <div className="bg-[#111827] text-white p-3 rounded-lg text-xs font-mono select-all">
                  <code>
                    cd backend<br />
                    pip install -r requirements.txt<br />
                    uvicorn main:app --reload
                  </code>
                </div>
              </div>

              {/* Mobile Frontend Command */}
              <div>
                <h4 className="text-xs font-bold text-[#374151] mb-1.5 flex items-center gap-1.5">
                  <Smartphone size={13} className="text-[#059669]" />
                  <span>MOBILE FRONTEND (EXPO)</span>
                </h4>
                <div className="bg-[#111827] text-white p-3 rounded-lg text-xs font-mono select-all">
                  <code>
                    npm install<br />
                    npx expo start
                  </code>
                </div>
              </div>

              {/* Auth Verification */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#374151]">ACTIVE AUTH CREDENTIALS</h4>
                <div className="p-3 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Current User:</span>
                    <span className="font-semibold text-[#111827]">{user?.username || "Not signed in"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Account ID:</span>
                    <span className="font-semibold text-[#111827]">{user?.id ? `#${user.id}` : "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">JWT Active:</span>
                    <span className={`font-semibold ${token ? "text-[#059669]" : "text-[#EF4444]"}`}>
                      {token ? "Bearer Valid" : "None"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E7EB] text-center text-xs text-[#9CA3AF]">
              AURA • Your Personal Operating System
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
