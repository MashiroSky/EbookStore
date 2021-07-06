import React, { Component } from 'react'
import { Row, Col, Menu, Dropdown, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import '../css/HeaderInfo.css'
import 'antd/dist/antd.css'
import Search from './Search'
import Login from './Login'
import Register from './Register'
import { Link } from 'react-router-dom';
import store from '../redux/store'
import { LoginAction, LogoutAction } from '../redux/action_creator'
import { withRouter } from 'react-router'

class HeaderInfo extends Component {
    constructor(props) {
        super(props)
    }

    Logout() {
        store.dispatch(LogoutAction())
        this.props.history.push("/")
    }

    Login(values) {
        console.log("HeaderInfo执行Login")
        store.dispatch(LoginAction(values))
    }

    render() {
        const user = store.getState().user
        if (user === null) return (
            <div className='HeaderInfo'>
                <Row style={{ height: 64 }}>
                    <Col span={6}><Link to='/'><p className='logo'>EbookStore</p></Link></Col>
                    <Col span={9}></Col>

                    <Col span={5}>
                        <Search />
                    </Col>

                    <Col span={2}>
                        <Login func={(values) => this.Login(values)} />
                    </Col>
                    <Col span={2}>
                        <Register />
                    </Col>
                </Row>
            </div >
        )
        else {
            const common_menu = (
                <Menu>
                    <Menu.Item>
                        <Link to='/Cart'>我的购物车</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to='/Order'>我的订单</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <div onClick={() => this.Logout()}>退出登录</div>
                    </Menu.Item>
                </Menu>
            )
            const admin_menu = (
                <Menu>
                    <Menu.Item>
                        <Link to='/Cart'>我的购物车</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to='/Order'>我的订单</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to='/Admin'>系统管理</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <div onClick={() => this.Logout()}>退出登录</div>
                    </Menu.Item>
                </Menu>
            )
            return (
                <div className='HeaderInfo'>
                    <Row style={{ height: 64 }}>
                    <Col span={6}><Link to='/'><p className='logo'>EbookStore</p></Link></Col>
                        <Col span={9}></Col>

                        <Col span={5}>
                            <Search />
                        </Col>

                        <Col span={4}>
                            <Dropdown overlay={user.user_type ? admin_menu : common_menu} placement="bottomCenter">
                                <h1 className="welcome">
                                    您好，{user.username}  <DownOutlined />
                                </h1>
                            </Dropdown>
                        </Col>
                    </Row>
                </div >
            )
        }
    }
}

export default withRouter(HeaderInfo)