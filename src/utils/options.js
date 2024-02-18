const options = {
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
export default options;
