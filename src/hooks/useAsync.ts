import type React from "react";
import { useEffect, useState } from "react";
import { reactDepsEqual } from "../util/react-deps-equal";

export default function useAsync<T>(fetcher: () => Promise<T>, deps: React.DependencyList) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<unknown>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [prevDeps, setPrevDeps] = useState(deps);

    if (!reactDepsEqual(prevDeps, deps)) {
        setPrevDeps(deps);
        setIsLoading(true);
    }

    useEffect(() => {
        let isActive = true;

        fetcher()
            .then((result) => { if (isActive) setData(result)})
            .catch((err) => { if (isActive) setError(err) })
            .finally(() => { if (isActive) setIsLoading(false) })

        return () => {
            isActive = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)

    if (error) throw error;
    return { data, isLoading };
}