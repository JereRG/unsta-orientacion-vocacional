import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "UNSTA - Formulario de Orientacion Vocacional",
  description: "El Sistema de Orientación Vocacional UNSTA es una plataforma digital que facilita la evaluación y el análisis de las preferencias e intereses vocacionales de los estudiantes. A través de un formulario interactivo, los usuarios responden preguntas diseñadas para orientarles en la selección de su futura carrera profesional. El sistema recopila, almacena y procesa los datos suministrados por los estudiantes, permitiendo generar recomendaciones personalizadas sobre áreas de estudio y oportunidades académicas que se alineen con sus aptitudes e intereses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
