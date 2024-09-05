export const routes = {
  home: () => `/`,
}

export const adminRoutes = {
  dashboard: () => `/admin`,
  login: () => `/admin/login`,
  profile: () => `/admin/profile`,

  plans: () => `/admin/plans`,
  viewPlan: (id: number) => `/admin/plans/${id}`,
  updatePlan: (id: number) => `/admin/plans/${id}/update`,

  categories: () => `/admin/categories`,
  viewCategory: (id: number) => `/admin/categories/${id}`,
  updateCategory: (id: number) => `/admin/categories/${id}/update`,

  careers: () => `/admin/careers`,
  viewCareer: (id: number) => `/admin/careers/${id}`,
  updateCareer: (id: number) => `/admin/careers/${id}/update`,

  levels: () => `/admin/levels`,
  viewLevel: (id: number) => `/admin/levels/${id}`,
  updateLevel: (id: number) => `/admin/levels/${id}/update`,

  exams: () => `/admin/exams`,
  viewExam: (id: number) => `/admin/exams/${id}`,
  examQuestions: (id: number) => `/admin/exams/${id}/questions`,
  viewQuestion: (examId: number, questionId: number) => `/admin/exams/${examId}/questions/${questionId}`,
  updateExam: (id: number) => `/admin/exams/${id}/update`,
}
