import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Separator } from "@/components/ui/separator"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <motion.header 
            className="bg-gradient-to-r from-[#003366] to-[#004080] text-white py-4 px-6 shadow-lg"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <Image
                        src="/elegicreerunsta.jpg"
                        alt="Logo UNSTA"
                        width={300}
                        height={300}
                        className="rounded-lg"
                    />
                </Link>
                <nav className="hidden md:block">
                    <ul className="flex items-center space-x-8 text-lg font-geistmono">
                        <li>
                            <Link href="/" className="hover:text-[#FFD700] transition-colors duration-300 ease-in-out">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.unsta.edu.ar/grado-posgrado/" className="hover:text-[#FFD700] transition-colors duration-300 ease-in-out" target='_blank'>
                                Carreras
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.unsta.edu.ar/sove/" className="hover:text-[#FFD700] transition-colors duration-300 ease-in-out" target='_blank'>
                                SOVE
                            </Link>
                        </li>
                        <li>
                            <Link href="/contacto" className="hover:text-[#FFD700] transition-colors duration-300 ease-in-out">
                                Contacto
                            </Link>
                        </li>
                    </ul>
                </nav>
                <button 
                    className="md:hidden bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors duration-300 ease-in-out" 
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.nav
                        className="md:hidden mt-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Separator className='mb-1' />
                        <ul className="flex flex-col space-y-4 text-lg font-geistmono">
                            <li>
                                <Link href="/" className="block py-2 px-4 hover:bg-white/10 rounded transition-colors duration-300 ease-in-out">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.unsta.edu.ar/grado-posgrado/" className="block py-2 px-4 hover:bg-white/10 rounded transition-colors duration-300 ease-in-out" target='_blank'>
                                    Carreras
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.unsta.edu.ar/sove/" className="block py-2 px-4 hover:bg-white/10 rounded transition-colors duration-300 ease-in-out">
                                    SOVE
                                </Link>
                            </li>
                            <li>
                                <Link href="/contacto" className="block py-2 px-4 hover:bg-white/10 rounded transition-colors duration-300 ease-in-out">
                                    Contacto
                                </Link>
                            </li>
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.header>
    )
}