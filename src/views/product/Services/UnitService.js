import client from "../../../shared/http-client/client";

export async function getUnits() {
    try {
        const {data:{content}} =await client.get('/unit/list');
        return content;
    } catch (e) {

    }

}
export async function getSingleData(id) {
    try {
        const {data} = await  client.get(`/unit/${id}`);
        return data;
    } catch (e) {
    }
}

export async function saveUnit(unit) {
    try {
        const {file, ...otherFile} = {...unit}
        const formUnit = new FormData();
        let unitString= JSON.stringify(otherFile)
        formUnit.append('file', file);
        formUnit.append('unit', unitString)
        const {data:{content}} = await client.post('/unit', formUnit)
        return content
    } catch (e) {
    }
}
export async function updateUnit(unit) {
    try {
        const {file, ...otherFile} = {...unit}
        const formUnit = new FormData();
        let unitString= JSON.stringify(otherFile)
        formUnit.append('file', file);
        formUnit.append('unit', unitString)
        const {data:{content}} = await client.put('/unit', formUnit)
        return content
    } catch (e) {
    }
}
export async function deleteUnit(Id) {
    try {
        const response = await client.delete(`/unit/${Id}`);
        if (response.status===200) return true;
        else return false;
    } catch (e) {
    }
}
