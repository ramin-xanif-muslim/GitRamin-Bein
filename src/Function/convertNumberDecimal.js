export function ConvertDecimal(num) {
    return Math.floor(num * 100) / 100;
}

export function ConvertFixedTable(num) {
    var isNum = !isNaN(parseFloat(num))
    return isNum ? parseFloat(parseFloat(parseFloat(num).toFixed(4)).toFixed(2)) : '';
}

export function ConvertFixedPosition(num) {
    var isNum = !isNaN(parseFloat(num))
    return isNum ? parseFloat(parseFloat(parseFloat(num).toFixed(4))) : 0.00;
}










export function FindCofficient(consumption, amount) {
    var isNum = !isNaN(parseFloat(amount))
    return isNum ? parseFloat(parseFloat(parseFloat(consumption / amount).toFixed(4))) : 0.00;
}


export function FindAdditionals(consumption, amount, posAmount) {
    var cofficient = FindCofficient(consumption, amount)
    return ConvertFixedTable(posAmount + (cofficient * posAmount))

}
