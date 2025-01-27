import React, { useEffect, useState } from "react";
import { mainContextUse } from "../context";
import { useNavigate, useParams } from "react-router";
import { formatDate, formatMoney } from "../util";

export default function Invoice() {
  const { invoices } = mainContextUse();
  let params = useParams();
  const [mainVoince, setMainVoice] = useState(() => {
    let temp;
    invoices.forEach((nov) => {
      if (nov.id == params.invoice) {
        temp = nov;
      }
    });
    return temp;
  });
  const nave = useNavigate();
  const {
    id,
    createdAt,
    paymentDue,
    senderAddress,
    clientAddress,
    description,
    paymentTerms,
    clientName,
    clientEmail,
    status,
    items,
    total,
  } = mainVoince;
  const {
    street: senderStreet,
    city: senderCity,
    country: senderCountry,
    postCode: senderCode,
  } = senderAddress;
  const {
    street: clientStreet,
    city: clientCity,
    country: clientCountry,
    postCode: clientCode,
  } = clientAddress;
  useEffect(() => {
    setMainVoice(() => {
      let temp;
      invoices.forEach((nov) => {
        if (nov.id == params.invoice) {
          temp = nov;
        }
      });
      return temp;
    });
  }, [params]);

  return (
    <section className="viewInvoice">
      <button onClick={() => nave("/")} className="backGoo">
        {" "}
        <span className="bIcong">
          <img src="images/icon-arrow-left.svg" alt="go back" />
        </span>{" "}
        Go Back
      </button>
      <article className="artFie firstTickle">
        <div className="leftSer">
          <label htmlFor="">status</label>
          <span
            className={
              status == "paid" ? "OuSpan Noses" : `${status} OuSpan Noses`
            }
          >
            {" "}
            <span className="InSpan"></span> <span>{status}</span>
          </span>
        </div>
        <div className="rightSer">
          <button className="rgEdit">Edit</button>
          <button className="rgDelete">Delete</button>
        </div>
      </article>
      <article className="artFie secondTickle">
        <div className="rightUpper">
          <p className="paraID NowIdF">
            {" "}
            <span>#</span>
            {id}
          </p>
          <span className="textNext">{description}</span>
        </div>

        <address className="address clientAdress leftUpper textNext">
          {senderStreet}
          <br />
          {senderCity}
          <br />
          {senderCode}
          <br />
          {senderCountry}
        </address>
        <article className="midArticle">
          <div className="invoiceDate">
            <p className="textNext">Invoice Date</p>
            <h4>{formatDate(createdAt)}</h4>
          </div>
          <div className="billToos">
            <p className="textNext">bill to</p>
            <address className="ceTer textNext">
              <h4>{clientName}</h4>
              {clientStreet}
              <br />
              {clientCity}
              <br />
              {clientCode}
              <br />
              {clientCountry}
            </address>
          </div>
          <div className="sentToo">
            <p className="textNext">sent to</p>
            <h4>{clientEmail}</h4>
          </div>
          <div className="paymentDue">
            <p className="textNext">payment Due</p>
            <h4>{formatDate(paymentDue)}</h4>
          </div>
        </article>
        <footer className="articleFooter">
          <article className="tableLike">
            <ul>
              <p className="textNext">item name</p>
              <p className="textNext">Qty</p>
              <p className="textNext">price</p>
              <p className="textNext">total</p>
              {items.map((item) => {
                const { name, quantity, price, total, id } = item;
                return (
                  <li className="itemViewDis" key={id ?? name}>
                    {" "}
                    <h4>{name}</h4>
                    <h4>{quantity}</h4>
                    <h4>{price}</h4>
                    <h4>{total}</h4>
                  </li>
                );
              })}
            </ul>
          </article>
          <div className="summaryl">
            <p>amount due</p>
            <h3>{total}</h3>
          </div>
        </footer>
      </article>
    </section>
  );
}
