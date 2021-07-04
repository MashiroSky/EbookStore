import React, { Component } from 'react'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
import '../css/BookList.css'

export class BookList extends Component {

    render() {
        const columns=[
            {
                title: '书名',
                dataIndex: 'title',
                key: 'title',
                render: (text, record) => {
                    return <Link to={`/BookDetails/${record['id']}`}>
                        {text}
                    </Link>
                },
            },
            {
                title: '作者',
                dataIndex: 'author',
                key: 'author',
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: '库存量',
                dataIndex: 'inventory',
                key: 'inventory'
            },
            {
                title: 'ISBN',
                dataIndex: 'isbn',
                key: 'isbn'
            },
        ]
        console.log(this.props.data)
        return (
            <div className="BookList">
                <h2> 所有书籍 </h2>
                <Table columns={columns} dataSource={this.props.data} rowKey={record=>record.id}>
                </Table>
            </div>
        )
    }
}
