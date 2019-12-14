export function currencyTransform(inputValue) {
    return Number(inputValue).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
}