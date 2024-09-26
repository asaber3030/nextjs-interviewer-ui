export const routes = {
  home: () => `/`,
}

export const adminRoutes = {
  dashboard: () => `/admin`,
  login: () => `/admin/login`,
  profile: () => `/admin/profile`,

  subscriptions: () => `/admin/subscriptions`,
  viewSubscription: (id: number) => `/admin/subscriptions/${id}`,

  users: () => `/admin/users`,
  viewUser: (id: number) => `/admin/users/${id}`,
  updateUser: (id: number) => `/admin/users/${id}/update`,
  userSubscriptions: (id: number) => `/admin/users/${id}/subscriptions`,
  userMessages: (id: number) => `/admin/users/${id}/messages`,
  userLoginHistory: (id: number) => `/admin/users/${id}/login-history`,
  userAnalyticalModels: (id: number) => `/admin/users/${id}/analytical-models`,
  userTakenExams: (id: number) => `/admin/users/${id}/taken-exams`,
  userActivities: (id: number) => `/admin/users/${id}/activities`,
  viewUserTakenExam: (userId: number, examId: number) => `/admin/users/${userId}/taken-exams/${examId}`,

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

  takenExams: () => `/admin/taken-exams`,
  viewTakenExam: (id: number) => `/admin/taken-exams/${id}`,
  updateTakenExam: (id: number) => `/admin/taken-exams/${id}/update`,
  takenExamQuestions: (id: number) => `/admin/taken-exams/${id}/questions`,
}
