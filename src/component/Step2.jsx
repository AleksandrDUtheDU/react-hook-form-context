import { Typography, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { FormWrapp } from './FormWrapp';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { CustomButton } from './CustomButton';
import { useData } from '../context/DataContext';


let counter = 0

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Введите корректный e-mail. (пример: example@mail.ru)")
        .required("Поле 'Email' должно быть заполнено")
})

export const Step2 = () => {
    const navigate = useNavigate();
    const { data, setValues } = useData();
    const { handleSubmit, formState: { errors }, control, watch } = useForm({
        defaultValues: {
            email: data.email,
            hasPhone: data.hasPhone,
            phone: data.phone,
        },
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const hasPhone = watch("hasPhone")

    const normalizePhoneNumber = (value) => {
        const phoneNumber = parsePhoneNumberFromString(value)
        if (!phoneNumber) {
            return value
        }

        return (
            phoneNumber.formatInternational()
        )
    }

    const onSubmit = (data) => {
        setValues(data)
        navigate("/step3")
    }

    counter++

    return (
        <>
            <Typography align='center' component="h2" variant="h6">
                Рендер: {counter}
            </Typography>

            <Typography align='center' component="h2" variant="h6">
                Шаг 2
            </Typography>
            <FormWrapp onSubmit={handleSubmit(onSubmit)} noValidate>
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextField
                            variant='outlined'
                            margin='normal'
                            id='email'
                            type="email"
                            label="Email"
                            required
                            error={!!errors.email}
                            helperText={errors?.email?.message}
                            {...field}
                            fullWidth
                        />
                    )}
                />
                <Controller
                    name="hasPhone"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            labelPlacement="end"
                            label="У Вас есть телефон?"
                            control={
                                <Checkbox
                                    color="primary"
                                    onChange={(e) => field.onChange(e.target.checked)}
                                    checked={field.value}
                                />
                            }
                        />
                    )}
                />
                {
                    hasPhone && (
                        <Controller
                            name="phone"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <TextField
                                    variant='outlined'
                                    margin='normal'
                                    id='phone'
                                    type="phone"
                                    label="Телефон"
                                    required
                                    {...field}
                                    onChange={(e) => field.onChange(normalizePhoneNumber(e.target.value))}
                                    fullWidth
                                />
                            )}
                        />
                    )
                }
                <CustomButton>
                    Далее
                </CustomButton>
            </FormWrapp>
        </>
    );
}
