import { useCallback } from "react";

export const useCombinedRefs = <T,>(...refs: React.Ref<T>[]) => {
    return useCallback((handle: T) => {
        // console.log('useCombinedRefs')
        refs.forEach(ref => {
            if (!ref) return;

            if (typeof ref === 'function') {
                ref(handle); // Handle callback refs
            } else {
                (ref as React.RefObject<T>).current = handle; // Handle object refs
            }
        });
    }, refs); // Only recreate if refs change
}