import axios from 'axios'
import { Cookies } from 'quasar'

export default async ({ Vue, ssrContext }) => {
  if(process.env.SERVER) global.axios = axios
  else window.axios = axios

  if(process.env.SERVER){
    global.cookies = Cookies.parseSSR(ssrContext)
  }
}
