import { Table } from 'antd'

type Props = {
    matrix: number[][],
    title: string
}

const MatrixTable = ({ matrix, title }: Props) => {

    const columns = [{
        title: `C`,
        dataIndex: `centroid`,
        key: `centroid`,
        fixed: true
    }]


    if (matrix.length) {
        columns.push(...matrix[0].map((_point, index) => ({
            title: `P${index}`,
            dataIndex: `${index}`,
            key: index.toString(),
            fixed: false
        }))
        )
    }

    const dataSource = matrix.map((_row, index) => (
        {
            key: `row${index}`,
            centroid: index,
            ...matrix[0].map((value) => (value.toFixed(4)))
        }
    ));

    return (
        <Table
            title={() => <h3 className='text-xl font-semibold'>{title}:</h3>}
            dataSource={dataSource}
            columns={columns}
            scroll={{ x: true, y: 300 }}
            pagination={false}
            className='matrix'
            tableLayout='auto'
        />
    )
}

export default MatrixTable