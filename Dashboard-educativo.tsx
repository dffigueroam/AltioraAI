"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  BookOpen,
  Brain,
  Calendar,
  GraduationCap,
  Heart,
  MessageSquare,
  Settings,
  Users,
  AlertTriangle,
  Smile,
  TrendingUp,
  Star,
  Flag,
} from "lucide-react"
import { ClassroomOverview } from "./classroom-overview"
import { TeacherClassroomOverview } from "./teacher-classroom-overview"
import { ClassroomSelector } from "./classroom-selector"

type UserRole = "estudiante" | "profesor" | "padre" | "directivo"

const roleIcons = {
  estudiante: GraduationCap,
  profesor: Users,
  padre: Heart,
  directivo: Settings,
}

const generateRandomISCE = () => (Math.random() * (10 - 5) + 5).toFixed(1)

const dashboardItems = {
  estudiante: [
    { icon: BookOpen, label: "Mis Cursos", value: "5 activos" },
    { icon: Smile, label: "Estado de Conducta", value: "Excelente" },
    { icon: TrendingUp, label: "Plan de Mejoramiento", value: "80% completado" },
    { icon: Brain, label: "Nivel de Estrés", value: "Bajo" },
    { icon: Heart, label: "Motivación", value: "Alta" },
    { icon: BarChart, label: "Progreso General", value: "75%" },
    { icon: Star, label: "Materias Sobresalientes", value: "Matemáticas, Ciencias" },
    { icon: Flag, label: "Materias en Mejora", value: "Historia" },
  ],
  profesor: [
    { icon: Users, label: "Mis Estudiantes", value: "28 activos" },
    { icon: Calendar, label: "Próxima Clase", value: "En 2 horas" },
    { icon: Brain, label: "Sugerencias de Enseñanza", value: "3 nuevas" },
    { icon: MessageSquare, label: "Mensajes", value: "5 sin leer" },
  ],
  padre: [
    { icon: GraduationCap, label: "Progreso Académico", value: "Excelente" },
    { icon: Heart, label: "Bienestar Emocional", value: "Estable" },
    { icon: Calendar, label: "Próximo Evento", value: "Reunión de padres" },
    { icon: MessageSquare, label: "Comunicaciones", value: "2 nuevas" },
  ],
  directivo: [
    { icon: Users, label: "Total Estudiantes", value: "1250" },
    { icon: AlertTriangle, label: "Casos de Atención", value: "3 pendientes" },
    { icon: Brain, label: "Sugerencias IA", value: "5 nuevas" },
  ],
}

export function DashboardEducativo() {
  const [role, setRole] = useState<UserRole>("estudiante")
  const [selectedClassroom, setSelectedClassroom] = useState("3A")
  const [generalISCE, setGeneralISCE] = useState(generateRandomISCE())
  const [classroomISCE, setClassroomISCE] = useState(generateRandomISCE())
  const RoleIcon = roleIcons[role]

  useEffect(() => {
    if (role === "directivo") {
      setClassroomISCE(generateRandomISCE())
    }
  }, [role]) // Removed unnecessary dependency: selectedClassroom

  const directivoItems = [
    { icon: BarChart, label: "ISCE General", value: generalISCE },
    { icon: BarChart, label: `ISCE ${selectedClassroom}`, value: classroomISCE },
    ...dashboardItems.directivo,
  ]

  return (
    <div className="flex flex-col h-screen bg-[#121212] text-white">
      <header className="bg-[#8B0000] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#CBA135]">ALTIORA AI</h1>
          <div className="flex items-center gap-2">
            <RoleIcon className="h-6 w-6 text-[#CBA135]" />
            <select
              className="bg-[#8B0000] text-white border-none font-semibold focus:outline-none focus:ring-2 focus:ring-[#CBA135]"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
            >
              <option value="estudiante">Estudiante</option>
              <option value="profesor">Profesor</option>
              <option value="padre">Padre/Acudiente</option>
              <option value="directivo">Directivo</option>
            </select>
          </div>
        </div>
      </header>
      <main className="flex-grow p-6 overflow-auto">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-[#CBA135]">Bienvenido, {role}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(role === "directivo" ? directivoItems : dashboardItems[role]).map((item, index) => (
              <Card key={index} className="bg-[#1E1E1E] border-[#CBA135] border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-[#CBA135]">{item.label}</CardTitle>
                  <item.icon className="h-4 w-4 text-[#8B0000]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{item.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          {(role === "directivo" || role === "profesor") && (
            <div className="mt-6">
              <ClassroomSelector onSelectClassroom={setSelectedClassroom} />
              {role === "directivo" ? (
                <ClassroomOverview classroomId={selectedClassroom} />
              ) : (
                <TeacherClassroomOverview classroomId={selectedClassroom} />
              )}
            </div>
          )}
          <Tabs defaultValue="overview" className="mt-6">
            <TabsList className="bg-[#1E1E1E] border-[#CBA135] border">
              <TabsTrigger value="overview" className="text-[#CBA135] data-[state=active]:bg-[#8B0000]">
                Vista General
              </TabsTrigger>
              <TabsTrigger value="actions" className="text-[#CBA135] data-[state=active]:bg-[#8B0000]">
                Acciones Pendientes
              </TabsTrigger>
              <TabsTrigger value="reports" className="text-[#CBA135] data-[state=active]:bg-[#8B0000]">
                Informes
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <Card className="bg-[#1E1E1E] border-[#CBA135] border">
                <CardHeader>
                  <CardTitle className="text-[#CBA135]">Vista General</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white">
                    Aquí se mostrará un resumen de la actividad reciente y estadísticas relevantes.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="actions" className="mt-6">
              <Card className="bg-[#1E1E1E] border-[#CBA135] border">
                <CardHeader>
                  <CardTitle className="text-[#CBA135]">Acciones Pendientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white">
                    Lista de tareas y acciones sugeridas por la IA para mejorar el rendimiento.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reports" className="mt-6">
              <Card className="bg-[#1E1E1E] border-[#CBA135] border">
                <CardHeader>
                  <CardTitle className="text-[#CBA135]">Informes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white">Acceso a informes detallados y análisis generados por la plataforma.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

