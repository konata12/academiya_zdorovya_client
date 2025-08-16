import { useAppDispatch } from "@/app/utils/redux/hooks"
import { setFormDefaultValuesNavigation } from "@/app/utils/redux/navigation/navigationSlice"
import _ from "lodash"
import { useEffect, useRef, useState } from "react"

export function useFormChangeCheck(oldValue: any, newValue: any) {
    const [formDefaultValues, setFormDefaultValues] = useState(true)
    const formDefaultValuesRef = useRef(formDefaultValues)

    const dispatch = useAppDispatch()

    // CHECK IF FORM DATA IS DEFAULT
    useEffect(() => {
        const equal = _.isEqual(newValue, oldValue)
        setFormDefaultValues(equal)
    }, [newValue, oldValue])

    // Update the ref whenever formDefaultValues changes
    useEffect(() => {
        formDefaultValuesRef.current = formDefaultValues
        // update defaultValues state in redux
        dispatch(setFormDefaultValuesNavigation(formDefaultValuesRef.current))

        // after leaving page set formDefaultValues in redux to initial
        return () => {
            dispatch(setFormDefaultValuesNavigation(true))
        }
    }, [formDefaultValues])

    // CREATE QUIT PAGE LISTENERS
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (!formDefaultValuesRef.current) {
                e.preventDefault()
                e.returnValue = ''
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [])
}