import { User } from "lucide-react"

type StudentStatus = "ok" | "improvement" | "discipline"

interface Student {
  id: number
  status: StudentStatus
}

interface ClassroomOverviewProps {
  classroomId: string
}

const getStatusColor = (status: StudentStatus) => {
  switch (status) {
    case "ok":
      return "bg-green-500"
    case "improvement":
      return "bg-yellow-500"
    case "discipline":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

export function ClassroomOverview({ classroomId }: ClassroomOverviewProps) {
  // Generamos un número aleatorio de estudiantes entre 20 y 35
  const studentCount = Math.floor(Math.random() * (35 - 20 + 1)) + 20

  // Simulamos diferentes estudiantes para cada salón
  const students: Student[] = Array.from({ length: studentCount }, (_, i) => ({
    id: i + 1,
    status: ["ok", "improvement", "discipline"][Math.floor(Math.random() * 3)] as StudentStatus,
  }))

  return (
    <div className="bg-[#1E1E1E] border-[#CBA135] border p-4 rounded-lg">
      <h3 className="text-[#CBA135] text-lg font-semibold mb-4">Vista General del Salón {classroomId}</h3>
      <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-11 gap-4">
        {students.map((student) => (
          <div key={student.id} className="flex flex-col items-center">
            <User className={`h-8 w-8 ${getStatusColor(student.status)} text-white p-1 rounded-full`} />
            <span className="text-white text-xs mt-1">{student.id}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-white text-xs">OK</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <span className="text-white text-xs">Plan de Mejora</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span className="text-white text-xs">Disciplina</span>
        </div>
      </div>
    </div>
  )
}
