import React, {
  createContext,
  useState,
  useReducer,
  useEffect,
  useContext,
} from "react";
import reducer from "./reducer";
import data from "../data/data.json";
const mainContext = createContext(null);
let initialInvoices = data;
let existingData = localStorage.getItem("savedData");
if (existingData) {
  initialInvoices = JSON.parse(existingData);
} else {
  localStorage.setItem("savedData", JSON.stringify(data));
  initialInvoices = data;
}
export default function AppContext({ children }) {
  const [dark, setDark] = useState(true);
  const [invoices, dispatch] = useReducer(reducer, initialInvoices);
  useEffect(() => {
    localStorage.setItem("savedData", JSON.stringify(invoices));
  }, [invoices]);
  const handleAddInvoice = (invoice) => {
    dispatch({ type: "add", payload: invoice });
  };
  const handleEditInvoice = (id, invoice) => {
    dispatch({ type: "edit", payload: { invoice, id } });
  };
  const handleDeleteInvoice = (id) => {
    dispatch({ type: "remove", payload: { id } });
  };
  const handleMarkAsPaid = (id) => {
    dispatch({ type: "mkap", payload: { id } });
  };
  return (
    <mainContext.Provider
      value={{
        dark,
        setDark,
        invoices,
        dispatch,
        handleAddInvoice,
        handleEditInvoice,
        handleDeleteInvoice,
        handleMarkAsPaid
      }}
    >
      {children}
    </mainContext.Provider>
  );
}

export const mainContextUse = () => {
  return useContext(mainContext);
};
