
export const fetchSocialData = async (url, data) => {
    try {
        // Opciones por defecto estan marcadas con un *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        // console.log(await response.json());
        // if (response.ok) return await response.json(); // parses JSON response into native JavaScript objects
        // else return Promise.reject('No connection');

        return await response.json();
    } catch (error) {
        // console.log({error});
        throw new Error(
            `
            Problemas en la conexion con la API.
            (${url})
            `
        );
    }
}
