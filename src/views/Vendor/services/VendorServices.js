import client from "../../../shared/http-client/client";

export async function getVendors() {
    try {
        const {data:{content}} =await client.get('/vendor/list');
        return content;
    } catch (e) {
    }

}
export async function getSingleData(id) {
    try {
    const {data} = await  client.get(`/vendor/${id}`);
    return data;
    } catch (e) {
    }
}

export async function getUsername(keyword) {
    try {
    const {data} = await  client.get(`/vendor/username/${keyword}`);
    return data;
    } catch (e) {
    }
}
export async function getEmail(keyword) {
    try {
    const {data} = await  client.get(`/vendor/email/${keyword}`);
    return data;
    } catch (e) {
    }
}
export async function saveVendor(vendor) {
    try {
    const {file, ...otherFile} = {...vendor}
    const formVendor = new FormData();
    let vendorString= JSON.stringify(otherFile)
    formVendor.append('file', file);
    formVendor.append('vendor', vendorString)
    const {data:{content}} = await client.post('/vendor', formVendor)
    return content
    } catch (e) {
    }
}
export async function updateVendor(vendor) {
    try {
    const {file, ...otherFile} = {...vendor}
    const formVendor = new FormData();
        let vendorString= JSON.stringify(otherFile)
    formVendor.append('file', file);
    formVendor.append('vendor', vendorString)
    const {data:{content}} = await client.put('/vendor', formVendor)
    return content
    } catch (e) {
    }
}
export async function deleteVendor(Id) {
    try {
    const response = await client.delete(`/vendor/${Id}`);
    if (response.status===200) return true;
    else return false;
    } catch (e) {
    }
}

export async function login(user,password) {
    try {
        const {data} = await client.get(`http://localhost:8081/vendor/signin?identity=${user}&password=${password}`);
        console.log(data)
        return data;
    } catch (e) {
    }
}
