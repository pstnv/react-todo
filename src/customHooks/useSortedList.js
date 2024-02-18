import { useMemo } from "react";
import sortList from "../utils/sortList";

function useSortedList(isLoading, list, selectedSort) {
    const sortedList = useMemo(() => {
        if (isLoading) {
            return list;
        }
        const sortedListData = sortList(selectedSort, list);
        return sortedListData;
    }, [selectedSort, list, isLoading]);
    return sortedList;
}

export default useSortedList;
