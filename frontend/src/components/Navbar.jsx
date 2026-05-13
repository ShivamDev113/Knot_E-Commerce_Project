import React, { useContext, useState, useRef, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { gsap } from 'gsap'

const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Collection', to: '/collections' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
]

const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const { setshowSearch, getCartCount, navigate, token, setToken, setcart } =
        useContext(ShopContext)

    const navbarRef = useRef(null)
    const logoRef = useRef(null)
    const linksRef = useRef(null)
    const actionsRef = useRef(null)
    const sidebarRef = useRef(null)
    const overlayRef = useRef(null)

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setcart({})
    }

    // ── GSAP: Page-load navbar entrance ─────────────────────────────
    // Logo, nav links, and action icons stagger in from the top
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

            tl.fromTo(
                navbarRef.current,
                { y: -60, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7 }
            )
                .fromTo(
                    logoRef.current,
                    { opacity: 0, x: -16 },
                    { opacity: 1, x: 0, duration: 0.5 },
                    '-=0.4'
                )
                .fromTo(
                    '.nav-link-item',
                    { opacity: 0, y: -10 },
                    { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 },
                    '-=0.3'
                )
                .fromTo(
                    '.nav-action',
                    { opacity: 0, scale: 0.8 },
                    { opacity: 1, scale: 1, duration: 0.4, stagger: 0.07 },
                    '-=0.3'
                )
        }, navbarRef)

        return () => ctx.revert()
    }, [])

    // ── GSAP: Sidebar slide-in / slide-out ──────────────────────────
    useEffect(() => {
        if (visible) {
            // Slide sidebar in from right + fade overlay
            gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: 'block' })
            gsap.fromTo(
                sidebarRef.current,
                { x: '100%' },
                { x: '0%', duration: 0.45, ease: 'power3.out' }
            )
            // Stagger mobile nav links after sidebar opens
            gsap.fromTo(
                '.mobile-link',
                { opacity: 0, x: 30 },
                {
                    opacity: 1, x: 0, duration: 0.4, stagger: 0.07,
                    ease: 'power3.out', delay: 0.25
                }
            )
        } else {
            // Slide sidebar out + fade overlay
            gsap.to(overlayRef.current, {
                opacity: 0, duration: 0.25,
                onComplete: () => { overlayRef.current.style.display = 'none' }
            })
            gsap.to(sidebarRef.current, { x: '100%', duration: 0.35, ease: 'power3.in' })
        }
    }, [visible])

    return (
        <>
            {/* ── Main Navbar ─────────────────────────────────────────── */}
            <nav
                ref={navbarRef}
                className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md
                   border-b border-gray-100
                   flex items-center justify-between
                   px-5 sm:px-8 lg:px-12 py-3.5"
            >
                {/* Logo */}
                <Link ref={logoRef} to="/">
                    <img
                        src={assets.logo}
                        className="w-20 lg:w-24 object-contain"
                        alt="Logo"
                    />
                </Link>

                {/* Desktop Nav Links */}
                <ul
                    ref={linksRef}
                    className="hidden sm:flex items-center gap-8"
                >
                    {navLinks.map(({ label, to }) => (
                        <li key={to} className="nav-link-item">
                            <NavLink
                                to={to}
                                className={({ isActive }) =>
                                    `text-xs font-semibold tracking-widest uppercase
                   transition-colors duration-200
                   ${isActive
                                        ? 'text-black'
                                        : 'text-gray-400 hover:text-gray-900'}`
                                }
                            >
                                {({ isActive }) => (
                                    <span className="relative pb-0.5">
                                        {label}
                                        {/* Active underline */}
                                        <span
                                            className={`absolute -bottom-0.5 left-0 h-px bg-black
                                  transition-all duration-300
                                  ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                                        />
                                    </span>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Actions */}
                <div ref={actionsRef} className="flex items-center gap-5">

                    {/* Search */}
                    <button
                        onClick={() => { setshowSearch(true); navigate('/collections') }}
                        className="nav-action w-8 h-8 flex items-center justify-center
                         rounded-full hover:bg-gray-100
                         transition-colors duration-200 cursor-pointer"
                        aria-label="Search"
                    >
                        <img src={assets.search_icon} alt="Search" className="w-4.5" />
                    </button>

                    {/* Profile dropdown */}
                    <div className="nav-action group relative">
                        <button
                            onClick={() => { if (!token) navigate('/login') }}
                            className="w-8 h-8 flex items-center justify-center
                           rounded-full hover:bg-gray-100
                           transition-colors duration-200 cursor-pointer"
                            aria-label="Account"
                        >
                            <img src={assets.profile_icon} alt="Account" className="w-4.5" />
                        </button>

                        {token && (
                            <div
                                className="hidden group-hover:block absolute right-0 top-full pt-3 z-50"
                            >
                                <div
                                    className="w-40 bg-white border border-gray-100
                               rounded-xl shadow-lg overflow-hidden py-1"
                                >
                                    <button
                                        onClick={() => navigate('/orders')}
                                        className="w-full text-left px-4 py-2.5 text-sm text-gray-600
                                 hover:bg-gray-50 hover:text-black transition-colors duration-150"
                                    >
                                        My Orders
                                    </button>
                                    <div className="h-px bg-gray-100 mx-3" />
                                    <button
                                        onClick={logout}
                                        className="w-full text-left px-4 py-2.5 text-sm text-gray-600
                                 hover:bg-gray-50 hover:text-black transition-colors duration-150"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Cart */}
                    <Link
                        to="/cart"
                        className="nav-action relative w-8 h-8 flex items-center
                          justify-center rounded-full hover:bg-gray-100
                          transition-colors duration-200"
                        aria-label="Cart"
                    >
                        <img src={assets.cart_icon} alt="Cart" className="w-4.5" />
                        {getCartCount() > 0 && (
                            <span
                                className="absolute -top-1 -right-1 min-w-[18px] h-[18px]
                             flex items-center justify-center
                             bg-black text-white text-[9px] font-bold
                             rounded-full px-1"
                            >
                                {getCartCount()}
                            </span>
                        )}
                    </Link>

                    {/* Hamburger — mobile only */}
                    <button
                        onClick={() => setVisible(true)}
                        className="nav-action sm:hidden w-8 h-8 flex items-center
                         justify-center rounded-full hover:bg-gray-100
                         transition-colors duration-200 cursor-pointer"
                        aria-label="Open menu"
                    >
                        <img src={assets.menu_icon} alt="Menu" className="w-4.5" />
                    </button>
                </div>
            </nav>

            {/* ── Backdrop overlay ───────────────────────────────────────── */}
            <div
                ref={overlayRef}
                onClick={() => setVisible(false)}
                style={{ display: 'none', opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            />

            {/* ── Mobile Sidebar ──────────────────────────────────────────── */}
            <div
                ref={sidebarRef}
                style={{ transform: 'translateX(100%)' }}
                className="fixed top-0 right-0 h-full w-72 z-50
                   bg-white shadow-2xl flex flex-col"
            >
                {/* Sidebar Header */}
                <div
                    className="flex items-center justify-between px-6 py-5
                       border-b border-gray-100"
                >
                    <img src={assets.logo} alt="Logo" className="w-16" />
                    <button
                        onClick={() => setVisible(false)}
                        className="w-8 h-8 flex items-center justify-center
                         rounded-full bg-gray-100 hover:bg-gray-200
                         transition-colors duration-200"
                        aria-label="Close menu"
                    >
                        {/* X icon */}
                        <svg width="14" height="14" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Sidebar Links */}
                <nav className="flex flex-col gap-1 px-4 pt-6 flex-1">
                    {navLinks.map(({ label, to }) => (
                        <NavLink
                            key={to}
                            to={to}
                            onClick={() => setVisible(false)}
                            className={({ isActive }) =>
                                `mobile-link flex items-center gap-3 px-4 py-3.5 rounded-xl
                 text-sm font-semibold tracking-widest uppercase
                 transition-all duration-200
                 ${isActive
                                    ? 'bg-black text-white'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-black'}`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {/* Sidebar Footer */}
                <div className="px-6 py-6 border-t border-gray-100">
                    {token ? (
                        <button
                            onClick={() => { logout(); setVisible(false) }}
                            className="w-full py-2.5 text-sm font-medium text-gray-500
                           hover:text-black transition-colors duration-200"
                        >
                            Log Out
                        </button>
                    ) : (
                        <button
                            onClick={() => { navigate('/login'); setVisible(false) }}
                            className="w-full py-2.5 text-sm font-medium text-gray-500
                           hover:text-black transition-colors duration-200"
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}

export default Navbar