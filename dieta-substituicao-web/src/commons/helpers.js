import numeral from 'numeral';
import ptbr from 'numeral/languages/pt-br';

numeral.language('pt-br', ptbr);
numeral.language('pt-br');

export const formatNumber = (number) => numeral(number || 0).format('0.0');

export const formatFood = (food, multiplicador) => {
    let foodInText = '';
    const shouldShowAmounts = food.amount_calories || food.amount_gram;

    if (food.amount_unit) {
        foodInText += formatNumber(food.amount_unit * multiplicador) + ' ' + food.unit + ' de ';
    } else if (!shouldShowAmounts) {
        foodInText += '∞ ';
    }

    foodInText += food.name;

    if (shouldShowAmounts) {
        foodInText += ' (' + formatNumber(food.amount_gram * multiplicador) + ' g : ';
        foodInText += formatNumber(food.amount_calories * multiplicador) + ' kcal)';
    }

    return foodInText;
};
