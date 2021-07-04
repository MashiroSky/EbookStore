import React, { Component } from 'react'
import { Table } from 'antd'
import store from '../redux/store'

export class OrderList extends Component {
    constructor(props) {
        super(props)
        this.state = { OrderList: [], bookinOrder: [] }
    }

    columns = [
        { title: "订单号", dataIndex: "id", key: "id" },
        { title: "时间", dataIndex: "time", key: "time" },
        { title: "总价", dataIndex: "price", key: "price" },
    ]

    componentDidMount() {
        const userID = store.getState().user.id
        fetch(`http://localhost:8080/orderList?userID=${userID}`).then(
            response => response.json()
        ).then(
            response => {
                console.log("response:", response)
                this.setState({OrderList: response})
                for (let i = 0; i < response.length; i++) {
                    let orderID = response[i].id
                    fetch(`http://localhost:8080/orderDetail?orderID=${orderID}`).then(
                        response => response.json()
                    ).then(
                        response => {
                            console.log("response:",response)
                            let tmp = this.state.bookinOrder
                            tmp[orderID] = response
                            this.setState({bookinOrder: tmp})
                        }
                    )
                }
            }
        ).catch(error => console.log(error))
    }

    ExpandedRowRender(orderID) {
        const columns = [
            { title: "书名", dataIndex: "title", key: "title" },
            { title: "作者", dataIndex: "author", key: "author" },
            { title: "价格", dataIndex: "price", key: "price" },
        ]
        console.log("book in order:", this.state.bookinOrder[orderID])
        return <Table columns={columns} 
                    dataSource={this.state.bookinOrder[orderID]} 
                    pagination={false} 
                    rowKey={record => record.id}
                    onRow={(record) => {
                        return {
                            onClick: () => console.log(record)
                        }
                    }}
                />
    }
    render() {
        console.log("OrderList start render()，state:", this.state)
        return (
            <div className="OrderList">
                <h2> 所有订单 </h2>
                <Table
                    columns={this.columns} dataSource={this.state.OrderList}
                    expandable={{expandedRowRender: record => this.ExpandedRowRender(record.id)}}
                    rowKey={record => record.id}>
                </Table>
            </div >
        )
    }
}