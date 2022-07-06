export const HeaderCurrencyValues = ({base_ccy, buy, ccy, sale}) => {
    return(<div style={{display: 'flex', justifyContent: "space-between", width: '320px'}}>
        <div style={{display: 'flex', justifyContent: "space-between", width: "150px"}}>
            <span>{base_ccy}:</span>
            <span>{buy}</span>
        </div>
        <div style={{display: 'flex', justifyContent: "space-between", width: "150px"}}>
            <span>{ccy}:</span>
            <span>{sale}</span>
        </div>
    </div>)
}