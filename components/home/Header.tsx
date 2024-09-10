import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <motion.header 
            className="bg-[#003366] text-white p-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <Image
                        src="/logounsta.png"
                        alt="Logo UNSTA"
                        width={50}
                        height={50}
                        className="mr-4 rounded-full"
                    />
                    <h1 className="text-xl md:text-2xl font-bold hidden sm:block">Universidad del Norte Santo Tomás de Aquino</h1>
                    <h1 className="text-xl md:text-2xl font-bold sm:hidden">UNSTA</h1>
                </div>
                <nav className="hidden md:block">
                    <ul className="flex space-x-8 text-lg">
                        <li><a href="/" className="hover:text-[#FFD700] transition-colors">Inicio</a></li>
                        <li><a href="#" className="hover:text-[#FFD700] transition-colors">Carreras</a></li>
                        <li><a href="#" className="hover:text-[#FFD700] transition-colors">Contacto</a></li>
                    </ul>
                </nav>
                <button className="md:hidden" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.nav
                        className="md:hidden"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ul className="flex flex-col space-y-4 mt-4 text-lg">
                            <li><a href="/" className="hover:text-[#FFD700] transition-colors">Inicio</a></li>
                            <li><a href="#" className="hover:text-[#FFD700] transition-colors">Carreras</a></li>
                            <li><a href="#" className="hover:text-[#FFD700] transition-colors">Contacto</a></li>
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.header>
    )
}