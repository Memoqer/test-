import React, {useMemo, useRef} from "react";
import './App.css';
import CurrencyInput from "./CurrencyInput";
import {useState, useEffect} from "react";
import axios from "axios";
import {HeaderCurrencyValues} from "./Header";
function App() {

    const [amount1, setAmount1] = useState(0);
    const [amount2, setAmount2] = useState(0);
    const [currency1, setCurrency1] = useState("");
    const [currency2, setCurrency2] = useState("");
    const [rates, setRates] = useState([]);
    const [ratesOBJ, setRatesRatesOBJ] = useState([]);



    useEffect(() => {
    axios.get(`https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11`)
        .then(response => {
            let ratesObject = {}
            response.data.forEach((item) => {
                const {base_ccy, ccy, buy, sale} = item
                if(!ratesObject[base_ccy]){
                    ratesObject[base_ccy] = [{name: ccy, buyAmount: buy }]
                } else if(ratesObject[base_ccy]) {
                    ratesObject[base_ccy].push({name: ccy, buyAmount: buy })
                }
                if(!ratesObject[ccy]){
                    ratesObject[ccy] = [{name: base_ccy, saleAmount: sale }]
                } else if(ratesObject[ccy]) {
                    ratesObject[ccy].push({name: base_ccy, saleAmount: sale })
                }
            })
            setRatesRatesOBJ(ratesObject);
            setCurrency1(Object.keys(ratesObject)[0])
            setCurrency2(ratesObject[(Object.keys(ratesObject)[0])][0].name)
          setRates(response.data);
        }).catch(err=> console.warn(err))
    },[]);


    useEffect(() => {
        if(currency1 && currency2){
            const amount = ratesOBJ[currency1].filter(currency => currency.name === currency2)[0];
            if(amount?.buyAmount) {
                setAmount2(amount1 / amount.buyAmount);
            } else {
                setAmount2(amount1 * amount.saleAmount);
            }
        }
    }, [currency1, currency2])


    function handleAmount1Change(amount1) {
        const amount = ratesOBJ[currency1].filter(currency => currency.name === currency2)[0];
        if(amount?.buyAmount) {
            setAmount2(amount1 / amount.buyAmount);
        } else {
            setAmount2(amount1 * amount.saleAmount);
        }
        setAmount1(amount1);
    }


    function handleCurrency1Change(currency1) {
        setCurrency2(ratesOBJ[currency1][0].name);
        setCurrency1(currency1);
    }


    function handleCurrency2Change(currency2) {
        setCurrency2(currency2);
    }
    return (
        <>
            {rates.map((rate)=> (<div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <HeaderCurrencyValues base_ccy={rate.base_ccy} buy={rate.buy} ccy={rate.ccy} sale={rate.sale}/>
                </div>)
            )}
        <div>
            <CurrencyInput
                onAmountChange={handleAmount1Change}
                onCurrencyChange={handleCurrency1Change}
                currencies={Object.keys(ratesOBJ)} amount={amount1} currency={currency1} />
             <CurrencyInput
                isSecondCurrency={true}
                onCurrencyChange={handleCurrency2Change}
                currencies={currency1 ? ratesOBJ[currency1] : null} amount={amount2} currency={currency2} />
         </div>
        </>
  );
}

export default App;
