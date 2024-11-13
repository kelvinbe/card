import {SETTINGS} from '../../settings'

const DOMAIN = SETTINGS.TMS_API

export const SIGININ_DOMAIN = `${DOMAIN}/login`
export const VERIFY_OTP_DOMAIN = `${DOMAIN}/auth/verify`
export const CREATE_TERMINAL = `${DOMAIN}/device/create-device`
export const CREATE_OPERATOR = `${DOMAIN}/agent/create-agent`
export const GET_ALL_OPERATORS = `${DOMAIN}/agent/all-agents`
export const CREATE_MERCHANT = `https://api.mockfly.dev/mocks/53d116d1-6026-4e08-8c3d-22d5dc18a06f/create-merchant`
export const CREATE_USER = `${DOMAIN}/auth/add-user`
export const EDIT_USER = `${DOMAIN}/auth/update-user`
export const GET_ALL_USER = `${DOMAIN}/auth/get-users`
export const DELETE_USER = `${DOMAIN}/auth/delete-user`

export const http_methods = {
    post: "POST",
    get: "GET",
    put: "PUT",
    delete: 'DELETE',
    patch: "PATCH"
}