import PropTypes from 'prop-types';
import React from "react";
import "./CurrencyInput.css"
function CurrencyInput({isSecondCurrency=false, amount, currency, onAmountChange, onCurrencyChange, currencies}) {
return (
    <div className="group">
     <input type="text" disabled={isSecondCurrency} value={amount} onChange={ev => onAmountChange(ev.target.value)}/>
        <select value={currency} onChange={ev => onCurrencyChange(ev.target.value)}>
            {isSecondCurrency ?
                currencies?.map(currency => (
                    <option value={currency.name}>{currency.name}</option>)) :
                currencies?.map(currency => (
                <option value={currency}>{currency}</option>
            ))}
        </select>

    </div>
);
}

CurrencyInput.propTypes = {
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    currencies: PropTypes.array,
    onAmountChange: PropTypes.func,
    onCurrencyChange: PropTypes.func,


}

export default CurrencyInput;