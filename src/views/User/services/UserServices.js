import client from "../../../shared/http-client/client";


export async function getUsers() {
    try {
        const { data: { content } } = await client.get('/user/list');
        return content;
    } catch (e) {

    }

}
export async function getSingleData(id) {
    try {
        const { data } = await client.get(`/user/${id}`);
        return data;
    } catch (e) {
    }
}

export async function getUsername(keyword) {
    try {
        const { data } = await client.get(`/user/username/${keyword}`);
        return data;
    } catch (e) {
    }
}
export async function getEmail(keyword) {
    try {
        const { data } = await client.get(`/user/email/${keyword}`);
        return data;
    } catch (e) {
    }
}
export async function saveUser(user) {
    try {
        const { file, ...otherFile } = { ...user }
        const formUser = new FormData();
        let userString = JSON.stringify(otherFile)
        formUser.append('file', file);
        formUser.append('user', userString)
        const { data: { content } } = await client.post('/user', formUser)
        return content
    } catch (e) {
    }
}
export async function updateUser(user) {
    try {
        const { file, ...otherFile } = { ...user }
        const formUser = new FormData();
        let userString = JSON.stringify(otherFile)
        formUser.append('file', file);
        formUser.append('user', userString)
        const { data: { content } } = await client.put('/user', formUser)
        return content
    } catch (e) {
    }
}
export async function deleteUser(Id) {
    try {
        const response = await client.delete(`/user/${Id}`);
        if (response.status === 200) return true;
        else return false;
    } catch (e) {
    }
}

export async function login(user, password) {
    try {
        const { data } = await client.get(`/user/signin?identity=${user}&password=${password}`);
        return data;
    } catch (e) {
    }
}
