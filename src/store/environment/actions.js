import axios from "axios";

export async function environmentGet(store, context) {
    try {
        let response = await global.axios.get(`${store.rootState.api}api/v1/environment/`)
        
        store.commit('environmentSet', response.data)

        return response.data
    } catch (error) {
        console.log("error environmentGet", error )
    }
}

export function environmentColors(store) {
    try {
        let root = document.body;

        store.state.data.colors.forEach(color => {
            console.log(`--q-color-${color.type}`, color.value)
            root.style.setProperty(`--q-color-${color.type}`, color.value);
        });
    } catch (error) {
        console.log("error environmentColor", error )
    }
}



