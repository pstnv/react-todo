const tokenAPI = process.env.REACT_APP_AIRTABLE_API_TOKEN;

export const options = {
    get: {
        method: "GET",
    },
    post(body) {
        return {
            method: "POST",
            body: JSON.stringify(body),
        };
    },
    patch(body) {
        return {
            method: "PATCH",
            body: JSON.stringify(body),
        };
    },
    delete: {
        method: "DELETE",
    },
};

export const fetchData = async (urlAPI, params, id = "") => {
    const options = {
        ...params,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenAPI}`,
        },
    };
    const url = id ? `${urlAPI}/${id}` : urlAPI;
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
};
