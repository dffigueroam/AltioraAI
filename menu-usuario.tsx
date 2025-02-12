"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  BookOpen,
  Brain,
  Calendar,
  GraduationCap,
  Heart,
  Home,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react"
import Link from "next/link"

type UserRole = "estudiante" | "profesor" | "padre" | "directivo"

const menuItems = {
  estudiante: [
    { icon: Home, label: "Inicio", href: "/estudiante" },
    { icon: BookOpen, label: "Mis Cursos", href: "/estudiante/cursos" },
    { icon: Brain, label: "Evaluaciones", href: "/estudiante/evaluaciones" },
    { icon: Heart, label: "Bienestar", href: "/estudiante/bienestar" },
    { icon: MessageSquare, label: "Mensajes", href: "/estudiante/mensajes" },
  ],
  profesor: [
    { icon: Home, label: "Inicio", href: "/profesor" },
    { icon: Users, label: "Mis Estudiantes", href: "/profesor/estudiantes" },
    { icon: BookOpen, label: "Cursos", href: "/profesor/cursos" },
    { icon: BarChart3, label: "Análisis", href: "/profesor/analisis" },
    { icon: Calendar, label: "Calendario", href: "/profesor/calendario" },
  ],
  padre: [
    { icon: Home, label: "Inicio", href: "/padre" },
    { icon: GraduationCap, label: "Progreso Académico", href: "/padre/progreso" },
    { icon: Heart, label: "Bienestar Emocional", href: "/padre/bienestar" },
    { icon: MessageSquare, label: "Comunicaciones", href: "/padre/comunicaciones" },
    { icon: Calendar, label: "Eventos", href: "/padre/eventos" },
  ],
  directivo: [
    { icon: Home, label: "Dashboard", href: "/directivo" },
    { icon: BarChart3, label: "Estadísticas", href: "/directivo/estadisticas" },
    { icon: Users, label: "Gestión de Usuarios", href: "/directivo/usuarios" },
    { icon: Settings, label: "Configuración", href: "/directivo/configuracion" },
  ],
}

export function MenuUsuario() {
  const [role, setRole] = useState<UserRole>("estudiante")

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-100 p-4">
        <div className="mb-4">
          <select
            className="w-full p-2 border rounded"
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
          >
            <option value="estudiante">Estudiante</option>
            <option value="profesor">Profesor</option>
            <option value="padre">Padre</option>
            <option value="directivo">Directivo</option>
          </select>
        </div>
        <nav>
          <ul className="space-y-2">
            {menuItems[role].map((item, index) => (
              <li key={index}>
                <Button asChild variant="ghost" className="w-full justify-start">
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Contenido Principal</h1>
        <p>El contenido de la página se mostrará aquí según la selección del menú.</p>
      </div>
    </div>
  )
}
