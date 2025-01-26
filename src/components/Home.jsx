import React, { useState, useEffect } from "react";
import Header from "./Header";
import { mainContextUse } from "../context";

export default function Home() {
  const formatDate = (date) => {
    const fDate = new Date(date);
    return fDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };
  const { invoices: data } = mainContextUse();
  const [invoices, setInvoices] = useState(data);
  const [criteria, setCriteria] = useState("");
  useEffect(() => {
    if (criteria !== "") {
      setInvoices(data.filter((ele) => ele.status == criteria));
    } else {
      setInvoices(data);
    }
  }, [criteria]);
  return (
    <>
      <Header
        number={invoices.length}
        criteria={criteria}
        setCriteria={setCriteria}
      ></Header>
      <main>
        <ul className="listNov">
          {invoices.map((inv) => {
            const { id, createdAt, clientName, total, status } = inv;
            return (
              <li className="novo" key={id}>
                <p className="paraID">
                  {" "}
                  <span>#</span>
                  {id}
                </p>
                <h4 className="createdAt">Due {formatDate(createdAt)}</h4>
                <p className="clienName">{clientName}</p>
                <h3 className="headerTj">{formatMoney(total)}</h3>
                <span
                  className={status == "paid" ? "OuSpan" : `${status} OuSpan`}
                >
                  {" "}
                  <span className="InSpan"></span> <span>{status}</span>
                </span>
                <button className="backNot">
                  {" "}
                  <img src="images/icon-arrow-right.svg" alt="" />
                </button>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
