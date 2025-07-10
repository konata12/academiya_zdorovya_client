import type { ImageInputContainer } from "@/app/types/ui/form_components/inputContainers.type";

export function ImageInputContainer({
    label = 'Завантажити',
    inputId,
    changeEvent,
    children,
}: ImageInputContainer) {
    console.log(inputId)
    return (
        <>
            <input
                id={inputId}
                type="file"
                hidden
                onChange={changeEvent}
            />
            <label
                className={`btn blue sm`}
                htmlFor={inputId}
            >
                {label}
            </label>

            {children}
        </>
    )
}