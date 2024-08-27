import { TAdminSidebar } from "@/types"
import { createSlice } from "@reduxjs/toolkit"

const initialState: TAdminSidebar = "full"

const adminSidebarSlice = createSlice({
  name: "adminSidebar",
  initialState,
  reducers: {
    changeAdminSidebarState: (state, { payload }) => {},
  },
})

export default adminSidebarSlice.reducer
export const { changeAdminSidebarState } = adminSidebarSlice.actions
