async function apiGet(action){

    const response =
    await fetch(
        `${API_URL}?action=${action}`
    );

    return await response.json();
}

async function apiPost(data){

    const response =
    await fetch(API_URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    });

    return await response.json();
}