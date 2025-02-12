import { User } from "lucide-react"

type StudentStatus = "lowStress" | "mediumStress" | "highStress"
type ProgressStatus = "good" | "average" | "needsImprovement"

interface Student {
  id: number
  stressStatus: StudentStatus
  progressStatus: ProgressStatus
}

interface TeacherClassroomOverviewProps {
  classroomId: string
}

const getStressColor = (status: StudentStatus) => {
  switch (status) {
    case "lowStress":
      return "bg-green-500"
    case "mediumStress":
      return "bg-yellow-500"
    case "highStress":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

const getProgressColor = (status: ProgressStatus) => {
  switch (status) {
    case "good":
      return "bg-blue-500"
    case "average":
      return "bg-orange-500"
    case "needsImprovement":
      return "bg-purple-500"
    default:
      return "bg-gray-500"
  }
}

export function TeacherClassroomOverview({ classroomId }: TeacherClassroomOverviewProps) {
  // Generamos un número aleatorio de estudiantes entre 20 y 35
  const studentCount = Math.floor(Math.random() * (35 - 20 + 1)) + 20

  // Simulamos diferentes estudiantes para cada salón
  const students: Student[] = Array.from({ length: studentCount }, (_, i) => ({
    id: i + 1,
    stressStatus: ["lowStress", "mediumStress", "highStress"][Math.floor(Math.random() * 3)] as StudentStatus,
    progressStatus: ["good", "average", "needsImprovement"][Math.floor(Math.random() * 3)] as ProgressStatus,
  }))

  return (
    <div className="bg-[#1E1E1E] border-[#CBA135] border p-4 rounded-lg">
      <h3 className="text-[#CBA135] text-lg font-semibold mb-4">Vista General del Salón {classroomId}</h3>
      <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-11 gap-4">
        {students.map((student) => (
          <div key={student.id} className="flex flex-col items-center">
            <div className="relative">
              <User className={`h-8 w-8 ${getStressColor(student.stressStatus)} text-white p-1 rounded-full`} />
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 ${getProgressColor(student.progressStatus)} rounded-full border-2 border-[#1E1E1E]`}
              ></div>
            </div>
            <span className="text-white text-xs mt-1">{student.id}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-white text-xs">Estrés Bajo</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <span className="text-white text-xs">Estrés Medio</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span className="text-white text-xs">Estrés Alto</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-white text-xs">Buen Progreso</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
          <span className="text-white text-xs">Progreso Promedio</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
          <span className="text-white text-xs">Necesita Mejorar</span>
        </div>
      </div>
    </div>
  )
}
