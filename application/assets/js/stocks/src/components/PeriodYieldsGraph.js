import React from 'react'
import {useTable} from 'react-table'

const PeriodYieldsGraph = ({data}) => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Period',
                accessor: 'period', // accessor is the "key" in the data
            },
            {
                Header: 'Prinosi akcije',
                accessor: 'stock_yields',
            },
            {
                Header: 'Prinosi depozit',
                accessor: 'deposit_yields',
            },
            {
                Header: 'Rezultat',
                accessor: 'cash_balance',
            },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns, data, initialState: {
            sortBy: [
                {
                    id: 'period',
                    desc: true
                }
            ]
        }
    })

    return (
        <table {...getTableProps()} style={{border: 'solid 1px blue', width: '100%'}}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th
                            {...column.getHeaderProps()}
                            style={{
                                borderBottom: 'solid 3px red',
                                background: 'aliceblue',
                                color: 'black',
                                fontWeight: 'bold',
                            }}
                        >
                            {column.render('Header')}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return (
                                <td
                                    {...cell.getCellProps()}
                                    style={{
                                        padding: '10px',
                                        border: 'solid 1px gray',
                                        background: 'papayawhip',
                                        color: cell.column.Header !== 'Period' ? (cell.value > 0 ? 'green' : 'red') : 'black'
                                    }}
                                >
                                    {cell.render('Cell')}
                                </td>
                            )
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}
export default PeriodYieldsGraph;