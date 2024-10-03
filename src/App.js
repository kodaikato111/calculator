import React, { useState } from 'react';
import './App.css';

function Key({ label, clickHandler }) {
  return (
    <button onClick={clickHandler}>
      {label}
    </button>
  );
}

function Display({ value }) {
  return (
    <div className="Display">
      {value}
    </div>
  );
}

function App() {
  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState(null);
  const [firstOperand, setFirstOperand] = useState(null);

  const handleButtonClick = (value) => {
    if (value === "C") {
      setDisplayValue("0");
      setOperator(null);
      setFirstOperand(null);
    } else if (['+', '-', 'x', '÷'].includes(value)) {
      if (displayValue !== "0") {
        setFirstOperand(parseFloat(displayValue));
        setOperator(value);
        setDisplayValue("0");
      }
    } else if (value === "=") {
      if (operator && firstOperand !== null) {
        const secondOperand = parseFloat(displayValue);
        let result;
        switch (operator) {
          case '+':
            result = firstOperand + secondOperand;
            break;
          case '-':
            result = firstOperand - secondOperand;
            break;
          case 'x':
            result = firstOperand * secondOperand;
            break;
          case '÷':
            result = firstOperand / secondOperand;
            break;
          default:
            return;
        }
        setDisplayValue(result.toString());
        setOperator(null);
        setFirstOperand(null);
      }
    } else if (value === "KATO") {
      setDisplayValue("Kodai Kato"); 
    } else {

      if (displayValue.length < 16) {
        setDisplayValue(prevValue => (prevValue === "0" ? value.toString() : prevValue + value));
      }
    }
  };

  return (
    <div className="App">
      <h2>Calculator of Kodai Kato - IT3A</h2>
      <div className="CalcContainer">
        <div className="DispContainer">
          <Display value={displayValue} />
        </div>
        <div className="ButtonContainer">
          {["C", 7, 8, 9, "÷", 
            4, 5, 6, "x", 
            1, 2, 3, "-", 
            0, "=", "+"].map(label => (
            <Key key={label} label={label} clickHandler={() => handleButtonClick(label)} />
          ))}
        </div>
        <div className="ButtonContainer"> 
          <Key label="KATO" clickHandler={() => handleButtonClick("KATO")} />
        </div>
      </div>
    </div>
  );
}

export default App;
