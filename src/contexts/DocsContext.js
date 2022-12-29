const { useState } = require("react");
const { createContext } = require("react");

export const DocsContext = createContext({
    data: [],
    setData: (data) => {},
    add: (item) => {},
    delete: (item) => {}
})

const DocsContextProvider = ({ children }) => {
    const [data, setData] = useState([])
    const value = {
        data: data,
        add: (item) => {
            console.log('inside Docscontext add')
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
        <DocsContext.Provider value={value}>
            {children}
        </DocsContext.Provider>
    )
}

export default DocsContextProvider