import client from "../../../shared/http-client/client";

export async function getTypes() {
    try {
        const {data:{content}} =await client.get('/type/list');
        return content;
    } catch (e) {
    }

}
export async function getTypeByName(name) {
    try {
        const response = await client.get(`/type/name/${name}`);
        return response.data
    }catch (e) {
    }
}
export async function getSingleData(id) {
    try {
        const {data} = await  client.get(`/type/${id}`);
        return data;
    } catch (e) {
    }
}

export async function saveType(type) {
    try {
        const {file, ...otherFile} = {...type}
        const formType = new FormData();
        let typeString= JSON.stringify(otherFile)
        formType.append('file', file);
        formType.append('type', typeString)
        const {data:{content}} = await client.post('/type', formType)
        return content
    } catch (e) {
    }
}
export async function updateType(type) {
    try {
        const {file, ...otherFile} = {...type}
        const formType = new FormData();
        let typeString= JSON.stringify(otherFile)
        formType.append('file', file);
        formType.append('type', typeString)
        const {data:{content}} = await client.put('/type', formType)
        return content
    } catch (e) {
    }
}
export async function deleteType(Id) {
    try {
        const response = await client.delete(`/type/${Id}`);
        if (response.status===200) return true;
        else return false;
    } catch (e) {
    }
}
