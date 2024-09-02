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
}
