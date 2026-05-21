import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

/* ─── Floating Cloth SVG Animations ─────────────────────────── */
const FloatingCloths = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
    <svg className="cloth-float absolute -top-10 -left-10 w-64 h-64 opacity-[0.07]" viewBox="0 0 200 200" fill="none">
      <path d="M10,10 Q40,60 20,120 Q0,180 40,200 Q80,180 100,140 Q120,100 90,60 Q60,20 10,10Z" fill="#c9a96e" />
      <path d="M15,15 Q45,65 25,125 Q5,185 45,205 Q85,185 105,145 Q125,105 95,65 Q65,25 15,15Z"
        fill="none" stroke="#c9a96e" strokeWidth="0.8" strokeDasharray="4 3" />
    </svg>
    <svg className="cloth-sway absolute -top-6 right-16 w-48 h-72 opacity-[0.06]" viewBox="0 0 120 220" fill="none">
      <path d="M60,5 C80,20 100,50 90,90 C80,130 110,160 95,200 C85,220 50,215 40,195 C25,165 55,130 45,90 C35,50 20,20 60,5Z" fill="#c9a96e" />
    </svg>
    <svg className="cloth-drift absolute bottom-20 -left-8 w-56 h-48 opacity-[0.06]" viewBox="0 0 180 160" fill="none">
      <path d="M0,80 Q30,40 60,70 Q90,100 120,70 Q150,40 180,70 L180,160 Q150,130 120,160 Q90,190 60,160 Q30,130 0,160Z" fill="#c9a96e" />
    </svg>
    <svg className="cloth-curl absolute bottom-0 right-0 w-72 h-56 opacity-[0.06]" viewBox="0 0 220 180" fill="none">
      <path d="M220,0 Q180,30 200,80 Q220,130 180,160 Q140,180 100,160 Q60,140 80,100 Q100,60 60,40 Q20,20 0,50 L0,180 L220,180Z" fill="#c9a96e" />
    </svg>
    <svg className="cloth-wave absolute top-1/2 -right-4 w-24 h-80 opacity-[0.05]" viewBox="0 0 80 280" fill="none">
      <path d="M40,0 C60,30 20,60 40,90 C60,120 20,150 40,180 C60,210 20,240 40,270 L40,280 L0,280 L0,0Z" fill="#c9a96e" />
    </svg>
    <svg className="cloth-float absolute top-1/3 left-1/4 w-20 h-20 opacity-[0.06]" viewBox="0 0 80 80">
      <circle cx="40" cy="40" r="35" fill="none" stroke="#c9a96e" strokeWidth="1" strokeDasharray="6 4" />
      <circle cx="40" cy="40" r="22" fill="none" stroke="#c9a96e" strokeWidth="0.5" />
    </svg>
    <style>{`
      @keyframes clothFloat { 0%,100%{transform:translateY(0) rotate(0deg)} 33%{transform:translateY(-12px) rotate(2deg)} 66%{transform:translateY(6px) rotate(-1.5deg)} }
      @keyframes clothSway  { 0%,100%{transform:translateX(0) skewY(0)} 40%{transform:translateX(8px) skewY(1.5deg)} 70%{transform:translateX(-6px) skewY(-1deg)} }
      @keyframes clothDrift { 0%,100%{transform:translateY(0) scaleX(1)} 50%{transform:translateY(-8px) scaleX(1.03)} }
      @keyframes clothCurl  { 0%,100%{transform:rotate(0) scale(1)} 50%{transform:rotate(-2deg) scale(1.02)} }
      @keyframes clothWave  { 0%,100%{transform:translateY(0) scaleX(1)} 50%{transform:translateY(10px) scaleX(0.97)} }
      .cloth-float{animation:clothFloat 7s ease-in-out infinite}
      .cloth-sway {animation:clothSway  9s ease-in-out infinite 1s}
      .cloth-drift{animation:clothDrift 8s ease-in-out infinite 0.5s}
      .cloth-curl {animation:clothCurl  10s ease-in-out infinite 2s}
      .cloth-wave {animation:clothWave  6s ease-in-out infinite 1.5s}
      @keyframes slideIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
      .field-animate{animation:slideIn 0.35s ease both}
      @keyframes spin{to{transform:rotate(360deg)}}
      .spinner{width:14px;height:14px;border:2px solid rgba(13,13,13,0.3);border-top-color:#0d0d0d;border-radius:50%;animation:spin 0.7s linear infinite;display:inline-block}
    `}</style>
  </div>
)

/* ─── Eye Icon ───────────────────────────────────────────────── */
const EyeIcon = ({ open }) => open ? (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
) : (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
)

/* ─── Field Error ─────────────────────────────────────────────── */
const FieldError = ({ msg }) =>
  msg ? <p className="mt-1 text-[11px] text-red-400 tracking-wide">{msg}</p> : null

/* ─── Validation helpers ──────────────────────────────────────── */
const validate = ({ currentState, name, email, password }) => {
  const errors = {}

  if (currentState === 'Sign Up') {
    if (!name.trim()) {
      errors.name = 'Full name is required.'
    } else if (name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters.'
    } else if (!/^[a-zA-Z\s'-]+$/.test(name.trim())) {
      errors.name = 'Name can only contain letters, spaces, hyphens, or apostrophes.'
    }
  }

  if (!email.trim()) {
    errors.email = 'Email address is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!password) {
    errors.password = 'Password is required.'
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  } else if (currentState === 'Sign Up') {
    if (!/[A-Z]/.test(password)) errors.password = 'Include at least one uppercase letter.'
    else if (!/[0-9]/.test(password)) errors.password = 'Include at least one number.'
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.password = 'Include at least one special character.'
  }

  return errors
}

/* ─── Password Strength ───────────────────────────────────────── */
const getStrength = (pwd) => {
  if (!pwd) return { score: 0, label: '', color: '' }
  let score = 0
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) score++
  const map = [
    { label: 'Too weak', color: 'bg-red-500' },
    { label: 'Weak', color: 'bg-orange-400' },
    { label: 'Fair', color: 'bg-yellow-400' },
    { label: 'Strong', color: 'bg-emerald-400' },
    { label: 'Very strong', color: 'bg-emerald-500' },
  ]
  return { score, ...map[score] }
}

/* ─── Login Component ─────────────────────────────────────────── */
const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const { token, setToken, navigate, backendURL } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const isLogin = currentState === 'Login'
  const strength = getStrength(password)

  /* Clear errors & fields when switching mode */
  const switchMode = () => {
    setCurrentState(isLogin ? 'Sign Up' : 'Login')
    setErrors({})
    setTouched({})
    setName('')
    setEmail('')
    setPassword('')
    setShowPassword(false)
  }

  /* Inline validation on blur */
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const errs = validate({ currentState, name, email, password })
    setErrors(errs)
  }

  /* Live validation once field is touched */
  useEffect(() => {
    if (Object.keys(touched).length === 0) return
    const errs = validate({ currentState, name, email, password })
    setErrors(errs)
  }, [name, email, password, currentState])

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    // Mark all fields as touched
    setTouched({ name: true, email: true, password: true })
    const errs = validate({ currentState, name, email, password })
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    try {
      if (!isLogin) {
        const res = await axios.post(backendURL + '/api/user/register', { name, email, password })
        if (res.data.success) {
          setToken(res.data.token)
          localStorage.setItem('token', res.data.token)
          toast.success('Account created!')
        } else {
          toast.error(res.data.message)
        }
      } else {
        const res = await axios.post(backendURL + '/api/user/login', { email, password })
        if (res.data.success) {
          setToken(res.data.token)
          localStorage.setItem('token', res.data.token)
          toast.success('Logged In')
        } else {
          toast.error(res.data.message)
        }
      }
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) navigate('/')
  }, [token])

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-4"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      <div className="w-full max-w-[900px] grid grid-cols-1 md:grid-cols-2 min-h-[580px] rounded-[20px] overflow-hidden
        shadow-[0_40px_100px_rgba(0,0,0,0.7),0_0_0_0.5px_rgba(201,169,110,0.15)] relative">

        {/* ── Left Panel ── */}
        <div className="relative flex flex-col justify-end p-10 overflow-hidden min-h-[200px]
          bg-gradient-to-br from-[#1a1410] via-[#0d0d0d] to-[#111008]">
          <img
            className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity"
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80"
            alt=""
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,13,13,0.95)] via-[rgba(13,13,13,0.4)] to-transparent" />
          <FloatingCloths />
          <div className="relative z-10">
            <span className="inline-block text-[10px] font-medium tracking-[0.3em] uppercase text-[#c9a96e] mb-3">
              KNOT Collection
            </span>
            <h1 className="text-[clamp(2rem,4vw,2.8rem)] font-light text-[#f5f0e8] leading-[1.2] mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Wear what{' '}
              <em className="italic text-[#c9a96e]">defines</em>{' '}
              you
            </h1>
            <div className="w-10 h-px bg-[#c9a96e] opacity-50 mb-4" />
            <p className="text-[13px] text-[rgba(232,224,208,0.55)] leading-[1.7] max-w-[260px] hidden md:block">
              Curated fashion for those who understand that elegance is not a style — it's a state of mind.
            </p>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="bg-[#111111] flex flex-col justify-center px-8 py-12 md:px-10">

          {/* Title */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[2rem] font-normal text-[#f5f0e8] tracking-[0.02em]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {currentState}
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-[rgba(201,169,110,0.4)] to-transparent" />
          </div>

          <form onSubmit={onSubmitHandler} noValidate>
            <div className="flex flex-col gap-4 mb-5">

              {/* Name field — Sign Up only */}
              {!isLogin && (
                <div className="field-animate">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      onBlur={() => handleBlur('name')}
                      className={`w-full box-border px-4 py-[14px] rounded-[10px] text-sm text-[#e8e0d0]
                        bg-white/[0.04] outline-none transition-all duration-200
                        placeholder:text-[rgba(232,224,208,0.3)]
                        focus:bg-[rgba(201,169,110,0.04)]
                        ${touched.name && errors.name
                          ? 'border border-red-500/70 focus:border-red-500'
                          : 'border border-[rgba(201,169,110,0.2)] focus:border-[rgba(201,169,110,0.6)]'
                        }`}
                    />
                  </div>
                  <FieldError msg={touched.name && errors.name} />
                </div>
              )}

              {/* Email field */}
              <div>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`w-full box-border px-4 py-[14px] rounded-[10px] text-sm text-[#e8e0d0]
                      bg-white/[0.04] outline-none transition-all duration-200
                      placeholder:text-[rgba(232,224,208,0.3)]
                      focus:bg-[rgba(201,169,110,0.04)]
                      ${touched.email && errors.email
                        ? 'border border-red-500/70 focus:border-red-500'
                        : 'border border-[rgba(201,169,110,0.2)] focus:border-[rgba(201,169,110,0.6)]'
                      }`}
                  />
                </div>
                <FieldError msg={touched.email && errors.email} />
              </div>

              {/* Password field */}
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onBlur={() => handleBlur('password')}
                    className={`w-full box-border pl-4 pr-12 py-[14px] rounded-[10px] text-sm text-[#e8e0d0]
                      bg-white/[0.04] outline-none transition-all duration-200
                      placeholder:text-[rgba(232,224,208,0.3)]
                      focus:bg-[rgba(201,169,110,0.04)]
                      ${touched.password && errors.password
                        ? 'border border-red-500/70 focus:border-red-500'
                        : 'border border-[rgba(201,169,110,0.2)] focus:border-[rgba(201,169,110,0.6)]'
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-0 bg-transparent border-none
                      text-[rgba(201,169,110,0.5)] hover:text-[#c9a96e] transition-colors duration-200 cursor-pointer flex items-center"
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
                <FieldError msg={touched.password && errors.password} />

                {/* Password strength bar — Sign Up only */}
                {!isLogin && password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[0, 1, 2, 3].map(i => (
                        <div key={i}
                          className={`h-[3px] flex-1 rounded-full transition-all duration-300
                            ${i < strength.score ? strength.color : 'bg-white/10'}`}
                        />
                      ))}
                    </div>
                    <p className="text-[11px] text-[rgba(232,224,208,0.45)] tracking-wide">{strength.label}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Forgot password */}
            {isLogin && (
              <div className="flex justify-end -mt-1 mb-2">
                <span className="text-[12px] text-[rgba(201,169,110,0.6)] hover:text-[#c9a96e]
                  cursor-pointer tracking-[0.02em] transition-colors duration-200">
                  Forgot Password?
                </span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-[14px] bg-[#c9a96e] text-[#0d0d0d] rounded-[10px]
                text-[13px] font-medium tracking-[0.12em] uppercase cursor-pointer
                flex items-center justify-center gap-2
                hover:bg-[#d4b87a] active:scale-[0.985]
                disabled:opacity-60 disabled:cursor-not-allowed
                transition-all duration-200"
            >
              {loading && <span className="spinner" />}
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Toggle mode */}
          <p className="text-center mt-6 text-[13px] text-[rgba(232,224,208,0.4)]">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <span
              onClick={switchMode}
              className="text-[#c9a96e] font-medium ml-1 cursor-pointer hover:opacity-75 transition-opacity duration-200"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </span>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Login