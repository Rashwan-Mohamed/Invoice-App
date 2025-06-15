import React, { useState, useEffect } from "react";
import DivInput from "./DivInput";

export default function NewItem({
  handleRemoveItem,
  id,
  editItem,
  state,
  items,
  edit,
  singleItem,
}) {
  const initialItem = {
    id,
    name: "",
    quantity: 0,
    price: 0,
    total: 0,
  };
  const [itemPro, setItemPro] = useState(edit ? singleItem : initialItem);
  useEffect(() => {
    let soItems = [];
    soItems = items.map((item) => {
      if (item.id == id) {
        return itemPro;
      } else {
        return item;
      }
    });
    editItem(soItems);
  }, [itemPro]);
  const updateTotal = () => {
    setItemPro((old) => {
      return { ...old, total: old.price * old.quantity };
    });
  };
  return (
    <>
      <div className="wrapAlso">
        {" "}
        <DivInput
          className="ItemName"
          type="text"
          name="Item"
          text="Item"
          setInput={(erer) =>
            setItemPro((old) => {
              return {
                ...old,
                name: erer,
              };
            })
          }
          value={itemPro.name}
          stop={state === "empty"}
        />
        <DivInput
          className="ItemQuan"
          type="text"
          name="Quatntity"
          text="Qty"
          test={(input) => {
            let res = Number(input);
            return typeof res === "number" && !isNaN(res);
          }}
          message={"input should be a number"}
          setInput={(erer) => {
            setItemPro((old) => {
              return {
                ...old,
                quantity: erer,
              };
            });
            updateTotal();
          }}
          value={itemPro.quantity}
        />
        <DivInput
          className="ItemPrice"
          type="text"
          name="Price"
          text="Price"
          setInput={(erer) => {
            setItemPro((old) => {
              return {
                ...old,
                price: erer,
              };
            });
            updateTotal();
          }}
          value={itemPro.price}
          test={(input) => {
            let res = Number(input);

            return typeof res === "number" && !isNaN(res);
          }}
          message={"input should be a number"}
        />
        <div className="total">
          <label htmlFor="">Total</label>
          <p> {itemPro.total} </p>
        </div>
        <button onClick={() => handleRemoveItem(id)}>
          <img src="images/icon-delete.svg" alt="" />
        </button>
      </div>
    </>
  );
}
