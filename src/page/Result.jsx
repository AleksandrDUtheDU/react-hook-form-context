import {
    TableContainer,
    Typography,
    Paper,
    TableHead,
    TableBody,
    TableRow,
    Table,
    TableCell,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

let counter = 0

export const Result = () => {
    const { data } = useData();
    const entries = Object.entries(data).filter((entry) => entry[0] !== "files")
    const { files } = data;

    const onSubmit = async () => {
        const formData = new FormData();
        if (data.files) {
            data.files.forEach((file) => {
                formData.append("files", file, file.name);
            });
        }

        entries.forEach((entry) => {
            formData.append(entry[0], entry[1]);
        });
        console.log(formData)

        const res = await fetch("serv", {
            method: "POST",
            body: formData,
        });

        if (res.status === 200) {
            console.log(res.status)
        } else {
            console.log(res.status)
        }
    };

    counter++

    return (
        <>
            <Typography align='center' component="h2" variant="h6">
                Рендер: {counter}
            </Typography>
            <Typography align='center' component="h2" variant="h6">
                Результат
            </Typography>
            <TableContainer sx={{ mb: 3 }} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Наименование
                            </TableCell>
                            <TableCell align='right'>
                                Значение
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ mb: 3 }}>
                        {
                            entries.map(entry =>

                                <TableRow key={entry[0]}>
                                    <TableCell>
                                        {entry[0]}
                                    </TableCell>
                                    <TableCell align='right'>
                                        {entry[1].toString()}
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer >

            {files && (
                <>
                    <Typography sx={{ mb: 1 }} align='center' component="h2" variant="h6">
                        Файлы
                    </Typography>
                    <List>
                        {files.map((f, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <InsertDriveFileIcon />
                                </ListItemIcon>
                                <ListItemText primary={f.name} secondary={f.size} />
                            </ListItem>
                        ))}
                    </List>
                </>
            )}
            <Button sx={{ mt: 2, mb: 3 }} fullWidth variant='contained' onClick={onSubmit} >
                Отправить
            </Button>
            <Link to='/'>
                <Typography align='center' component="h2" variant="h6">
                    Исправить
                </Typography>
            </Link>
        </>
    );
}
