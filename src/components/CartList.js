import React, { Component } from 'react'
import { Table, Button, Modal } from 'antd'
import store from '../redux/store'

export class CartList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cartlist: [],
            order: { id: null, time: null },
            visible: false,
            bookinOrderList: [],
        }
    }

    componentDidMount() {
        console.log("CartList执行componentDidMount()")
        let user = store.getState().user
        fetch(`http://localhost:8080/cartlist?userId=${user.id}`).then(
            response => response.json()
        ).then(
            response => {
                let newlist = []
                for (let i = 0, j = response.length; i < j; i++) {
                    let data = {}
                    data["cartID"] = response[i]["id"]
                    fetch(`http://localhost:8080/bookdetail?id=${response[i].bookID}`).then(
                        response => response.json()
                    ).then(
                        response => {
                            data["bookID"] = response.id
                            data["title"] = response.title
                            data["author"] = response.author
                            data["price"] = response.price
                        }
                    ).catch(error => console.log(error))
                    newlist.push(data)
                }
                this.setState({ cartlist: newlist })
            }
        ).catch(error => console.log(error))
    }

    Delete(data) {
        let formData = new FormData()
        formData.append('id', data.cartID)
        fetch(`http://localhost:8080/deleteCartById`, {
            method: "POST",
            body: formData,
        }).then(response => response.text()
        ).then(
            response => {
                console.log(response)
                const newlist = this.state.cartlist.filter(function (item) {
                    return item.cartID !== data.cartID
                })
                console.log('newlist:', newlist)
                this.setState({ cartlist: newlist })
            }
        ).catch(error => console.log(error))
    }

    Clear() {
        let userID = store.getState().user.id
        const cartlist = this.state.cartlist
        // 新建Order
        let formData = new FormData()
        let price = 0
        for (let i = 0; i < cartlist.length; i++) price += cartlist[i]["price"]
        formData.append("userID", userID)
        formData.append("totprice", price)
        fetch(`http://localhost:8080/newOrder`, {
            method: "POST",
            body: formData,
        }).then(
            response => response.json()
        ).then(
            response => {
                let order = response
                console.log("我真的获取到了order: ", order)
                // 将购物车中书籍加入order
                console.log("cartlist还在吗:", cartlist)
                for (let i = 0; i < cartlist.length; i++) {
                    let formData = new FormData();
                    console.log("orderID:", order.id)
                    console.log("userID:", userID)
                    console.log("bookID:", cartlist[i].bookID)
                    formData.append("orderID", order.id)
                    formData.append("userID", userID);
                    formData.append("bookID", cartlist[i].bookID);
                    fetch(`http://localhost:8080/insertOrder`, {
                        method: "POST",
                        body: formData,
                    })
                }
                // 清空购物车
                this.setState({ cartlist: [] })
                fetch(`http://localhost:8080/clearCart`, {
                    method: "POST",
                    body: formData,
                }).catch(error => console.log(error))
                // 显示订单信息
                this.setState({ visible: true, order: order, bookinOrderList: cartlist })
            }
        ).catch(error => console.log(error))
    }

    handleCancel() {
        console.log("执行handleCancel()")
        this.setState({ visible: false })
    }

    render() {
        const columns = [
            { title: '书名', dataIndex: 'title', key: 'title' },
            { title: '作者', dataIndex: 'author', key: 'author' },
            { title: '价格', dataIndex: 'price', key: 'price' },
            {
                title: '操作', key: 'delete',
                render: (text, record) => (
                    <Button onClick={() => this.Delete(record)}>删除</Button>
                )
            }
        ]
        console.log("CartList执行render(),state: ", this.state)
        const bookinOrderlist = this.state.bookinOrderList.map((item) => (
            <li key={item.id}>{item.title} {item.author} {item.price}</li>
        ))
        return (
            <div className="CartList">
                <Modal
                    visible={this.state.visible}
                    footer={[]}
                    title="订单信息"
                    onCancel={() => this.handleCancel()}
                >
                    <p>订单号：{this.state.order.id}</p>
                    <p>订单时间：{this.state.order.time}</p>
                    <p>总价格：{this.state.order.price}</p>
                    <ul>{bookinOrderlist}</ul>
                </Modal>

                <h2> 我的购物车 </h2>
                <Table columns={columns} dataSource={this.state.cartlist}
                    onRow={(record) => {
                        return {
                            onClick: () => console.log(record)
                        }
                    }}
                    rowKey={record => record.id}
                />
                <Button onClick={() => this.Clear()}>全部购买</Button>
            </div>
        )
    }
}
