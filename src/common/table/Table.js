import React from 'react';
import PropTypes from 'prop-types';
import './table.css';



const indexKey = (obj, index) => index;



export const Table = ({columns, data, generateRowKey}) => {
    const generateKey = generateRowKey || indexKey;

    return (
        <table className="table table-bordered table-striped">
            <thead>
            <tr>
                {/*{columns.map(({headerComponent}) => React.createElement(headComponent))}*/}
                {columns.map(({headerComponent: HeaderComponent, columnId}, index) =>
                    <th key={columnId}>
                        {HeaderComponent && <HeaderComponent/>}
                    </th>
                )}
            </tr>
            </thead>
            <tbody>
            {data.map((dataObject, index) =>
                <tr key={generateKey(dataObject, index)}>
                    {columns.map(({cellComponent: CellComponent, columnId}) => <td key={columnId}>
                        <CellComponent {...dataObject}/></td>)}
                </tr>
            )}
            </tbody>
        </table>
    )
};

Table.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({
        columnId: PropTypes.string.isRequired,
        headerComponent: PropTypes.func,
        cellComponent: PropTypes.func.isRequired
    })).isRequired,
    generateRowKey: PropTypes.func
};
