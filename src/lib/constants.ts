export const apiURL = "https://interviewer-prep.vercel.app/api"

// https://interviewer-prep.vercel.app/api
// http://localhost:3000/api

export const defaultImagePlaceholder = "/images/categories/software.svg"

export const userJWTSecret = process.env.USER_JWT_SECRET!
export const adminJWTSecret = process.env.ADMIN_JWT_SECRET!

export const adminCookieName = "interview-admin-token"

export const adminPasscode = process.env.ADMIN_ADMIN_TOKEN_PASSCODEPASSCODE

export const USER_PICTURE_MAX_FILE_SIZE = 5_120_000
export const USER_PICTURE_ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

export const dropdownMenuItemStyles = "flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
