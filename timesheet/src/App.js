import React, { Component } from 'react';
import uniqid from 'uniqid';
import ls from 'local-storage';

import './App.css';
import TimeSheetList from './timesheet/TimeSheetList';
import Totalizador from './timesheet/Totalizador';
import ViewRelatorio from './timesheet/ViewRelatorio';

import orderTimesheet from './timesheet/orderTimesheet';

const kLocalStorageKey = 'timesheet';

class App extends Component {

    constructor() {
        super();
        this.state = {
            timesheet: [{
                id: uniqid(),
                dataInicio: '',
                dataFim: '',
                descricao: ''
            }]
        };
    }

    componentDidMount() {
        let timesheet = ls(kLocalStorageKey);

        if (timesheet) {
            timesheet.sort( orderTimesheet )
            this.setState({
                timesheet: timesheet
            });
        }
    }

    atualizarTimeSheet(newEntry) {
        let entryIndex = null;
        let entry = this.state.timesheet.find( (value, index) => {
            entryIndex = index;
            return value.id === newEntry.id;
        });

        if (entry) {
            let timesheet = Object.assign([], this.state.timesheet);
            timesheet[entryIndex] = newEntry;

            this.setState({
                timesheet: timesheet
            }, this._posEdicaoTimesheet.bind(this));
        }
    }

    _posEdicaoTimesheet() {
        ls(kLocalStorageKey, this.state.timesheet);
        this._limparCamposVazios();
        this._adicionarCampoSeTodosEstiveremPreenchidos();
    }

    _limparCamposVazios() {
        let ultimoIndiceCampoVazio = null;
        let quantidadeCampoVazio = 0;
        this.state.timesheet.forEach( (entry, index) => {
            if (!entry.dataInicio || !entry.dataFim || !entry.descricao) {
                ultimoIndiceCampoVazio = index;
                quantidadeCampoVazio++;
            }
        });

        if (quantidadeCampoVazio > 1) {
            let timesheet = Object.assign([], this.state.timesheet);
            timesheet.splice(ultimoIndiceCampoVazio, 1);

            this.setState({
                timesheet: timesheet
            });
        }
    }

    _adicionarCampoSeTodosEstiveremPreenchidos() {
        let existeCampoEmBranco = 0;
        this.state.timesheet.forEach( (entry) => {
            if (!entry.dataInicio || !entry.dataFim || !entry.descricao) {
                existeCampoEmBranco++;
            }
        });

        if (!existeCampoEmBranco) {
            let timesheet = Object.assign([], this.state.timesheet);
            timesheet.push({
                id: uniqid(),
                dataInicio: '',
                dataFim: '',
                descricao: ''
            });

            this.setState({
                timesheet: timesheet
            });
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <TimeSheetList onChange={this.atualizarTimeSheet.bind(this)} value={this.state.timesheet} />
                    <Totalizador timesheet={this.state.timesheet} />

                    <ViewRelatorio timesheet={this.state.timesheet} />
                </div>
            </div>
        );
    }
}

export default App;
