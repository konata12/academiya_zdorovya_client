import { InputContainerBasicProps } from '@/app/types/ui/form_components/inputContainers.type';
import styles from './BasicInputContainer.module.scss'

export default function BasicInputContainer({
    label,
    inputId,
    error,
    children,
    className,
}: InputContainerBasicProps) {
    
    return (
        <div className={`${styles.inputContainer} ${className?.inputContainer || ''}`}>
            <label
                className={`inputLabel ${className?.inputLabel || ''}`}
                htmlFor={inputId}
            >
                {label}
            </label>

            {children}

            {error && (
                <p className={`${styles.error} ${className?.error || ''}`}>
                    {error.message as string}
                </p>
            )}
        </div>
    );
}