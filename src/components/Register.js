import React, { Component } from 'react'
import { Button, Modal, Input, Form } from 'antd'
import 'antd/dist/antd.css'

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible_Register: false
        }
    }

    layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }

    tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    }

    onFinish(values) {
        fetch(`http://localhost:8080/findByUsername?username=${values.username}`).then(
            response => response.text()
        ).then(
            response => {
                console.log("用户名是否已被使用：", response)
                if (response === "true") alert("用户名已被使用")
                else {
                    let formData = new FormData();
                    formData.append("username", values.username)
                    formData.append("password", values.password)
                    formData.append("email", values.email)
                    fetch(`http://localhost:8080/register`, {
                        method: "POST",
                        body: formData
                    }).then(
                        response => response.text()
                    ).then(
                        response => {
                            console.log(response)
                            alert("注册成功")
                            this.setState({ isModalVisible_Register: false })
                        }
                    ).catch(
                        error => { console.log(error) }
                    )
                }
            }
        ).catch(error => { console.log(error) })
    }

    showModal_Register() {
        this.setState({ isModalVisible_Register: true })
    }

    handleCancel_Register() {
        this.setState({ isModalVisible_Register: false })
    }

    onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo)
    }

    render() {
        return (
            <div>
                <Button onClick={() => this.showModal_Register()}>注册</Button>
                <Modal title="注册" visible={this.state.isModalVisible_Register}
                    onCancel={() => this.handleCancel_Register()} footer={[]}>
                    <Form
                        {...this.layout}
                        name="Register"
                        initialValues={{ remember: true }}
                        onFinish={(values) => this.onFinish(values)}
                        onFinishFailed={(errorInfo) => this.onFinishFailed(errorInfo)}
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="邮箱"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入邮箱',
                                },
                                {
                                    pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                                    message: '邮箱格式不正确',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="重复密码"
                            name="password_again"
                            rules={[
                                {
                                    required: true,
                                    message: '请重复密码',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('两次密码不相同!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...this.tailLayout}>
                            <Button type="primary" htmlType="submit">注册</Button>
                        </Form.Item>

                    </Form>
                </Modal>
            </div>
        )
    }
}
