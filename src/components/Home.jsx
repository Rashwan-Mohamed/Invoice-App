import React, { useState, useEffect } from "react";
import Header from "./Header";
import { mainContextUse } from "../context";
import { Navigate, useNavigate } from "react-router";
import { formatDate, formatMoney } from "../util";

export default function Home() {
  const { invoices, dark } = mainContextUse();
  const [localInvoices, setLocalInvoices] = useState(invoices);
  const [criteria, setCriteria] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (criteria !== "") {
      setLocalInvoices(invoices.filter((ele) => ele.status == criteria));
    } else {
      setLocalInvoices(invoices);
    }
  }, [criteria, invoices]);

  return (
    <>
      <Header
        number={invoices.length}
        criteria={criteria}
        setCriteria={setCriteria}
      ></Header>
      <main>
        <ul className="listNov">
          {localInvoices.map((inv) => {
            const { id, createdAt, clientName, total, status } = inv;
            return (
              <li
                onClick={() => {
                  navigate(id);
                }}
                className={!dark ? "novo lightre" : "novo"}
                key={id}
              >
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
