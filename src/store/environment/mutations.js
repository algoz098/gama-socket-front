export function environmentSet (state,data) {
    state.data = data
}

export function SOCKET_environmentSet (state,data) {
    console.log(data)
    state.data = data
}
