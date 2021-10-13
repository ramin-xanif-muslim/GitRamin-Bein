

export function getToken() {
    const user = JSON.parse(localStorage.getItem('user'))
    return user ? user.Token : undefined
}

