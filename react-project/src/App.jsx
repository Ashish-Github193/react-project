import { useCallback, useState } from "react";
import NameCardData from "./data";
import "./App.css";

function NameCard({ Name, Dob, Profession, PhoneNumber }) {
  return (
    <div className="card">
      <div className="card-sec-left">
        <div>Name: {Name}</div>
        <div>Dob: {Dob}</div>
        <div>Profession: {Profession}</div>
        <div>Contact: {PhoneNumber}</div>
      </div>
      <div className="card-sec-right">
        <img src="https://via.placeholder.com/150" alt="profile" />
      </div>
    </div>
  );
}

function NameCardContentDiv({ index, MaxNameCardPerPage }) {
  const data = NameCardData();

  function AddNameCards() {
    let NameCards = [];
    for (
      let i = (index - 1) * MaxNameCardPerPage;
      i < index * MaxNameCardPerPage;
      i++
    ) {
      let PersonDetails = data[i];
      if (PersonDetails == undefined) {
        continue;
      }

      NameCards.push(
        <NameCard
          key={i}
          Name={PersonDetails.Name}
          Dob={PersonDetails.Dob}
          Profession={PersonDetails.Profession}
          PhoneNumber={PersonDetails.PhoneNumber}
        />
      );
    }
    return NameCards;
  }

  return (
    <>
      <div className="name-card-ctn">{AddNameCards()}</div>
    </>
  );
}

function PageIndex({ name, index, setIndex }) {
  const UpdateIndex = () => {
    if (typeof name === "number") {
      setIndex(name);
    } else if (name === "Prev") {
      setIndex(index - 1);
    } else if (name === "Next") {
      setIndex(index + 1);
    }
  };

  return (
    <div className="page-index" onClick={UpdateIndex}>
      {name}
    </div>
  );
}

function Pagination({ index, setIndex, dataLength, MaxNameCardPerPage }) {
  const NumberOfPages = Math.ceil(dataLength / MaxNameCardPerPage);

  return (
    <div className="pagination">
      <PageIndex name={"Prev"} index={index} setIndex={setIndex} key={0} />
      {Array.from({ length: NumberOfPages }).map((_, index) => (
        <PageIndex name={index + 1} key={index + 1} setIndex={setIndex} />
      ))}
      <PageIndex
        name={"Next"}
        index={index}
        setIndex={setIndex}
        key={dataLength}
      />
    </div>
  );
}

export default function App() {
  const MaxNameCardPerPage = 20;
  const [index, setIndex] = useState(1);

  return (
    <>
      <h1 className="heading">Name Cards</h1>
      <NameCardContentDiv
        index={index}
        MaxNameCardPerPage={MaxNameCardPerPage}
      />
      <Pagination
        index={index}
        setIndex={setIndex}
        dataLength={NameCardData().length}
        MaxNameCardPerPage={MaxNameCardPerPage}
      />
    </>
  );
}
