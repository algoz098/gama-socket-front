export function showAdmin (state, getters, rootState) {
    let user = rootState.user.data
    let env = rootState.environment.data

    try {
        return (user && user.access && (user.access.some(o => o.env == 'default' && env.default) || user.access.some(o => o.env == env.name)))
    } catch (error) {
        return false                
    }
}
