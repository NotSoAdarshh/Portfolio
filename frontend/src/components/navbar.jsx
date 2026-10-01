import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { Magnetic } from './cursor'

function Navbar({
    title = 'Adarsh Deshmukh',
    subtitle = 'MERN Stack Dev',
}) {
    const [isOpen, setIsOpen] = useState(false)
    const menuBtnRef = useRef(null)
    const ctaRef = useRef(null)
    const menuOverlayRef = useRef(null)
    const navLinksRef = useRef([])

    const navItems = [
        { label: 'About', href: 'about', num: '01' },
        { label: 'Projects', href: 'projects', num: '02' },
        { label: 'Achievements', href: 'achievements', num: '03' },
        { label: 'Contact', href: 'contact', num: '04' },
    ]

    const socialLinks = [
        { label: 'GitHub', href: 'https://github.com/NotSoAdarshh' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/adarsh-deshmukh-608539359/' }
    ]

    // Track position of the hand-drawn CTA arrow relative to the menu button
    useEffect(() => {
        const updateCtaPosition = () => {
            if (!menuBtnRef.current || !ctaRef.current) return
            const rect = menuBtnRef.current.getBoundingClientRect()
            gsap.set(ctaRef.current, {
                left: rect.left - 48,
                top: rect.bottom + 12,
            })
        }

        updateCtaPosition()
        window.addEventListener('resize', updateCtaPosition)
        window.addEventListener('scroll', updateCtaPosition)

        return () => {
            window.removeEventListener('resize', updateCtaPosition)
            window.removeEventListener('scroll', updateCtaPosition)
        }
    }, [])

    // Animate the fullscreen menu drawer
    useEffect(() => {
        if (!menuOverlayRef.current) return

        if (isOpen) {
            document.body.style.overflow = 'hidden'
            gsap.to(menuOverlayRef.current, {
                autoAlpha: 1,
                y: '0%',
                duration: 0.5,
                ease: 'power3.inOut',
            })

            gsap.fromTo(
                navLinksRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: 'power4.out',
                    delay: 0.15,
                },
            )
        } else {
            document.body.style.overflow = ''
            gsap.to(menuOverlayRef.current, {
                autoAlpha: 0,
                y: '-10%',
                duration: 0.35,
                ease: 'power3.in',
            })
        }
    }, [isOpen])

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen])

    return (
        <>
            {/* Top Header with Magnetic Menu & Close buttons */}
            <header className="w-full flex items-center justify-between border-b border-black/10 pb-6 z-30 relative">
                <div className="flex items-center gap-3">
                    <Magnetic strength={0.15}>
                        <span className="font-bold text-lg tracking-tight cursor-default">Adarsh Deshmukh</span>
                    </Magnetic>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-black/5 text-neutral-600 font-mono">
                        {subtitle}
                    </span>
                </div>

                {/* Buttons from snippet wrapped in <Magnetic> */}
                <div className="flex items-center gap-6">
                    <div ref={menuBtnRef} className="relative">
                        <Magnetic strength={0.35} springDuration={0.8}>
                            <button
                                type="button"
                                onClick={() => setIsOpen(true)}
                                className={`w-11 h-11 rounded-full border border-black/10 flex items-center justify-center shadow-xs transition-colors ${isOpen
                                    ? 'bg-neutral-950 text-white'
                                    : 'bg-white/70 backdrop-blur-sm text-neutral-950 hover:bg-white'
                                    }`}
                                aria-label="Open Menu"
                                aria-expanded={isOpen}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="pointer-events-none"
                                >
                                    <line x1="4" x2="20" y1="12" y2="12" />
                                    <line x1="4" x2="20" y1="6" y2="6" />
                                    <line x1="4" x2="20" y1="18" y2="18" />
                                </svg>
                            </button>
                        </Magnetic>
                    </div>

                    
                </div>
            </header>

            {/* Floating Hand-Drawn CTA Arrow SVG from snippet */}
            <svg
                ref={ctaRef}
                className={`fixed pointer-events-none z-40 transition-opacity duration-300 w-24 h-auto drop-shadow-sm text-neutral-950 ${isOpen ? 'opacity-0' : 'opacity-90 hidden md:block'
                    }`}
                viewBox="0 0 52 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path d="M12.3417 42.0204C12.2328 42.0204 12.1486 41.9882 12.0891 41.9238C12.0297 41.8644 12 41.7133 12 41.4706C12 41.2478 12.0396 40.958 12.1189 40.6014C12.1981 40.2399 12.3046 39.8387 12.4383 39.3979C12.572 38.9572 12.7231 38.5015 12.8915 38.031C13.0599 37.5556 13.2357 37.09 13.4189 36.6344C13.6071 36.1738 13.7879 35.7528 13.9612 35.3714C14.0256 35.2328 14.0925 35.1362 14.1618 35.0817C14.2312 35.0272 14.3129 35 14.407 35C14.4714 35 14.5258 35.0198 14.5704 35.0594C14.6199 35.0941 14.6447 35.1535 14.6447 35.2377C14.6447 35.2674 14.6125 35.364 14.5481 35.5275C14.4887 35.6909 14.4045 35.9063 14.2955 36.1738C14.1915 36.4412 14.0752 36.7409 13.9464 37.0727C13.8176 37.4045 13.6864 37.7537 13.5527 38.1202C13.4189 38.4867 13.2926 38.8556 13.1738 39.2271C13.0549 39.5936 12.9534 39.9452 12.8692 40.282C12.785 40.6188 12.728 40.9209 12.6983 41.1883C12.8172 41.0447 12.9534 40.8614 13.1069 40.6386C13.2604 40.4157 13.4239 40.1755 13.5972 39.918C13.7706 39.6604 13.9464 39.4054 14.1247 39.1528C14.303 38.9002 14.4788 38.6699 14.6521 38.4619C14.8255 38.2539 14.9864 38.088 15.135 37.9642C15.2886 37.8354 15.4223 37.771 15.5362 37.771C15.7244 37.771 15.8754 37.8304 15.9893 37.9493C16.1082 38.0632 16.1676 38.2514 16.1676 38.5139C16.1676 38.6625 16.1379 38.8408 16.0785 39.0488C16.024 39.2568 15.9596 39.4747 15.8853 39.7025C15.8111 39.9304 15.7442 40.1483 15.6848 40.3563C15.6303 40.5643 15.603 40.7426 15.603 40.8912C15.603 41.0942 15.6798 41.1958 15.8333 41.1958C16.0711 41.1958 16.3088 41.1437 16.5465 41.0397C16.7892 40.9357 17.0195 40.807 17.2374 40.6534C17.4553 40.495 17.6559 40.3365 17.8392 40.178C18.0224 40.0145 18.1784 39.8759 18.3072 39.762C18.4459 39.6381 18.5622 39.5762 18.6563 39.5762C18.7752 39.5762 18.8346 39.6381 18.8346 39.762C18.8346 39.7966 18.8272 39.8363 18.8124 39.8808C18.7975 39.9254 18.7579 39.9824 18.6935 40.0517C18.6142 40.1408 18.5003 40.2572 18.3518 40.4009C18.2081 40.5445 18.0397 40.698 17.8466 40.8614C17.6584 41.0249 17.4529 41.1784 17.23 41.322C17.0121 41.4657 16.7867 41.5845 16.554 41.6786C16.3261 41.7678 16.1033 41.8124 15.8853 41.8124C15.5882 41.8124 15.3579 41.7282 15.1945 41.5598C15.036 41.3864 14.9567 41.1487 14.9567 40.8466C14.9567 40.6584 14.9864 40.4306 15.0459 40.1631C15.1053 39.8957 15.1796 39.6134 15.2687 39.3162C15.3628 39.0141 15.4569 38.7194 15.551 38.4322C15.3926 38.5411 15.2192 38.7046 15.031 38.9225C14.8478 39.1355 14.6546 39.3781 14.4516 39.6505C14.2485 39.918 14.0454 40.1904 13.8424 40.4677C13.6443 40.7451 13.4511 41.0026 13.2629 41.2403C13.0797 41.4731 12.9088 41.6613 12.7503 41.8049C12.5918 41.9486 12.4556 42.0204 12.3417 42.0204Z" fill="currentColor" />
                <path d="M19.4407 41.7604C19.1485 41.7604 18.9182 41.6489 18.7498 41.426C18.5815 41.2032 18.4973 40.9134 18.4973 40.5569C18.4973 40.4281 18.5146 40.2919 18.5493 40.1483C18.5889 39.9997 18.6384 39.866 18.6978 39.7471C18.6632 39.7124 18.6359 39.6654 18.6161 39.606C18.5963 39.5416 18.5864 39.4623 18.5864 39.3682C18.5864 39.076 18.6359 38.8086 18.735 38.5659C18.834 38.3232 18.9653 38.1127 19.1287 37.9344C19.2922 37.7512 19.4729 37.61 19.671 37.511C19.8741 37.4119 20.0796 37.3624 20.2876 37.3624C20.6294 37.3624 20.9067 37.4862 21.1197 37.7339C21.3326 37.9765 21.4391 38.348 21.4391 38.8482C21.4391 39.1107 21.3995 39.3781 21.3203 39.6505C21.246 39.9229 21.142 40.1854 21.0082 40.438C20.8795 40.6906 20.7284 40.9159 20.5551 41.114C20.3867 41.3121 20.2059 41.4706 20.0128 41.5895C19.8246 41.7034 19.6339 41.7604 19.4407 41.7604ZM19.1882 39.4945C19.2179 39.5341 19.2327 39.5861 19.2327 39.6505C19.2327 39.7248 19.2179 39.7991 19.1882 39.8734C19.1634 39.9477 19.1362 40.0492 19.1064 40.178C19.0767 40.3068 19.0619 40.49 19.0619 40.7277C19.0619 40.9655 19.156 41.0843 19.3442 41.0843C19.5522 41.0843 19.7453 41.0026 19.9236 40.8392C20.1019 40.6708 20.2604 40.4553 20.3991 40.1928C20.5377 39.9304 20.6442 39.6505 20.7185 39.3534C20.7978 39.0513 20.8374 38.7665 20.8374 38.499C20.8374 38.3257 20.8052 38.2044 20.7408 38.135C20.6764 38.0607 20.56 38.0236 20.3916 38.0236C20.2183 38.0236 20.0375 38.083 19.8493 38.2019C19.6661 38.3158 19.5126 38.4718 19.3887 38.6699C19.2649 38.868 19.203 39.0909 19.203 39.3385C19.203 39.393 19.1981 39.445 19.1882 39.4945Z" fill="currentColor" />
                <path d="M26.7476 8.71032C27.2887 7.78829 27.7547 6.82747 28.2229 5.86777C28.5794 5.09191 28.9154 4.30706 29.2465 3.52052C29.3747 3.18882 29.5227 2.86386 29.6272 2.52372C29.7147 2.22462 29.7418 1.91034 29.7311 1.6C29.5181 1.82826 29.3408 2.08912 29.2013 2.36798C29.0725 2.65865 28.9663 2.95943 28.846 3.25403C28.5506 3.96523 28.2433 4.67138 27.9287 5.37414C26.9035 7.59377 25.8568 9.46594 24.4051 11.3904C24.2515 11.595 24.0945 11.7974 23.9357 11.9982C22.9998 11.0143 21.9379 10.1473 20.7923 9.41984C19.6683 8.71032 18.4844 8.0857 17.2417 7.60838C16.2662 7.24913 15.2546 6.9832 14.2271 6.8196C13.1025 6.65206 11.9553 6.66836 10.825 6.77125C10.0201 6.85614 9.218 6.99951 8.44473 7.2407C7.82791 7.43859 7.23764 7.71071 6.66319 8.00812C6.20227 8.24875 5.75096 8.51186 5.33523 8.82445C4.88278 9.16572 4.46931 9.55365 4.05584 9.93932C3.56612 10.3953 3.09786 10.8748 2.67591 11.3938C2.27826 11.8705 1.89473 12.3715 1.6445 12.9427C1.47335 13.3379 1.36038 13.7551 1.25645 14.1717C1.07908 14.8784 0.962724 15.6014 0.944649 16.3306C0.898331 17.2852 0.99605 18.2528 1.33948 19.1501C1.69985 20.1126 2.2568 21.0183 3.03177 21.7042C3.80505 22.3659 4.73084 22.8489 5.70746 23.1373C6.42934 23.3526 7.18342 23.5078 7.94088 23.4561C8.38203 23.4246 8.81527 23.3285 9.24455 23.2273C9.73654 23.1148 10.224 22.9844 10.703 22.8247C11.8321 22.4486 12.9325 21.9808 13.9769 21.4102C14.7688 20.9778 15.5166 20.4707 16.2543 19.9529C17.9297 18.7835 19.4949 17.4623 20.9409 16.0219C21.6136 15.3141 22.2898 14.6096 22.9608 13.9007C23.2884 13.5296 23.6098 13.1529 23.9233 12.7706C24.2374 13.1237 24.5853 13.542 24.8423 13.9102C25.4207 14.7395 25.8771 15.5137 26.2584 16.2755C27.0808 17.8733 27.6846 19.5813 27.9456 21.1808C28.3342 23.2503 28.4551 25.3558 28.5997 27.4523C28.6867 28.819 28.7307 30.1886 28.8708 31.5508C28.8996 31.7898 28.9081 32.0321 28.9708 32.2654C29.0403 32.506 29.1504 32.7427 29.3142 32.9328C29.4249 32.5656 29.4735 32.1783 29.4086 31.7977C29.247 30.3764 29.2035 28.9461 29.1194 27.5186C28.955 25.0129 28.8194 22.4874 28.2438 20.0344C27.8117 18.1904 27.0209 16.4458 26.0613 14.8165C25.5484 13.9361 24.9423 13.1113 24.2622 12.3512C24.387 12.1944 24.5107 12.0369 24.6322 11.8773C25.4015 10.8659 26.1121 9.80889 26.7487 8.70976L26.7476 8.71032Z" fill="currentColor" />
            </svg>

            {/* Fullscreen Overlay Drawer Menu */}
            <div
                ref={menuOverlayRef}
                className="fixed inset-0 z-50 bg-[#141416] text-white flex flex-col justify-between p-8 md:p-16 invisible opacity-0 translate-y-[-10%]"
                aria-hidden={!isOpen}
            >
                <div className="w-full flex justify-between items-center text-neutral-400 text-xs font-mono uppercase tracking-widest border-b border-white/10 pb-4">
                    <span>{title}</span>
                    <Magnetic strength={0.3} cursorText="CLOSE">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-neutral-400 transition-colors uppercase text-xs tracking-widest font-mono"
                        >
                            [ESC / Close]
                        </button>
                    </Magnetic>
                </div>

                {/* Editorial Navigation Links */}
                <div className="flex flex-col gap-4 my-auto">
                    {navItems.map((item, index) => (
                        <div
                            key={item.label}
                            ref={(el) => (navLinksRef.current[index] = el)}
                            className="group overflow-hidden"
                        >
                            <Magnetic strength={0.3} cursorText={item.num}>
                                <a
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-baseline gap-6 text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-300 hover:text-white transition-colors duration-300 py-1"
                                >
                                    <span className="text-sm font-mono text-neutral-600 group-hover:text-emerald-400 transition-colors">
                                        {item.num}
                                    </span>
                                    <span>{item.label}</span>
                                </a>
                            </Magnetic>
                        </div>
                    ))}
                </div>

                {/* Menu Footer */}
                <div className="w-full pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-sm text-neutral-400">
                    <div className="flex items-center gap-6">
                        {socialLinks.map((social) => (
                            <Magnetic key={social.label} strength={0.25} cursorText="VISIT">
                                <a
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors text-xs font-mono tracking-wider uppercase"
                                >
                                    {social.label}
                                </a>
                            </Magnetic>
                        ))}
                    </div>

                    <div className="text-xs font-mono text-neutral-500">
                        {subtitle}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
