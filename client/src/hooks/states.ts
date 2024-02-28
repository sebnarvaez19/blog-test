import { useState } from "react";

export function useFilterState() {
    const [filtered, setFiltered] = useState<boolean>(false)

    return [filtered, setFiltered]
}