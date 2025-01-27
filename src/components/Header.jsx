import React, { useState, useRef, useEffect } from "react";
import NewInvoice from "./NewInvoice";
import { mainContextUse } from "../context";

export default function Header({ criteria, setCriteria, number }) {
  const [show, setShow] = useState(false);
  const compoenentRef = useRef(null);
  const openRef = useRef(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const { dark } = mainContextUse();

  function handleCriteria(status) {
    setCriteria(status);
  }
  useEffect(() => {
    function handleDocumentClick(event) {
      if (
        compoenentRef.current &&
        !compoenentRef.current.contains(event.target) &&
        !openRef.current.contains(event.target)
      ) {
        setShow(false);
      }
    }
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);
  useEffect(() => {
    if (showInvoice) {
      document.body.classList.add("Rashwan");
    } else {
      document.body.classList.remove("Rashwan");
    }
  }, [showInvoice]);

  const status = ["paid", "pending", "draft"];
  return (
    <>
      {showInvoice && <NewInvoice setShowInvoice={setShowInvoice} />}
      <header className="mainHeader">
        <div className="leftNovices">
          <h3>Invoices</h3>
          <p>There are {number} total invoices.</p>
        </div>
        <div className="btns">
          <div className="btnsWrapper filterStatus">
            <button
              ref={openRef}
              onClick={() => setShow(!show)}
              className={!dark ? "filterStatus wfilterStatus" : "filterStatus"}
            >
              filter by status{" "}
              <span className={show ? "translate" : ""}>
                <img src="images/icon-arrow-down.svg" alt="" />
              </span>
            </button>
            {show && (
              <div
                ref={compoenentRef}
                className={!dark ? "dropMenu wdropMenu" : "dropMenu"}
              >
                <ul>
                  {status.map((stat) => {
                    return (
                      <li
                        key={stat}
                        onClick={() => {
                          if (criteria === stat) {
                            handleCriteria("");
                          } else {
                            handleCriteria(stat);
                          }
                        }}
                      >
                        <div
                          className={
                            criteria === stat ? "box chosenState" : "box"
                          }
                        >
                          {criteria == stat && (
                            <img src="images/icon-check.svg" alt="" />
                          )}
                        </div>

                        {stat}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          <button
            onClick={() => setShowInvoice(!showInvoice)}
            className="newInvoive"
          >
            <span>
              {" "}
              <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z"
                  fill="#7C5DFA"
                  fillRule="nonzero"
                />
              </svg>
            </span>
            new invoice
          </button>
        </div>
      </header>
    </>
  );
}
