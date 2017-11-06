import React from 'react';
import InputElement from 'react-input-mask';

const handleChange = (props, campo) => {
    return (event) => {
        let entry = Object.assign({}, props.value);
        entry[campo] = event.target.value;

        props.onChange(entry);
    }
};

const TimeSheetEntry = (props) => {
    return (
        <div className="row" style={{paddingBottom: '20px'}}>
            <div className="form-group col-lg-2">
                <label className="sr-only" htmlFor={'dataInicio-' + props.value.id}>Hora início</label>
                <InputElement type="text" className="form-control" id={'dataInicio-' + props.value.id} placeholder="Data início"
                       onChange={handleChange(props, 'dataInicio')} value={props.value.dataInicio} mask="99/99/9999 99:99" />
            </div>
            <div className="form-group col-lg-2">
                <label className="sr-only" htmlFor={'dataFim-' + props.value.id}>Hora fim</label>
                <InputElement type="text" className="form-control" id={'dataFim-' + props.value.id} placeholder="Data fim"
                       onChange={handleChange(props, 'dataFim')} value={props.value.dataFim} mask="99/99/9999 99:99"  />
            </div>
            <div className="form-group col-lg-8">
                <label className="sr-only" htmlFor={'descricao-' + props.value.id}>Descrição da atividade</label>
                <input type="text" className="form-control" id={'descricao-' + props.value.id} style={{width: '100%'}}
                       placeholder="Descrição da atividade" onChange={handleChange(props, 'descricao')}
                       value={props.value.descricao} />
            </div>
        </div>
    );
};

export default TimeSheetEntry;
