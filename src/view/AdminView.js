import { Table } from 'antd'
import React, { Component } from 'react'
import HeaderInfo from '../components/HeaderInfo'
import { Button } from 'antd'

export default class admin extends Component {
    constructor(props) {
        super(props)
        this.state = { userList: [] }
    }

    forbidden(user, act) {
        let formData = new FormData()
        formData.append("userID", user.id)
        formData.append("act", act)
        fetch(`http://localhost:8080/userForbidden`, {
            method: "PUT",
            body: formData,
        }).catch(error => console.log(error))
    }

    componentDidMount() {
        fetch(`http://localhost:8080/userList`).then(
            response => response.json()
        ).then(
            response => this.setState({ userList: response })
        ).catch(error => console.log(error))
    }

    columns = [
        { title: "用户名", dataIndex: "username", key: "username" },
        {
            title: "用户类型", key: "user_type",
            render: (text, record) => record.user_type ? "管理员" : "普通用户"
        },
        { title: "邮箱", dataIndex: "email", key: "email" },
        {
            title: "封禁", key: "forbidden",
            render: (text, record) => (
                <div>
                    <Button onClick={() => this.forbidden(record, true)}>禁用</Button>
                    <Button onClick={() => this.forbidden(record, false)}>解禁</Button>
                </div>
            )
        }
    ]

    render() {
        return (
            <div>
                <HeaderInfo />
                <h2>所有用户</h2>
                <Table columns={this.columns} dataSource={this.state.userList}/>
                
            </div>
        )
    }
}
