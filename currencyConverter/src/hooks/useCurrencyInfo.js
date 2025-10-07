import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

function useCurrencyInfo(currency) {
    const [currencyData, setCurrencyData] = useState({});
    let url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
    let url2 = `https://api.exchangerate-api.com/v4/latest/${currency}`;

    const fetchData = useCallback(() => {
        fetch(url2)
        .then(response => response.json())
        .then(data => setCurrencyData(data.rates))
        .catch(error => console.error('Error fetching currency data:', error));
    }, [currency]);

    useEffect( () => {
        if (currency) {
            // You can add logic here to fetch or compute currency information based on the currency parameter
            fetchData();
        }
    }, [currency]);
    return currencyData;
}

export default useCurrencyInfo;