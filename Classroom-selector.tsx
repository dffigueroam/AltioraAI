"use client"

import { useState } from "react"

interface ClassroomSelectorProps {
  onSelectClassroom: (classroomId: string) => void
}

export function ClassroomSelector({ onSelectClassroom }: ClassroomSelectorProps) {
  const [selectedClassroom, setSelectedClassroom] = useState("3A")
  const classrooms = [
    "3A",
    "3B",
    "4A",
    "4B",
    "5A",
    "5B",
    "6A",
    "6B",
    "7A",
    "7B",
    "8A",
    "8B",
    "9A",
    "9B",
    "10A",
    "10B",
    "11A",
    "11B",
  ]

  const handleClassroomChange = (classroomId: string) => {
    setSelectedClassroom(classroomId)
    onSelectClassroom(classroomId)
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {classrooms.map((classroom) => (
        <button
          key={classroom}
          className={`px-4 py-2 rounded ${
            selectedClassroom === classroom
              ? "bg-[#8B0000] text-white"
              : "bg-[#1E1E1E] text-[#CBA135] hover:bg-[#2E2E2E]"
          } transition-colors`}
          onClick={() => handleClassroomChange(classroom)}
        >
          {classroom}
        </button>
      ))}
    </div>
  )
}
