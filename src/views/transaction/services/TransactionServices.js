import client from "../../../shared/http-client/client";

export async function getTransactions() {
    const data =await client.get('/transaction/list');
    return data;
}


export async function createTransaction(transaction) {
    console.log(transaction, "isi service")
    const data= await  client.post('/transaction', transaction);
    return data;
}

export async function updateTransaction(transaction) {
    const {data:{content}} = await client.put('/transaction',transaction)
    return content;

}

export async function deleteTransaction(Id) {
    const response = await client.delete(`/transaction/${Id}`);

    if (response.status===200) return true;
    else return false;

}
