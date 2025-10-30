import { useState, useEffect } from 'react'
import './CurrencyConverter.css'
export default function CurrencyConverter() {
    const [amountToBeConverted, setAmountToBeConverted] = useState(1)
    const [fromCurrency, setFromCurrency] = useState("USD")
    const [toCurrency, setToCurrency] = useState("INR")
    const [convertedAmount, setConvertedAmount] = useState(0)
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
        console.log("Updated Converted Amount:", convertedAmount);
    }, [convertedAmount]);

    function handleConvertChange() {

        console.log("Amount to be converted:", amountToBeConverted);
      console.log("from:",fromCurrency,"to:",toCurrency);
      
        if (fromCurrency === "INR") {
            if (toCurrency === "INR") {
                setConvertedAmount(amountToBeConverted)
            }
            else if (toCurrency === "USD") {
                setConvertedAmount(amountToBeConverted / 83)

            }
            else if (toCurrency === "EURO") {
                setConvertedAmount(amountToBeConverted / 83*0.93)
            }

        }
        else if (fromCurrency === "USD") {
            if (toCurrency === "USD") {
                setConvertedAmount(amountToBeConverted)
            }
            else if (toCurrency === "EURO") {
                setConvertedAmount(amountToBeConverted * 0.93)
            }
            else if (toCurrency === "INR") {
                setConvertedAmount(amountToBeConverted * 83)
            }
        }
        else if (fromCurrency === "EURO") {
            if (toCurrency === "EURO") {
                setConvertedAmount(amountToBeConverted)
            }
            else if (toCurrency === "USD") {
                setConvertedAmount(amountToBeConverted / 0.93)
            }
            else if (toCurrency === "INR") {
                setConvertedAmount(amountToBeConverted * (83 / 0.93))
            }
        }
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
                            <option value="INR">INR</option>
                            <option value="USD">USD</option>
                            <option value="EURO">EURO</option>

                        </select></div>
                    <div>
                        <label>To</label>

                        <select value={toCurrency} onChange={handleToCurrencyChange}>
                            <option value="USD">USD</option>
                            <option value="EURO">EURO</option>
                            <option value="INR">INR</option>
                        </select></div>

                </div>
                <div className='outputSection'>
                    <div>{convertedAmount}</div>
                    <div><button onClick={handleConvertChange}>Convert</button></div>
                </div>

            </div>
        </div>
    )
}