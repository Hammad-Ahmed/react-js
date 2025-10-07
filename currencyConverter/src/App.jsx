import { useState } from "react";
import { CurrencyInputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import { useEffect } from "react";

function App() {
	let BackgroundImage = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";

	const [amountTo, setAmountTo] = useState(0);
	const [currencyTo, setCurrencyTo] = useState("PKR");

	const [amountFrom, setAmountFrom] = useState(0);
	const [currencyFrom, setCurrencyFrom] = useState("USD");

	let currencyInfo = useCurrencyInfo(currencyFrom);

	// Function to convert amount from one currency to another
	const convert = () => {
		console.log(amountFrom, currencyFrom, currencyTo, currencyInfo);
		if (currencyInfo && currencyInfo[currencyTo]) {
			return amountFrom * currencyInfo[currencyTo];
		}
		return 0;
	}

	const swap = () => {
		// const tempCurrency = currencyFrom;
		// const tempAmount = amountFrom;
		setCurrencyFrom(currencyTo);
		// setAmountFrom(amountTo);
		setCurrencyTo(currencyFrom);
		// setAmountTo(tempAmount);
	}

	useEffect( () => {
		const result = convert(amountFrom, currencyTo);
		setAmountTo(result);
	}, [amountFrom, currencyFrom, currencyTo]);

	return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('${BackgroundImage}')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          {/* <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          > */}
            <div className="w-full mb-1">
              <CurrencyInputBox 
								label="From"
								amount={amountFrom}
								onAmountChange={setAmountFrom}
								currencyOptions={Object.keys(currencyInfo)}
								currency={currencyFrom}
								onCurrencyChange={setCurrencyFrom}
							/>
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
								onClick={ swap }
							>
                SWAP
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <CurrencyInputBox 
								label="To"
								amount={amountTo}
								onAmountChange={setAmountTo}
								currencyOptions={Object.keys(currencyInfo)}
								currency={currencyTo}
								onCurrencyChange={setCurrencyTo}
								disableAmount={true}
							/>
            </div>
            {/* <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert
            </button> */}
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}

export default App;
