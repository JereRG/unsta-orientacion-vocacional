import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter } from 'lucide-react'

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <motion.footer 
            className="bg-gradient-to-r from-[#003366] to-[#004080] text-white py-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center space-y-6">
                    <motion.div
                        className="text-center flex flex-col items-center"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <span className="text-lg font-montserrat font-semibold">Desarrollado por</span>
                        <Link 
                            href="https://tricodeit.com" 
                            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-[#FFA500] font-tricode mt-2" 
                            target='_blank'
                            rel="noopener noreferrer"
                        >
                            Tricode
                        </Link>
                    </motion.div>

                    <div className="flex space-x-4">
                        <a href="https://github.com/tricode-it" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <Github className="w-6 h-6 hover:text-[#FFD700] transition-colors duration-300" />
                        </a>
                        <a href="https://linkedin.com/company/tricode" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <Linkedin className="w-6 h-6 hover:text-[#FFD700] transition-colors duration-300" />
                        </a>
                        <a href="https://twitter.com/tricode" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <Twitter className="w-6 h-6 hover:text-[#FFD700] transition-colors duration-300" />
                        </a>
                    </div>

                    <div className="text-sm text-gray-300">
                        © {currentYear} UNSTA. Todos los derechos reservados.
                    </div>
                </div>
            </div>
        </motion.footer>
    )
}