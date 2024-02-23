import { useMemo } from "react";
import sortList from "../utils/sortList";

function useFilteredLists(lists, isLoading) {
    const filteredLists = useMemo(() => {
        if (isLoading) {
            return lists;
        }
        const filteredListsData = lists.filter(
            (list) => list.name !== list.id && list.description !== "deleted"
        );
        return filteredListsData;
    }, [lists, isLoading]);
    return filteredLists;
}

function useFilteredAndSortedLists(isLoading, lists, sortOption) {
    const filteredLists = useFilteredLists(lists, isLoading);
    const filteredAndSortedLists = useMemo(() => {
        if (isLoading) {
            return filteredLists;
        }
        const filteredAndSortedListsData = sortList(sortOption, filteredLists);
        return filteredAndSortedListsData;
    }, [filteredLists, sortOption, isLoading]);
    return filteredAndSortedLists;
}

export { useFilteredAndSortedLists };
