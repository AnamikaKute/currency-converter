import './CurrencyConverterExchangeRates.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
export default function CurrencyConverterExchangeRates() {
    const [amountToBeConverted, setAmountToBeConverted] = useState(1)
    const [fromCurrency, setFromCurrency] = useState("USD")
    const [toCurrency, setToCurrency] = useState("INR")
    const [convertedAmount, setConvertedAmount] = useState(null)
    const [currencies, setCurrencies] = useState([]);
    const [exchangeRates, setExchangeRates] = useState({});

    function handleAmountToBeConvertedChange(event) {
        setAmountToBeConverted(event.target.value)
        setConvertedAmount(0)
    }

    function handleFromCurrencyChange(event) {
        setFromCurrency(event.target.value)
        setConvertedAmount(0)

    }

    function handleToCurrencyChange(event) {
        setToCurrency(event.target.value)
        setConvertedAmount(0)

    }
    useEffect(() => {
        axios
            .get("https://api.exchangerate-api.com/v4/latest/USD")
            .then((response) => {
                setExchangeRates(response.data.rates);
                setCurrencies(Object.keys(response.data.rates)); // list of all currency codes
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    function handleConvertChange() {

        if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
            alert("Currency data not loaded yet!");
            return;
        }

        const usedAmount = amountToBeConverted / exchangeRates[fromCurrency];
        const converted = usedAmount * exchangeRates[toCurrency];

        setConvertedAmount(converted.toFixed(2));
    }
    return (
        <div className='mostOuterBodyOfCard'>
            <div className='innerSectionBox'>
                <div className='inputFieldsOfBox'>
                    <div>
                        <div>
                            <label>Amount</label>
                            <input value={amountToBeConverted} onChange={handleAmountToBeConvertedChange} />
                        </div>
                    </div>
                    <div>
                        <label>From</label>

                        <select value={fromCurrency} onChange={handleFromCurrencyChange}>

                            {currencies.map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}

                        </select>
                    </div>

                    <div>

                        <label>To</label>
                        <select value={toCurrency} onChange={handleToCurrencyChange}>
                            {currencies.map((currency) => (
                                <option key={currency} value={currency}>
                                    {currency}
                                </option>
                            ))}
                        </select></div>

                </div>

                <div className='outputSection'>
                    {convertedAmount && (
                    <div>
                      {amountToBeConverted} {fromCurrency} = {convertedAmount} {toCurrency}

                    </div>
                     )}
                    <div><button onClick={handleConvertChange}>Convert</button></div>
                </div>

            </div>
        </div>
    )
}