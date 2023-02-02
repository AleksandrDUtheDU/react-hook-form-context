import { Typography } from '@mui/material';
import { FormWrapp } from '../component/FormWrapp';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../component/CustomButton';
import { FileInput } from '../component/FileInput';
import { useData } from '../context/DataContext';

let counter = 0

export const Step3 = () => {
    const navigate = useNavigate();
    const { data, setValues } = useData();

    const { handleSubmit, control } = useForm({
        defaultValues: {
            files: data.files,
        },
        mode: 'onBlur',
    })

    const onSubmit = (data) => {
        setValues(data)
        navigate("/result")
    }

    counter++

    return (
        <>
            <Typography align='center' component="h2" variant="h6">
                Рендер: {counter}
            </Typography>
            <Typography align='center' component="h2" variant="h6">
                Шаг 3
            </Typography>
            <FormWrapp onSubmit={handleSubmit(onSubmit)} noValidate>
                <FileInput
                    name="files"
                    control={control}
                />
                <CustomButton>
                    Далее
                </CustomButton>
            </FormWrapp>
        </>
    );
}
