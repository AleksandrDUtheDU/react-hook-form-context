import { Controller } from "react-hook-form"
import Dropzone from "react-dropzone";
import { List, ListItem, ListItemIcon, ListItemText, Paper } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export const FileInput = ({ control, name }) => {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={[]}
            render={({ field: { onChange, onBlur, value } }) => (
                <>
                    <Dropzone onDrop={onChange}>
                        {({ getRootProps, getInputProps }) => (
                            <Paper
                                sx={{
                                    backgroundColor: "#eee",
                                    textAlign: "center",
                                    cursor: "pointer",
                                    color: "#333",
                                    padding: "10px",
                                    marginTop: "20px",
                                }}
                                variant='outlined'
                                {...getRootProps()}
                            >
                                <CloudUploadIcon
                                    sx={{
                                        marginTop: "16px",
                                        color: "#888888",
                                        fontSize: "42px",
                                    }}
                                />
                                <input {...getInputProps()} name={name} onBlur={onBlur} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </Paper>
                        )
                        }
                    </Dropzone>
                    <List>
                        {value?.map((f, index) => (
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
        />
    )
}
