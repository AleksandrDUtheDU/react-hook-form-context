import { Typography, TextField } from '@mui/material';
import { FormWrapp } from './FormWrapp';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from './CustomButton';
import { useData } from '../context/DataContext';

let counter = 0

const schema = yup.object().shape({
    firstName: yup
        .string()
        .matches(/^([^0-9]*)$/, "Поле 'Имя' не должно содержать цифры")
        .required("Поле 'Имя' должно быть заполнено"),
    lastName: yup
        .string()
        .matches(/^([^0-9]*)$/, "Поле 'Фамилия' не должно содержать цифры")
        .required("Поле 'Фамилия' должно быть заполнено"),
})

export const Step1 = () => {
    const navigate = useNavigate(); // актуально использовать navigate вместо history 
    const { data, setValues } = useData();
    const { handleSubmit, formState: { errors }, control } = useForm({
        defaultValues: {
            firstName: data.firstName,
            lastName: data.lastName,
        },
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) => {
        setValues(data)
        navigate("/step2")
    }

    counter++



    return (
        <>
            <Typography align='center' component="h2" variant="h6">
                Рендер: {counter}
            </Typography>

            <Typography align='center' component="h2" variant="h6">
                Шаг 1
            </Typography>
            <FormWrapp onSubmit={handleSubmit(onSubmit)} noValidate>
                <Controller
                    name="firstName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextField
                            variant='outlined'
                            margin='normal'
                            type="text"
                            label="Имя"
                            error={!!errors.firstName}
                            helperText={errors?.firstName?.message}
                            {...field}
                            fullWidth
                        />
                    )}
                />
                <Controller
                    name="lastName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextField
                            variant='outlined'
                            margin='normal'
                            type="text"
                            label="Фамилия"
                            error={!!errors.lastName}
                            helperText={errors?.lastName?.message}
                            {...field}
                            fullWidth
                        />
                    )}
                />

                <CustomButton>
                    Далее
                </CustomButton>
            </FormWrapp>
        </>
    );
}
