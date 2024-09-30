const queryKeys = {
  careers: (search?: string) => ["admin", "careers", search],
  career: (id: number) => ["admin", "careers", id],
  careerExams: (id: number) => ["admin", "careers", id, "exams"],
  careerExam: (careerId: number, examId: number) => ["admin", "careers", careerId, "exams", examId],
  careerLevels: (id: number) => ["admin", "careers", id, "levels"],
  careerLevelsWithSearch: (id: number, search?: string) => ["admin", "careers", id, "levels", search],
  careerLevel: (careerId: number, levelId: number) => ["admin", "careers", careerId, "levels", levelId],
}

export default queryKeys
