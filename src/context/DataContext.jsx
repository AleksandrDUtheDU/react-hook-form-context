import { createContext, useContext, useState } from "react";

const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        hasPhone: false,
        phone: '',
        files: [],
    }); //Redux ....

    const setValues = (values) => {
        setData(pervData => ({
            ...pervData,
            ...values
        }))
    }

    return (
        <DataContext.Provider value={{ data, setValues }}>
            {children}
        </DataContext.Provider>
    )
}


export const useData = () => useContext(DataContext)