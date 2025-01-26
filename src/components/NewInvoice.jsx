import React, { useState, useEffect, useRef } from "react";
import NewItem from "./newItem";
import { v4 as uuidv4 } from "uuid";
import DivInput from "./DivInput";
import BillingSection from "./BillingSection";
const initialState = {
  id: uuidv4(),
  createdAt: "",
  paymentDue: "",
  senderAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  clientAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  description: "",
  paymentTerms: 1,
  clientName: "",
  clientEmail: "",
  status: "pending",
  items: [],
  total: 0,
};
function addDaystoDate(date, days) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}
function NewInvoice({ setShowInvoice }) {
  const wrapper = useRef(null);
  const [input, setInput] = useState(initialState);
  const [errors, setErrors] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    if (input.createdAt) {
      let due = addDaystoDate(input.createdAt, input.paymentTerms);
      setInput((old) => {
        return { ...old, paymentDue: due };
      });
    }
    console.log(calCulateTotal());

    setInput((old) => {
      return { ...old, total: calCulateTotal() };
    });
    let problems = new Set();
    for (let outer in input) {
      if (outer == "items") {
        if (input[outer].length == 0) {
          problems.add("at least one item should be added");
        } else {
          let nws = [...input.items];
          nws.forEach((item) => {
            if (item.name === "" || item.name === "empty") {
              item.name = "empty";
              problems.add("all fields must be entered");
            }
          });
          setInput((olda) => {
            return { ...olda, items: [...nws] };
          });
        }
      } else if (typeof input[outer] == "object") {
        let newOuter = {};
        for (let inner in input[outer]) {
          if (input[outer][inner] == "" || input[outer][inner] == "empty") {
            newOuter[inner] = "empty";
            problems.add("all fields must be entered");
          } else {
            newOuter[inner] = input[outer][inner];
          }
        }

        setInput((old) => {
          return {
            ...old,
            [outer]: { ...newOuter },
          };
        });
      } else {
        if (input[outer] == "" || input[outer] == 0) {
          setInput((old) => {
            return { ...old, [outer]: "empty" };
          });
        }
      }
    }

    if (problems.size > 0) {
      setErrors([...problems]);
    }

    console.log(input);

    problems.clear();
  }
  function handleRemoveItem(id) {
    setInput((oldNput) => {
      let newItems = oldNput.items.filter((item) => item.id !== id);
      return { ...oldNput, items: newItems };
    });
  }

  function handleNewItem() {
    setInput((oldI) => {
      return {
        ...oldI,
        items: [
          ...oldI.items,
          {
            id: Math.ceil(Math.random() * 10),
            name: "",
            quantity: 0,
            price: 0,
            total: 0,
          },
        ],
      };
    });
  }
  function calCulateTotal() {
    let total = 0;
    input.items.forEach((item) => {
      total += item.total;
    });
    return total;
  }
  useEffect(() => {
    const handleClick = (event) => {
      if (wrapper.current && wrapper.current.contains(event.target)) {
        setShowInvoice(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <div ref={wrapper} className="wrapperNoSee"></div>
      <section className="NewInvoiceAdd">
        <h3>create invoice</h3>
        <form onSubmit={handleSubmit} className="mainForm">
          <BillingSection input={input} setInput={setInput} />

          <section className="itemList">
            <p className="paero">Item List</p>
            {input.items.map((it) => {
              return (
                <NewItem
                  handleRemoveItem={handleRemoveItem}
                  id={it.id}
                  key={it.id}
                  editItem={setInput}
                  state={it.name}
                />
              );
            })}

            <button
              type="button"
              onClick={() => {
                handleNewItem();
              }}
              className="addNewItem"
            >
              {" "}
              + add new Item
            </button>
          </section>
        </form>
        <div className="formControl">
          <div className="whatWrong">
            {errors.map((error) => {
              return <p key={error}>*{error}</p>;
            })}
          </div>
          <button onClick={() => setShowInvoice(false)} className="discard">
            discard
          </button>
          <button className="saveDraft"> save as draft</button>
          <button onClick={handleSubmit} className="saveSend">
            {" "}
            save and send
          </button>
        </div>
      </section>
    </>
  );
}

export default NewInvoice;
