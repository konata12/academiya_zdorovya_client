import { useCallback } from "react";

export const useCombinedRefs = <T,>(...refs: React.Ref<T>[]) => {
    return useCallback((handle: T | null) => {
        refs.forEach(ref => {
            if (!ref) return;

            if (typeof ref === 'function') {
                ref(handle); // Handle callback refs
            } else {
                // Use type assertion to handle RefObject
                (ref as React.RefObject<T | null>).current = handle;
            }
        });
    }, refs);
}