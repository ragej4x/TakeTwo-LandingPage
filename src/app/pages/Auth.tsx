import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import {
  Eye, EyeOff, Mail, Lock, User, ArrowRight,
  CheckCircle2, KeyRound, ShieldCheck, ArrowLeft,
} from "lucide-react";

// ─── Google Icon ──────────────────────────────────────────────────────────────

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.20455C17.64 8.56637 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z" fill="#4285F4"/>
      <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z" fill="#34A853"/>
      <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957275C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z" fill="#FBBC05"/>
      <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335"/>
    </svg>
  );
}

// ─── Shared field ─────────────────────────────────────────────────────────────

function Field({
  label, type = "text", placeholder, value, onChange, icon: Icon, rightEl,
}: {
  label: string; type?: string; placeholder?: string; value: string;
  onChange: (v: string) => void; icon: React.ElementType; rightEl?: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-10 py-3 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all placeholder:text-neutral-300"
        />
        {rightEl && <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightEl}</div>}
      </div>
    </div>
  );
}

// ─── 4-digit OTP input ────────────────────────────────────────────────────────

function OtpInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[i] && i > 0) refs[i - 1].current?.focus();
  };

  const handleChange = (i: number, raw: string) => {
    const digit = raw.replace(/\D/g, "").slice(-1);
    const next = [...value];
    next[i] = digit;
    onChange(next);
    if (digit && i < 3) refs[i + 1].current?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4).split("");
    const next = ["", "", "", ""];
    digits.forEach((d, i) => { next[i] = d; });
    onChange(next);
    refs[Math.min(digits.length, 3)].current?.focus();
  };

  return (
    <div className="flex gap-3 justify-center">
      {refs.map((ref, i) => (
        <input
          key={i}
          ref={ref}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i]}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKey(i, e)}
          onPaste={handlePaste}
          className="w-14 h-14 text-center text-2xl font-bold bg-neutral-50 border-2 border-neutral-200 rounded-2xl focus:outline-none focus:border-neutral-900 focus:bg-white transition-all"
        />
      ))}
    </div>
  );
}

// ─── Password toggle helper ───────────────────────────────────────────────────

function TogglePass({ show, onToggle }: { show: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle} className="text-neutral-400 hover:text-neutral-600 transition-colors">
      {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-neutral-100" />
      <span className="text-xs text-neutral-400">or</span>
      <div className="flex-1 h-px bg-neutral-100" />
    </div>
  );
}

// ─── Forgot Password flow ─────────────────────────────────────────────────────

type ForgotStep = "email" | "code" | "newpass" | "done";

function ForgotPassword({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<ForgotStep>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const sendCode = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("code"); setResendTimer(30); }, 1200);
  };

  const verifyCode = () => {
    const code = otp.join("");
    if (code !== "1234") { setOtpError(true); return; } // mock: correct code is 1234
    setOtpError(false);
    setStep("newpass");
  };

  const savePass = () => {
    if (newPass !== confirmPass || newPass.length < 8) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("done"); }, 1200);
  };

  return (
    <AnimatePresence mode="wait">
      {step === "email" && (
        <motion.div key="fp-email" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}>
          <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-700 mb-6 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to sign in
          </button>
          <div className="mb-7">
            <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center mb-4">
              <KeyRound className="w-5 h-5 text-neutral-600" />
            </div>
            <h2 className="text-2xl font-semibold text-neutral-900">Forgot password?</h2>
            <p className="text-sm text-neutral-500 mt-1">{"We'll send a 4-digit reset code to your email."}</p>
          </div>
          <div className="space-y-4">
            <Field label="Email" type="email" placeholder="you@email.com" value={email} onChange={setEmail} icon={Mail} />
            <button onClick={sendCode} disabled={!email || loading}
              className="w-full py-3 bg-neutral-900 text-white text-sm font-semibold rounded-xl hover:bg-neutral-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Send Reset Code <ArrowRight className="w-4 h-4" /></>}
            </button>
          </div>
        </motion.div>
      )}

      {step === "code" && (
        <motion.div key="fp-code" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}>
          <button onClick={() => setStep("email")} className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-700 mb-6 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <div className="mb-7">
            <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-neutral-600" />
            </div>
            <h2 className="text-2xl font-semibold text-neutral-900">Enter reset code</h2>
            <p className="text-sm text-neutral-500 mt-1">
              We sent a 4-digit code to <span className="font-medium text-neutral-700">{email}</span>
            </p>
          </div>
          <div className="space-y-5">
            <OtpInput value={otp} onChange={(v) => { setOtp(v); setOtpError(false); }} />
            <AnimatePresence>
              {otpError && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="text-xs text-red-500 text-center">
                  Incorrect code. Please try again.
                </motion.p>
              )}
            </AnimatePresence>
            <button onClick={verifyCode} disabled={otp.join("").length < 4}
              className="w-full py-3 bg-neutral-900 text-white text-sm font-semibold rounded-xl hover:bg-neutral-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
              Verify Code <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-center text-xs text-neutral-400">
              {"Didn't receive it? "}
              {resendTimer > 0
                ? <span className="text-neutral-400">Resend in {resendTimer}s</span>
                : <button onClick={() => { setResendTimer(30); }} className="text-neutral-700 font-semibold hover:underline">Resend code</button>
              }
            </p>
          </div>
        </motion.div>
      )}

      {step === "newpass" && (
        <motion.div key="fp-newpass" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}>
          <div className="mb-7">
            <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center mb-4">
              <Lock className="w-5 h-5 text-neutral-600" />
            </div>
            <h2 className="text-2xl font-semibold text-neutral-900">New password</h2>
            <p className="text-sm text-neutral-500 mt-1">Choose a strong password for your account.</p>
          </div>
          <div className="space-y-4">
            <Field label="New Password" type={showNew ? "text" : "password"} placeholder="Min. 8 characters"
              value={newPass} onChange={setNewPass} icon={Lock} rightEl={<TogglePass show={showNew} onToggle={() => setShowNew(!showNew)} />} />
            <Field label="Confirm Password" type={showConfirm ? "text" : "password"} placeholder="Repeat password"
              value={confirmPass} onChange={setConfirmPass} icon={Lock} rightEl={<TogglePass show={showConfirm} onToggle={() => setShowConfirm(!showConfirm)} />} />
            {confirmPass && newPass !== confirmPass && (
              <p className="text-xs text-red-500">Passwords do not match.</p>
            )}
            <button onClick={savePass} disabled={loading || newPass.length < 8 || newPass !== confirmPass}
              className="w-full py-3 bg-neutral-900 text-white text-sm font-semibold rounded-xl hover:bg-neutral-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Save Password <ArrowRight className="w-4 h-4" /></>}
            </button>
          </div>
        </motion.div>
      )}

      {step === "done" && (
        <motion.div key="fp-done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-8 gap-4">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-neutral-900">Password reset!</h3>
            <p className="text-sm text-neutral-500 mt-1">Your password has been updated successfully.</p>
          </div>
          <button onClick={onBack}
            className="mt-2 px-6 py-2.5 bg-neutral-900 text-white text-sm font-semibold rounded-xl hover:bg-neutral-700 transition-colors">
            Back to sign in
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Login Form ───────────────────────────────────────────────────────────────

function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgot, setForgot] = useState(false);

  if (forgot) return <ForgotPassword onBack={() => setForgot(false)} />;

  return (
    <motion.div key="login" initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }} transition={{ duration: 0.28 }}>
      <div className="mb-7">
        <h2 className="text-2xl font-semibold text-neutral-900">Welcome back</h2>
        <p className="text-sm text-neutral-500 mt-1">Sign in to your TAKETWO account</p>
      </div>

      <button className="w-full flex items-center justify-center gap-3 py-3 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors">
        <GoogleIcon /> Continue with Google
      </button>
      <Divider />

      <form onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => setLoading(false), 1500); }} className="space-y-4">
        <Field label="Email" type="email" placeholder="you@email.com" value={email} onChange={setEmail} icon={Mail} />
        <Field label="Password" type={showPass ? "text" : "password"} placeholder="••••••••" value={password} onChange={setPassword} icon={Lock}
          rightEl={<TogglePass show={showPass} onToggle={() => setShowPass(!showPass)} />} />
        <div className="flex justify-end">
          <button type="button" onClick={() => setForgot(true)} className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors">
            Forgot password?
          </button>
        </div>
        <button type="submit" disabled={loading}
          className="w-full py-3 bg-neutral-900 text-white text-sm font-semibold rounded-xl hover:bg-neutral-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60">
          {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
        </button>
      </form>

      <p className="text-center text-sm text-neutral-500 mt-6">
        {"Don't have an account? "}
        <button onClick={onSwitch} className="font-semibold text-neutral-900 hover:underline">Create one</button>
      </p>
    </motion.div>
  );
}

// ─── Register Form ────────────────────────────────────────────────────────────

type RegisterStep = "form" | "verify" | "done";

function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const [regStep, setRegStep] = useState<RegisterStep>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const passMismatch = confirmPass.length > 0 && password !== confirmPass;

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPass || password.length < 8) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setRegStep("verify"); setResendTimer(30); }, 1400);
  };

  const verifyEmail = () => {
    const code = otp.join("");
    if (code !== "1234") { setOtpError(true); return; } // mock: correct code is 1234
    setOtpError(false);
    setLoading(true);
    setTimeout(() => { setLoading(false); setRegStep("done"); }, 1000);
  };

  return (
    <AnimatePresence mode="wait">
      {regStep === "form" && (
        <motion.div key="reg-form" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.28 }}>
          <div className="mb-7">
            <h2 className="text-2xl font-semibold text-neutral-900">Create account</h2>
            <p className="text-sm text-neutral-500 mt-1">Join TAKETWO and keep your sneakers fresh</p>
          </div>

          <button className="w-full flex items-center justify-center gap-3 py-3 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors">
            <GoogleIcon /> Continue with Google
          </button>
          <Divider />

          <form onSubmit={submitForm} className="space-y-4">
            <Field label="Full Name" placeholder="Juan dela Cruz" value={name} onChange={setName} icon={User} />
            <Field label="Email" type="email" placeholder="you@email.com" value={email} onChange={setEmail} icon={Mail} />
            <Field label="Password" type={showPass ? "text" : "password"} placeholder="Min. 8 characters"
              value={password} onChange={setPassword} icon={Lock}
              rightEl={<TogglePass show={showPass} onToggle={() => setShowPass(!showPass)} />} />
            <Field label="Confirm Password" type={showConfirm ? "text" : "password"} placeholder="Repeat password"
              value={confirmPass} onChange={setConfirmPass} icon={Lock}
              rightEl={<TogglePass show={showConfirm} onToggle={() => setShowConfirm(!showConfirm)} />} />
            {passMismatch && <p className="text-xs text-red-500 -mt-1">Passwords do not match.</p>}

            <p className="text-[11px] text-neutral-400 leading-relaxed">
              By creating an account you agree to our{" "}
              <span className="underline cursor-pointer">Terms of Service</span> and{" "}
              <span className="underline cursor-pointer">Privacy Policy</span>.
            </p>

            <button type="submit" disabled={loading || passMismatch || password.length < 8}
              className="w-full py-3 bg-neutral-900 text-white text-sm font-semibold rounded-xl hover:bg-neutral-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60">
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="text-center text-sm text-neutral-500 mt-6">
            Already have an account?{" "}
            <button onClick={onSwitch} className="font-semibold text-neutral-900 hover:underline">Sign in</button>
          </p>
        </motion.div>
      )}

      {regStep === "verify" && (
        <motion.div key="reg-verify" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.22 }}>
          <button onClick={() => setRegStep("form")} className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-700 mb-6 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <div className="mb-7">
            <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center mb-4">
              <Mail className="w-5 h-5 text-neutral-600" />
            </div>
            <h2 className="text-2xl font-semibold text-neutral-900">Verify your email</h2>
            <p className="text-sm text-neutral-500 mt-1">
              We sent a 4-digit code to <span className="font-medium text-neutral-700">{email}</span>
            </p>
          </div>

          <div className="space-y-5">
            <OtpInput value={otp} onChange={(v) => { setOtp(v); setOtpError(false); }} />
            <AnimatePresence>
              {otpError && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="text-xs text-red-500 text-center">
                  Incorrect code. Please try again. <span className="text-neutral-400">(hint: 1234)</span>
                </motion.p>
              )}
            </AnimatePresence>
            <button onClick={verifyEmail} disabled={otp.join("").length < 4 || loading}
              className="w-full py-3 bg-neutral-900 text-white text-sm font-semibold rounded-xl hover:bg-neutral-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Verify Email <ArrowRight className="w-4 h-4" /></>}
            </button>
            <p className="text-center text-xs text-neutral-400">
              {"Didn't receive it? "}
              {resendTimer > 0
                ? <span>Resend in {resendTimer}s</span>
                : <button onClick={() => setResendTimer(30)} className="text-neutral-700 font-semibold hover:underline">Resend code</button>
              }
            </p>
          </div>
        </motion.div>
      )}

      {regStep === "done" && (
        <motion.div key="reg-done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-8 gap-4">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-neutral-900">Account created!</h3>
            <p className="text-sm text-neutral-500 mt-1">Welcome to TAKETWO, {name.split(" ")[0]}.</p>
          </div>
          <button onClick={onSwitch}
            className="mt-2 px-6 py-2.5 bg-neutral-900 text-white text-sm font-semibold rounded-xl hover:bg-neutral-700 transition-colors">
            Sign in now
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Animated left panel ──────────────────────────────────────────────────────

const SNEAKER_CARDS = [
  { label: "Deep Clean", sub: "Nike Air Force 1", color: "bg-white", dot: "bg-cyan-400" },
  { label: "Restoration", sub: "Jordan 1 Retro", color: "bg-white", dot: "bg-orange-400" },
  { label: "Sole Whitening", sub: "Adidas Ultraboost", color: "bg-white", dot: "bg-purple-400" },
  { label: "Waterproofing", sub: "New Balance 990", color: "bg-white", dot: "bg-emerald-400" },
];

const STEPS_ANIM = ["Received", "Assessment", "Cleaning", "Drying", "Ready"];

function LeftPanel() {
  const [activeStep, setActiveStep] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [floatY, setFloatY] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => setActiveStep((s) => (s + 1) % STEPS_ANIM.length), 1400);
    const cardInterval = setInterval(() => setCardIndex((s) => (s + 1) % SNEAKER_CARDS.length), 3500);
    return () => { clearInterval(stepInterval); clearInterval(cardInterval); };
  }, []);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const t = (ts - start) / 1000;
      setFloatY(Math.sin(t * 0.8) * 8);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const card = SNEAKER_CARDS[cardIndex];

  return (
    <div className="hidden lg:flex flex-col justify-between w-[45%] bg-neutral-900 p-12 relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

      {/* Animated blobs */}
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.1, 0.06] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-white rounded-full" />
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.08, 0.04] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -top-24 -right-24 w-80 h-80 bg-white rounded-full" />
      <motion.div animate={{ x: [-10, 10, -10], y: [-8, 8, -8] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/3 rounded-full blur-3xl" />

      {/* Logo */}
      <Link to="/" className="relative z-10">
        <div className="text-2xl tracking-tight text-white">
          <span className="font-light">TAKE</span>
          <span className="font-semibold">TWO</span>
        </div>
      </Link>

      {/* Center content */}
      <div className="relative z-10 space-y-8">
        {/* Floating service card */}
        <div className="relative" style={{ transform: `translateY(${floatY}px)`, transition: "transform 0.1s linear" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={cardIndex}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-2.5 h-2.5 rounded-full ${card.dot} animate-pulse`} />
                <span className="text-white/60 text-xs font-medium uppercase tracking-wider">Active Job</span>
              </div>
              <p className="text-white text-lg font-semibold">{card.label}</p>
              <p className="text-white/50 text-sm mt-0.5">{card.sub}</p>

              {/* Mini progress */}
              <div className="mt-4 flex items-center gap-1.5">
                {STEPS_ANIM.map((s, i) => (
                  <div key={s} className="flex items-center gap-1.5 flex-1 last:flex-none">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-none transition-all duration-500
                      ${i <= activeStep ? "bg-white" : "bg-white/15"}`}>
                      {i < activeStep && <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900" />}
                      {i === activeStep && <div className="w-2 h-2 rounded-full bg-neutral-900 animate-pulse" />}
                    </div>
                    {i < STEPS_ANIM.length - 1 && (
                      <div className={`h-0.5 flex-1 transition-all duration-700 ${i < activeStep ? "bg-white" : "bg-white/15"}`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-1.5">
                {STEPS_ANIM.map((s, i) => (
                  <span key={s} className={`text-[9px] transition-colors duration-500 ${i <= activeStep ? "text-white/70" : "text-white/25"}`}>{s}</span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-3"
        >
          {[["2,400+", "Pairs Cleaned"], ["4.9★", "Rating"], ["3", "Branches"]].map(([val, lbl]) => (
            <div key={lbl} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <p className="text-white font-bold text-base">{val}</p>
              <p className="text-white/40 text-[10px] mt-0.5">{lbl}</p>
            </div>
          ))}
        </motion.div>

        {/* Tagline */}
        <div className="space-y-3">
          <blockquote className="text-2xl font-light text-white leading-snug">
            "Your sneakers deserve<br />a second life."
          </blockquote>
          <div className="flex flex-wrap gap-2">
            {["Deep Clean", "Restoration", "Waterproofing"].map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 bg-white/10 text-white/60 rounded-full border border-white/10">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-white/25 relative z-10">© 2026 TAKETWO. All rights reserved.</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function Auth() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <LeftPanel />

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 overflow-y-auto">
        <Link to="/" className="lg:hidden mb-10">
          <div className="text-2xl tracking-tight text-neutral-900">
            <span className="font-light">TAKE</span>
            <span className="font-semibold">TWO</span>
          </div>
        </Link>

        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {mode === "login"
              ? <LoginForm key="login" onSwitch={() => setMode("register")} />
              : <RegisterForm key="register" onSwitch={() => setMode("login")} />
            }
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
