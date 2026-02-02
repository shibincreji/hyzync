import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false); // Hide on scroll down
            } else {
                setIsVisible(true);  // Show on scroll up
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <nav className={`fixed top-4 md:top-20 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-full md:max-w-fit px-0 md:px-4 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-[200%]'}`}>
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-8 py-3 flex items-center gap-8 shadow-2xl">
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="Hyzync Logo" className="h-8 w-auto hover:opacity-80 transition-opacity" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {[
                        { name: 'horizon', path: '/#horizon' },
                        { name: 'academy', path: '/academy' },
                        { name: 'how it works', path: '/#how-it-works' },
                        { name: 'contact', path: '/#contact' }
                    ].map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="text-sm font-medium text-secondary hover:text-white transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white ml-4 hover:text-white/80 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[90vw] max-w-md mt-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col space-y-4 shadow-xl">
                    {[
                        { name: 'Horizon', path: '/#horizon' },
                        { name: 'Academy', path: '/academy' },
                        { name: 'How It Works', path: '/#how-it-works' },
                        { name: 'Contact', path: '/#contact' }
                    ].map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="text-white text-lg font-medium text-center hover:text-brand-purple transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
