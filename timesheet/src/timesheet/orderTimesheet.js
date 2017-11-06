import moment from 'moment';

export default (a, b) => {
    let dataInicioA = moment(a.dataInicio, 'DD/MM/YYYY hh:mm');
    let dataInicioB = moment(b.dataInicio, 'DD/MM/YYYY hh:mm');

    if (!dataInicioA) dataInicioA = 0;
    if (!dataInicioB) dataInicioB = 0;

    return dataInicioA - dataInicioB;
}
