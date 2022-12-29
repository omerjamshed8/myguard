const { useState } = require("react");
const { createContext } = require("react");

export const UnavailContext = createContext({
    data: [],
    setData: (data) => {},
    add: (item) => {},
    delete: (item) => {}
})

const UnavailContextProvider = ({ children }) => {
    const [data, setData] = useState([])
    const value = {
        data: data,
        add: (item) => {
            console.log('inside context add')
            setData(old => ([...old, item]))
        },
        delete: (item) => {
            setData(data.filter(i => i !== item))
        },
        setData: (items) => {
            setData(items)
        }
    }
    return (
        <UnavailContext.Provider value={value}>
            {children}
        </UnavailContext.Provider>
    )
}

export default UnavailContextProvider