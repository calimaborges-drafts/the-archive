import React from 'react';
import moment from 'moment';

const somarTimesheet = (props) => {
    let duracaoTotal = moment.duration();
    props.timesheet.forEach((entry) => {
        let dataInicio =  moment(entry.dataInicio, 'DDMMYYYYhhmm');
        let dataFim = moment(entry.dataFim, 'DDMMYYYYhhmm');
        let duracao = moment.duration(dataFim - dataInicio);

        duracaoTotal.add(duracao);
    });

    return duracaoTotal;
};

const Totalizador = (props) => {
    return (
        <p><strong>Total: {somarTimesheet(props).asHours()} horas</strong></p>
    );
};

export default Totalizador;