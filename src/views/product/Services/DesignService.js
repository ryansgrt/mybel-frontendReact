import client from "../../../shared/http-client/client";

export async function getDesigns() {
    try {
        const {data} =await client.get('/design/list');
        return data;
    } catch (e) {
    }

}
export async function getSingleData(id) {
    try {
        const {data} = await  client.get(`/design/${id}`);
        return data;
    } catch (e) {
    }
}

export async function saveDesign(design) {
    try {
        const {file, ...otherFile} = {...design}
        const formDesign = new FormData();
        let designString= JSON.stringify(otherFile)
        formDesign.append('file', file);
        formDesign.append('unit', designString)
        const {data:{content}} = await client.post('/design', formDesign)
        return content
    } catch (e) {
    }
}
export async function updateDesign(design) {
    try {
        const {file, ...otherFile} = {...design}
        const formDesign = new FormData();
        let designString= JSON.stringify(otherFile)
        formDesign.append('file', file);
        formDesign.append('unit', designString)
        const {data:{content}} = await client.put('/design', formDesign)
        return content
    } catch (e) {
    }
}
export async function deleteDesign(Id) {
    try {
        const response = await client.delete(`/design/${Id}`);
        if (response.status===200) return true;
        else return false;
    } catch (e) {
    }
}
