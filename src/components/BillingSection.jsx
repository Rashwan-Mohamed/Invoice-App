import React, { useState } from "react";
import DivInput from "./DivInput";

export default function BillingSection({ input, setInput }) {
  const handleTermsChange = (event) => {
    setInput((old) => {
      return { ...old, paymentTerms: event.target.value };
    });
  };
  return (
    <>
      {" "}
      <section className="billFrom">
        <p>bill from</p>
        <DivInput
          className="StreetAddress"
          type="text"
          name="address"
          text="Street Address"
          setInput={(erer) =>
            setInput((old) => {
              return {
                ...old,
                clientAddress: {
                  ...old.clientAddress,
                  street: erer,
                },
              };
            })
          }
          value={input.clientAddress.street}
          stop={input.clientAddress.street === "empty"}
        ></DivInput>
        <DivInput
          className="CityName"
          type="text"
          name="City"
          text="City"
          setInput={(erer) =>
            setInput((old) => {
              return {
                ...old,
                clientAddress: {
                  ...old.clientAddress,
                  city: erer,
                },
              };
            })
          }
          value={input.clientAddress.city}
          stop={input.clientAddress.city === "empty"}
        ></DivInput>
        <DivInput
          className="PostCode"
          type="Post"
          name="Post"
          text="Post Code"
          setInput={(erer) =>
            setInput((old) => {
              return {
                ...old,
                clientAddress: {
                  ...old.clientAddress,
                  postCode: erer,
                },
              };
            })
          }
          test={(input) => {
            let res = Number(input);

            return typeof res === "number" && !isNaN(res);
          }}
          message={"input should be a number"}
          value={input.clientAddress.postCode}
          stop={input.clientAddress.postCode === "empty"}
        ></DivInput>
        <DivInput
          className="CountryName"
          type="Country"
          name="Country"
          text="Country"
          setInput={(erer) =>
            setInput((old) => {
              return {
                ...old,
                clientAddress: {
                  ...old.clientAddress,
                  country: erer,
                },
              };
            })
          }
          value={input.clientAddress.country}
          stop={input.clientAddress.country === "empty"}
        ></DivInput>
      </section>
      <section className="billTo">
        {" "}
        <p>Bill To</p>
        <DivInput
          className="ClientName"
          type="text"
          name="Client"
          text="Client Name"
          setInput={(erer) =>
            setInput((old) => {
              return {
                ...old,
                clientName: erer,
              };
            })
          }
          value={input.clientName}
          stop={input.clientName === "empty"}
        ></DivInput>
        <DivInput
          className="ClientsEmail"
          type="email"
          name="email"
          text="email"
          setInput={(erer) =>
            setInput((old) => {
              return {
                ...old,
                clientEmail: erer,
              };
            })
          }
          test={(input) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return typeof input === "string" && emailRegex.test(input);
          }}
          message={"please enter a valid email address!"}
          value={input.clientEmail}
          stop={input.clientEmail === "empty"}
        ></DivInput>
                <DivInput
          className="StreetAddress"
          type="text"
          name="address"
          text="Street Address"
          setInput={(erer) =>
            setInput((old) => {
              return {
                ...old,
                senderAddress: {
                  ...old.senderAddress,
                  street: erer,
                },
              };
            })
          }
          value={input.senderAddress.street}
          stop={input.senderAddress.street === "empty"}
        ></DivInput>
        <div className="threeDivs">
          <DivInput
            className="CityName"
            type="text"
            name="City"
            text="City"
            setInput={(erer) =>
              setInput((old) => {
                return {
                  ...old,
                  senderAddress: {
                    ...old.senderAddress,
                    city: erer,
                  },
                };
              })
            }
            value={input.senderAddress.city}
            stop={input.senderAddress.city === "empty"}
          ></DivInput>
          <DivInput
            className="PostCode"
            type="text"
            name="Post"
            text="Post Code"
            setInput={(erer) =>
              setInput((old) => {
                return {
                  ...old,
                  senderAddress: {
                    ...old.senderAddress,
                    postCode: erer,
                  },
                };
              })
            }
            test={(input) => {
              let res = Number(input);
              return typeof res === "number" && !isNaN(res);
            }}
            message={"input should be a number"}
            value={input.senderAddress.postCode}
            stop={input.senderAddress.postCode === "empty"}
          ></DivInput>
          <DivInput
            className="CountryName"
            type="Country"
            name="Country"
            text="Country"
            setInput={(erer) =>
              setInput((old) => {
                return {
                  ...old,
                  senderAddress: {
                    ...old.senderAddress,
                    country: erer,
                  },
                };
              })
            }
            value={input.senderAddress.country}
            stop={input.senderAddress.country === "empty"}
          ></DivInput>
        </div>
        <article>
          <DivInput
            className="pickDate"
            type="date"
            name="date"
            text="Invoice Date"
            setInput={(erer) =>
              setInput((old) => {
                return {
                  ...old,
                  createdAt: erer,
                };
              })
            }
            value={input.createdAt}
            stop={input.createdAt === "empty"}
          ></DivInput>

          <div className="dropDown">
            <label htmlFor="drop">Payment Terms</label>
            <select
              value={input.paymentTerms}
              onChange={handleTermsChange}
              name="drop"
              id="drop"
            >
              <option className="rers" value="1">
                New 1 Day
              </option>
              <option value="7">New 7 Day</option>
              <option value="14">New 14 Day</option>
              <option value="30">New 30 Day</option>
            </select>
          </div>
        </article>
        <DivInput
          className="desc"
          type="text"
          name="Description"
          text="Description"
          setInput={(erer) =>
            setInput((old) => {
              return {
                ...old,
                description: erer,
              };
            })
          }
          value={input.description}
          stop={input.description === "empty"}
        ></DivInput>
      </section>
    </>
  );
}
