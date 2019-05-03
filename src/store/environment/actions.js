import axios from "axios";

export async function environmentGet(store) {
    try {
        let response = await axios.get(`${store.rootState.api}api/v1/environment/`)

        store.commit('environmentSet', response.data)

        return response.data
    } catch (error) {
        
    }
}
