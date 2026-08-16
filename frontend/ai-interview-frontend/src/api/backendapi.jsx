import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_backend_api,
    withCredentials:true
});

let accessToken = null;
export const setAccessToken = (token) => {
    accessToken = token;
};
api.interceptors.request.use((config) => {


    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

api.interceptors.response.use(

    (response) => {

        return response;

    },

    async (error) => {

        const originalRequest =
            error.config;


        // Don't try to refresh the refresh request itself
        if (
            error.config?.url?.includes(
                "/auth/refresh"
            )
        ) {

            return Promise.reject(error);

        }


        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;


            try {

                const response =
                    await api.post(
                        "/auth/refresh"
                    );


                const newAccessToken =
                    response.data.accessToken;


                setAccessToken(
                    newAccessToken
                );


                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;


                return api(originalRequest);

            } catch (refreshError) {

                setAccessToken(null);

                return Promise.reject(
                    refreshError
                );

            }

        }


        return Promise.reject(error);

    }

);

export default api;