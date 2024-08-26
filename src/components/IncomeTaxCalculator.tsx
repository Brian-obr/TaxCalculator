import React, { useState } from "react";

// Define types for tax brackets and tax types
type TaxBracket = {
  maxIncome: number;
  rate: number;
  baseTax: number;
};

type TaxType = "income" | "vat" | "business";

// Define tax brackets for different tax types
const incomeTaxBrackets: TaxBracket[] = [
  { maxIncome: 226000, rate: 0.18, baseTax: 0 },
  { maxIncome: 353100, rate: 0.26, baseTax: 40680 },
  { maxIncome: 488700, rate: 0.31, baseTax: 73726 },
  { maxIncome: 641400, rate: 0.36, baseTax: 115762 },
  { maxIncome: 817600, rate: 0.39, baseTax: 170734 },
  { maxIncome: 1731600, rate: 0.41, baseTax: 239452 },
  { maxIncome: Infinity, rate: 0.45, baseTax: 614192 },
];

// Business tax example - flat rate for simplicity
const businessTaxRate = 0.28;

// VAT example - flat rate of 15%
const vatRate = 0.15;

// Function to calculate income tax
const calculateIncomeTax = (income: number): number => {
  let tax = 0;
  for (let i = incomeTaxBrackets.length - 1; i >= 0; i--) {
    const bracket = incomeTaxBrackets[i];
    if (income > bracket.maxIncome) {
      tax += (income - bracket.maxIncome) * bracket.rate;
      income = bracket.maxIncome;
    }
  }
  return tax;
};

// Function to calculate business tax
const calculateBusinessTax = (income: number): number => {
  return income * businessTaxRate;
};

// Function to calculate VAT
const calculateVAT = (amount: number): number => {
  return amount * vatRate;
};

// Main component
const IncomeTaxCalculator: React.FC = () => {
  const [income, setIncome] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [taxType, setTaxType] = useState<TaxType>("income");

  const handleCalculate = () => {
    let calculatedTax = 0;

    switch (taxType) {
      case "income":
        calculatedTax = calculateIncomeTax(income);
        break;
      case "business":
        calculatedTax = calculateBusinessTax(income);
        break;
      case "vat":
        calculatedTax = calculateVAT(income);
        break;
      default:
        alert("Please select a valid tax type.");
        return;
    }

    setTax(calculatedTax);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px", textAlign: "center", fontFamily: "Arial" }}>
      <h2>South Africa Tax Calculator</h2>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(parseFloat(e.target.value))}
          placeholder="Enter your amount"
          style={{
            padding: "10px",
            width: "100%",
            boxSizing: "border-box",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div style={{ textAlign: "left", marginBottom: "20px" }}>
        <label>
          <input
            type="radio"
            value="income"
            checked={taxType === "income"}
            onChange={() => setTaxType("income")}
          />
          Income Tax
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="business"
            checked={taxType === "business"}
            onChange={() => setTaxType("business")}
          />
          Business Tax
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="vat"
            checked={taxType === "vat"}
            onChange={() => setTaxType("vat")}
          />
          VAT
        </label>
      </div>
      <button
        onClick={handleCalculate}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Calculate Tax
      </button>
      <div style={{ marginTop: "20px", fontSize: "18px", color: "#333" }}>
        {tax > 0 && (
          <>
            <p>Calculated Tax: R {tax.toFixed(2)}</p>
            {taxType === "income" && (
              <>
                <p>Monthly Tax: R {(tax / 12).toFixed(2)}</p>
                <p>Remaining Monthly Income: R {(income / 12 - tax / 12).toFixed(2)}</p>
                <p>Annual Tax: R {tax.toFixed(2)}</p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default IncomeTaxCalculator;
