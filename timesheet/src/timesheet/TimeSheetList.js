import React from 'react';
import TimeSheetEntry from './TimeSheetEntry';

const handleSubmit = (event) => {
    event.preventDefault();
};

const TimeSheetList = (props) => {

    const entries = props.value.map( (entry) => <TimeSheetEntry onChange={props.onChange} value={entry} key={entry.id} />);

    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                Horários
            </div>
            <div className="panel-body">
                <form className="form-inline" onSubmit={handleSubmit}>
                    {entries}
                </form>
            </div>
        </div>
    );

};

export default TimeSheetList;