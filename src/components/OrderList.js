import React, { Component } from 'react'
import { Table, Input, DatePicker, Button, Form } from 'antd'
import store from '../redux/store'

const { RangePicker } = DatePicker

export class OrderList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            OrderList: [],
            bookinOrder: [],
            orderListAfterSearch: [],
            search: false,
        }
    }

    columns = [
        { title: "订单号", dataIndex: "id", key: "id" },
        { title: "时间", dataIndex: "time", key: "time" },
        { title: "总价", dataIndex: "price", key: "price" },
    ]

    componentDidMount() {
        if (this.state.search === true) return
        const userID = store.getState().user.id
        fetch(`http://localhost:8080/orderList?userID=${userID}`).then(
            response => response.json()
        ).then(
            response => {
                console.log("response:", response)
                this.setState({ OrderList: response })
                for (let i = 0; i < response.length; i++) {
                    let orderID = response[i].id
                    fetch(`http://localhost:8080/orderDetail?orderID=${orderID}`).then(
                        response => response.json()
                    ).then(
                        response => {
                            console.log("response:", response)
                            let tmp = this.state.bookinOrder
                            tmp[orderID] = response
                            this.setState({ bookinOrder: tmp })
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

    Reset() {
        this.setState({ search: false })
    }

    onFinish(value) {
        if (value.title !== undefined) {
            let orderList = this.state.OrderList
            let newList = []
            let bookinOrder = this.state.bookinOrder
            for (let i = 0; i < orderList.length; i++) {
                let orderID = orderList[i].id
                let flag = false
                for (let j = 0; j < bookinOrder[orderID].length; j++) {
                    if (bookinOrder[orderID][j].title.search(value.title) !== -1) {
                        flag = true
                        break
                    }
                }
                if (flag === true) newList.push(orderList[i])
            }
            this.setState({ orderListAfterSearch: newList, search: true })
        }
        if (value.time !== undefined) {
            let startTime = value.time[0]['_d']
            let endTime = value.time[1]['_d']            
            let orderList = value.title === undefined ? this.state.OrderList : this.state.orderListAfterSearch
            let newList = []
            for (let i = 0; i < orderList.length; i++) {
                let orderTime = new Date(orderList[i].time)
                if (startTime <= orderTime && orderTime <= endTime) newList.push(orderList[i])
            }
            this.setState({orderListAfterSearch: newList, search: true})
        }
    }

    render() {
        console.log("OrderList start render()，state:", this.state)
        return (
            <div className="OrderList">
                <h2> 我的订单 </h2>
                <Form
                    layout="inline"
                    name="filter"
                    onFinish={(value) => this.onFinish(value)}
                >
                    <Form.Item name="title">
                        <Input placeholder="按照书名过滤" />
                    </Form.Item>

                    <Form.Item name="time">
                        <RangePicker placeholder="按照时间过滤"></RangePicker>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button htmlType="submit">
                            过滤
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={() => this.Reset()}>重置</Button>
                    </Form.Item>
                </Form>
                <Table
                    columns={this.columns} dataSource={this.state.search ? this.state.orderListAfterSearch : this.state.OrderList}
                    expandable={{ expandedRowRender: record => this.ExpandedRowRender(record.id) }}
                    rowKey={record => record.id}>
                </Table>
            </div >
        )
    }
}