import axios from "axios";

export async function get(store) {
    if(!store.rootState.token) return

    try {
        let response = await axios.get(`${store.rootState.api}api/v1/users/me`)
        console.log(response.data)
        // store.commit('set', response.data)

        return response.data
    } catch (error) {
        
    }
}

export async function login(store, data) {
    try {
        let response = await axios.post(`${store.rootState.api}api/v1/users/login`, data)

        store.commit('token', response.data, {root: true})

        return response.data
    } catch (error) {
        
    }
}