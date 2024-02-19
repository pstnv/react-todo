function sortList(selectedSorting, list) {
    const currentList = [...list];
    const sortList = {
        asc(list) {
            list.sort((objectA, objectB) => {
                const property = objectA.hasOwnProperty("title")
                    ? "title"
                    : "name";
                return objectA[property].localeCompare(objectB[property]);
            });
        },
        desc(list) {
            list.sort((objectA, objectB) => {
                const property = objectA.hasOwnProperty("title")
                    ? "title"
                    : "name";
                return objectB[property].localeCompare(objectA[property]);
            });
        },
        edit(list) {
            list.sort(
                (objectA, objectB) =>
                    new Date(objectB.edited) - new Date(objectA.edited)
            );
        },
        new(list) {
            list.sort(
                (objectA, objectB) =>
                    new Date(objectB.createdTime) -
                    new Date(objectA.createdTime)
            );
        },
        old(list) {
            list.sort(
                (objectA, objectB) =>
                    new Date(objectA.createdTime) -
                    new Date(objectB.createdTime)
            );
        },
    };
    sortList[selectedSorting](currentList);
    return currentList;
}

export default sortList;
