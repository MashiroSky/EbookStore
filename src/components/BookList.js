import React, { Component } from 'react'
import { Table, Image, Form, Button, Modal, Input } from 'antd'
import { Link } from 'react-router-dom'
import '../css/BookList.css'
import store from '../redux/store'

export class BookList extends Component {

    constructor(props) {
        console.log("BookList constructor:", props)
        super(props)
        this.state = { isModalVisible: false, isModalVisible_: false, bookToModify: {}, bookList: props.data }
    }

    Modify(book) {
        console.log(book)
        this.setState({ bookToModify: book, isModalVisible: true })
    }

    Delete(book) {
        console.log("BookList执行Delete()")
        let formData = new FormData()
        formData.append("ID", book.id)
        fetch(`http://localhost:8080/deleteBook`, {
            method: "POST",
            body: formData
        }).then(
            () => this.props.UpdateState()
        ).catch(error => console.log(error))
    }

    common_columns = [
        {
            title: '封面',
            dataIndex: 'Image',
            key: 'Image',
            render: (text, record) => {
                return <Image width={100} src={record.image} />
            }
        },
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
        { title: '作者', dataIndex: 'author', key: 'author' },
        { title: '价格', dataIndex: 'price', key: 'price' },
        { title: '库存量', dataIndex: 'inventory', key: 'inventory' },
        { title: 'ISBN', dataIndex: 'isbn', key: 'isbn' },
    ]
    admin_columns = [
        {
            title: '封面', dataIndex: 'Image', key: 'Image',
            render: (text, record) => {
                return <Image width={100} src={record.image} />
            }
        },
        {
            title: '书名', dataIndex: 'title', key: 'title',
            render: (text, record) => {
                return <Link to={`/BookDetails/${record['id']}`}>
                    {text}
                </Link>
            }
        },
        { title: '作者', dataIndex: 'author', key: 'author' },
        { title: '价格', dataIndex: 'price', key: 'price' },
        { title: '库存量', dataIndex: 'inventory', key: 'inventory' },
        { title: 'ISBN', dataIndex: 'isbn', key: 'isbn' },
        {
            title: '操作', dataIndex: 'operation', key: 'operation',
            render: (_, record) => {
                return (
                    <div>
                        <Button onClick={() => this.Modify(record)}>修改</Button>
                        <Button onClick={() => this.Delete(record)}>删除</Button>
                    </div>
                )
            },
        }
    ]

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

    handleCancel() {
        this.setState({ isModalVisible: false, isModalVisible_: false })
    }

    onFinish(values) {
        console.log(values)
        let formData = new FormData()
        formData.append("ID", values.id)
        formData.append("image", values.image)
        formData.append("title", values.title)
        formData.append("author", values.author)
        formData.append("price", values.price)
        formData.append("inventory", values.inventory)
        formData.append("isbn", values.isbn)
        fetch(`http://localhost:8080/modifyBook`, {
            method: "POST",
            body: formData
        }).then(
            response => response.json()
        ).then(
            response => {
                console.log(response)
                this.props.UpdateState()
            }
        ).catch(error => console.log(error))
        this.setState({ isModalVisible: false })
    }

    AddBook() {
        this.setState({ isModalVisible_: true })
    }

    onFinish_(values) {
        console.log(values)
        let formData = new FormData()
        formData.append("image", values.image)
        formData.append("title", values.title)
        formData.append("author", values.author)
        formData.append("price", values.price)
        formData.append("inventory", values.inventory)
        formData.append("isbn", values.isbn)
        fetch(`http://localhost:8080/addBook`, {
            method: "POST",
            body: formData
        }).then(
            response => response.json()
        ).then(
            response => {
                console.log(response)
                this.props.UpdateState()
            }
        ).catch(error => console.log(error))
        this.setState({ isModalVisible_: false })
    }

    render() {
        console.log("BookList执行render(), booklist:", this.props.data)
        const user = store.getState().user
        let flag;
        if (user === null) flag = false
        else if (user.user_type === false) flag = false
        else flag = true
        return (
            <div className="BookList">
                <h2> 所有书籍 </h2>
                <Button onClick={() => this.AddBook()}>添加书籍</Button>
                <Table columns={flag ? this.admin_columns : this.common_columns}
                    dataSource={this.props.data}
                    rowKey={record => record.id}>
                </Table>
                <Modal title="修改书籍" visible={this.state.isModalVisible}
                    onCancel={() => this.handleCancel()} footer={[]}>
                    <Form
                        {...this.layout}
                        name="Modify"
                        initialValues={this.state.bookToModify}
                        onFinish={(values) => this.onFinish(values)}
                    >
                        <Form.Item label="ID" name="id" required="true" hidden="true">
                            <Input />
                        </Form.Item>
                        <Form.Item label="封面" name="image"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入图片链接!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="书名" name="title"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入书名!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="作者" name="author"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入作者名!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="价格" name="price"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入价格!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="库存量" name="inventory"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入库存量!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="ISBN" name="isbn"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入ISBN!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item {...this.tailLayout}>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal title="添加书籍" visible={this.state.isModalVisible_}
                    onCancel={() => this.handleCancel()} footer={[]}>
                    <Form
                        {...this.layout}
                        name="Add"
                        onFinish={(values) => this.onFinish_(values)}
                    >
                        <Form.Item label="ID" name="id" required="true" hidden="true">
                            <Input />
                        </Form.Item>
                        <Form.Item label="封面" name="image"
                            rules={[
                                {
                                    message: '请输入图片链接!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="书名" name="title"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入书名!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="作者" name="author"
                            rules={[
                                {
                                    message: '请输入作者名!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="价格" name="price"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入价格!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="库存量" name="inventory"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入库存量!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="ISBN" name="isbn"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入ISBN!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item {...this.tailLayout}>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </Form.Item>
                    </Form>
                </Modal>


            </div>
        )
    }
}
