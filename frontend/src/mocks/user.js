import axios from 'axios';

class UserApi {
    async getUserDetails() {
        try {
            const token = JSON.parse(localStorage.getItem("userInfo")).token;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/profile`, config);
            return data;
        } catch (error) {
            throw error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message;
        }
    }

    async createUser(name, email, password) {
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };

            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register/`, { name, email, password }, config);
            return data;
        } catch (error) {
            throw error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message;
        }
    }

    async updateUser(userId, updateData) {
        try {
            const token = JSON.parse(localStorage.getItem("userInfo")).token;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/api/users/profile/update`, updateData, config);
            return data;
        } catch (error) {
            throw error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message;
        }
    }

    async deleteUser(userId) {
        try {
            const token = JSON.parse(localStorage.getItem("userInfo")).token;

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios.delete(`${process.env.REACT_APP_API_URL}/api/users/delete/${userId}`, config);
        } catch (error) {
            throw error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message;
        }
    }

    async login(email, password) {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login/`, {
                username: email,
                password: password,
            });

            return data;
        } catch (error) {
            throw error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message;
        }
    }
}

const userAPI = new UserApi();

export default userAPI;
