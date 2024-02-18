function sortList(selectedSorting, list) {
    const currentList = [...list];
    const sortList = {
        asc(list) {
            list.sort((objectA, objectB) =>
                objectA.title.localeCompare(objectB.title)
            );
        },
        desc(list) {
            list.sort((objectA, objectB) =>
                objectB.title.localeCompare(objectA.title)
            );
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