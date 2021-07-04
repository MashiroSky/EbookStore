import React, { Component } from 'react'
import { Button, Modal, Input, Checkbox, Form } from 'antd'
import 'antd/dist/antd.css'
import { withRouter } from 'react-router'

class Login extends Component {
    state = {
        isModalVisible_Login: false,
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
        let formData = new FormData();
        formData.append("username", values.username)
        formData.append("password", values.password)
        fetch(`http://localhost:8080/login`, {
            method: 'POST',
            body: formData,
        }).then(
            response => response.text()
        ).then(
            response => {
                if (response === "") alert("用户名或密码错误")
                else {
                    response = JSON.parse(response)
                    if (response.forbidden === true) alert("用户被封禁")
                    else {
                        this.props.func(response)
                        this.setState({ isModalVisible_Login: false })
                    }
                }
            }
        ).catch(
            error => { console.log(error) }
        )
    }

    onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo)
    }

    handleCancel_Login() {
        this.setState({ isModalVisible_Login: false })
    }

    showModal_Login() {
        this.setState({ isModalVisible_Login: true })
    }

    render() {
        return (
            <div>
                <Button onClick={() => this.showModal_Login()}>登录</Button>

                <Modal title="登录" visible={this.state.isModalVisible_Login}
                    onCancel={() => this.handleCancel_Login()} footer={[]}>
                    <Form
                        {...this.layout}
                        name="Login"
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
                                    message: 'Please input your username!',
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
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...this.tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item {...this.tailLayout}>
                            <Button type="primary" htmlType="submit">登录</Button>
                        </Form.Item>

                    </Form>
                </Modal>
            </div>
        )
    }
}

export default withRouter(Login)