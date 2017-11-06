module.exports = {
    toMoneyString: function(currency, value) {
        switch (currency) {
            case "AUD": return "AU$ " + value.toFixed(2);
            case "BRL": return "R$ " + value.toFixed(2).replace(".",",");
            case "USD": return "$ " + value.toFixed(2);
            case "EUR": return "€ " + value.toFixed(2);


            default: return value.toLocaleString('pt-BR', { style: 'currency', currency: currency });
        }
    }
};