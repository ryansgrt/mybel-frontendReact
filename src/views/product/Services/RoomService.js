import client from "../../../shared/http-client/client";

export async function getRooms() {
    try {
        const {data} =await client.get('/room/list');
        return data;
    } catch (e) {
    }

}
export async function getRoomByName(keyword) {
    try {
        const {data} = await  client.get(`/room/${keyword}`);
        return data;
    } catch (e) {
    }
}

export async function getSingleData(id) {
    try {
        const {data} = await  client.get(`/room/${id}`);
        return data;
    } catch (e) {
    }
}

export async function saveRoom(room) {
    try {
        const {file, ...otherFile} = {...room}
        const formRoom = new FormData();
        let roomString= JSON.stringify(otherFile)
        formRoom.append('file', file);
        formRoom.append('room', roomString)
        const {data:{content}} = await client.post('/room', formRoom)
        return content
    } catch (e) {
    }
}
export async function updateRoom(room) {
    try {
        const {file, ...otherFile} = {...room}
        const formRoom = new FormData();
        let roomString= JSON.stringify(otherFile)
        formRoom.append('file', file);
        formRoom.append('room', roomString)
        const {data:{content}} = await client.put('/room', formRoom)
        return content
    } catch (e) {
    }
}
export async function deleteRoom(Id) {
    try {
        const response = await client.delete(`/room/${Id}`);
        if (response.status===200) return true;
        else return false;
    } catch (e) {
    }
}
