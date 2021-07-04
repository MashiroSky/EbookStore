export function LoginAction(data) {
    return { type: "Login", data }
}
export function LogoutAction() {
    return { type: "Logout", data: null }
}