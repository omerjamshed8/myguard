import axios, { AxiosError } from 'axios'

const baseUrl = 'http://54.171.172.119:3001/api/v1'
// const baseUrl = 'http://localhost:3001/api/v1'
export const Api = {
    get: async (args = {path: '', config: null}) => {
        try {
            const { path, config } = args 
            let res = await axios.get(baseUrl + path, config)
            return {
                success: true,
                data: res.data 
            }
        } catch(e) {
            let message = typeof e === 'string' ? e : typeof e === 'object' && e.message && typeof e.message === 'string' ? e.message : 'Something went wrong' 
            if(e instanceof AxiosError && typeof e.response?.data?.message === 'string' ) {
                message = e.response?.data?.message
            }
            return {
                error: true,
                message,
                exception: e
            }
        }
    },
    post: async (args = { path: '', data: null, config: null, token: null }) => {
        try {
            let { path, config, data, token } = args 
            if(!config && token) {
                config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        Accept: '/'
                    }
                }
            }
            let res = await axios.post(baseUrl + path, data, config)
            
            return {
                success: true,
                data: res.data 
            }
        } catch(e) {
            // let message = typeof e === 'string' ? e : typeof e === 'object' && e.message && typeof e.message === 'string' ? e.message : 'Something went wrong' 
            
            // if(e instanceof AxiosError) {
            //     if(e.response?.data?.name === 'validationError') {
            //         const m = e.response?.data?.message  
            //         message = Object.keys(m).map(k => m[k]).join(', ')
            //     } else if(typeof e.response?.data?.message === 'string') {
            //         message = e.response?.data?.message
            //     }
            // }

            return {
                error: true,
                message: getErrorMessage(e),
                exception: e,
                apiResponse: e.response?.data
            }
        }
    },
    put: async (args = { path: '', data: null, config: null, token: null }) => {
        try {
            let { path, config, data, token } = args 
            if(!config && token) {
                config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        Accept: '/'
                    }
                }
            }
            let res = await axios.put(baseUrl + path, data, config)
            
            return {
                success: true,
                data: res.data 
            }
        } catch(e) {
            return {
                error: true,
                message: getErrorMessage(e),
                exception: e,
                apiResponse: e.response?.data
            }
        }
    },
    delete: async (args = { path: '', data: null, config: null, token: null }) => {
        try {
            let { path, config, data, token } = args 
            if(!config && token) {
                config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        Accept: '/'
                    }
                }
            }
            let res = await axios.delete(baseUrl + path, data, config)
            
            return {
                success: true,
                data: res.data 
            }
        } catch(e) {
            return {
                error: true,
                message: getErrorMessage(e),
                exception: e,
                apiResponse: e.response?.data
            }
        }
    },
}

const getErrorMessage = e => {
    let message = typeof e === 'string' ? e : typeof e === 'object' && e.message && typeof e.message === 'string' ? e.message : 'Something went wrong' 
            
    if(e instanceof AxiosError) {
        if(e.response?.data?.name === 'validationError') {
            const m = e.response?.data?.message  
            message = Object.keys(m).map(k => m[k]).join(', ')
        } else if(typeof e.response?.data?.message === 'string') {
            message = e.response?.data?.message
        }
    }

    return message 
}