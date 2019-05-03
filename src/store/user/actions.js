import axios from "axios";

export async function userGet(store) {
    if(!store.rootState.token) return

    try {
        let response = await axios.get(`${store.rootState.api}api/v1/users/me`)

        store.commit('user_set', response.data)

        return response.data
    } catch (error) {
        
    }
}

export async function userLogin(store, data) {
    try {
        let response = await axios.post(`${store.rootState.api}api/v1/users/login`, data)

        store.commit('token', response.data, {root: true})

        return response.data
    } catch (error) {
        
    }
}