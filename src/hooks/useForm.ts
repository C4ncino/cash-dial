import { useState } from "react";

type UseFormReturn<T> = {
    values: T;
    resetForm: () => void;
    validate: () => boolean;
    setFieldValue: (field: keyof T, value: T[keyof T]) => void;
};

const useForm = <T extends Record<string, any>>(
    initialValues: T
): UseFormReturn<T> => {
    const [values, setValues] = useState<T>(initialValues);

    const setFieldValue = (field: keyof T, value: T[keyof T]) => {
        setValues((oldValues: any) => {
            if (values[field] === value) return oldValues;

            return {
                ...oldValues,
                [field]: value,
            };
        });
    };

    const resetForm = () => setValues(initialValues);

    const validate = () => {
        for (const key of Object.keys(initialValues)) {

            if (
                initialValues[key] !== undefined &&
                (values[key] === undefined ||
                    values[key] === null ||
                    values[key] === "" ||
                    values[key].length === 0
                )
            )
                return false;
            else if (typeof initialValues[key] === "number" && isNaN(Number(values[key]))) return false;
        }

        return true;
    };

    return {
        values,
        resetForm,
        setFieldValue,
        validate,
    };
};

export default useForm;
