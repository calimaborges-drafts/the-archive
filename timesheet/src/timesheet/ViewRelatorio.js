import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import orderTimesheet from './orderTimesheet';

const ViewRelatorio = (props) => {
    let duracaoTotal = moment.duration();
    let relatorio = '';
    let timesheet = Object.assign([], props.timesheet);

    timesheet.sort( orderTimesheet ).forEach((entry) => {
        let dataInicio = moment(entry.dataInicio, 'DD/MM/YYYY HH:mm');
        let dataFim = moment(entry.dataFim, 'DD/MM/YYYY HH:mm');
        let duracao = moment.duration(dataFim - dataInicio);

        if (!dataInicio || !dataFim) return;

        if (duracao.asMilliseconds() > 0) {
            duracaoTotal.add(duracao);
            relatorio += (`[${numeral(duracaoTotal.asSeconds()).format('00:00')}] [${numeral(duracao.asSeconds()).format('00:00')}] ${dataInicio.format("DD/MM/YYYY HH:mm")} ${dataFim.format("DD/MM/YYYY HH:mm")} ${entry.descricao}\n`);
        }
    });

    return (
        <pre>
            {relatorio}
        </pre>
    );
};

export default ViewRelatorio;
