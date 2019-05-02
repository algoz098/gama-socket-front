import axios from "axios";

export async function  get(store) {
    try {
        let response = await axios.get(`${store.rootState.api}api/v1/environment/`)

        store.commit('set', response.data)

        return response.data
    } catch (error) {
        
    }
}
