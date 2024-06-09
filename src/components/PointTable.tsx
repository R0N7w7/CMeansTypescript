import { Table } from "antd";

type Props = {
    data: Point[],
    title: string
}

const PointTable = ({ data, title }: Props) => {
    const dataSource = data.map((point, index) => ({
        key: index.toString(),
        name: `Point ${index + 1}`,
        x: point.x.toFixed(4),
        y: point.y.toFixed(4),
    }))


    const columns = [
        { title: 'X', dataIndex: 'x', key: 'x', },
        { title: 'Y', dataIndex: 'y', key: 'y', },
    ]
    return (
        <Table
            title={() => <h1 className="text-lg font-semibold">{title}:</h1>}
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            scroll={{ x: true, y: 150 }}
            size="small"
        />
    )
}

export default PointTable