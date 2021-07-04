import React, { Component } from 'react'
import HeaderInfo from '../components/HeaderInfo'
import { Button } from 'antd'
import '../css/BookView.css'
import store from '../redux/store'

export default class DetailView extends Component {
    constructor(props) {
        super(props)
        this.state = { data: {} }
    }

    componentDidMount() {
        const { id } = this.props.match.params
        fetch(`http://localhost:8080/bookdetail?id=${id}`).then(
            response => response.json()
        ).then(
            response => {
                this.setState({ data: response })
            }
        ).catch(
            error => { console.log(error) }
        )
    }

    AddToCart() {
        const bookID = this.state.data.id
        const user = store.getState().user
        if (user === null) alert("请先登录")
        else fetch(`http://localhost:8080/addToCart?bookID=${bookID}&userID=${user.id}`).then(
            response => response.text()
        ).then(
            response => {
                alert("成功加入购物车")
                console.log(response)
            }
        ).catch(error => console.log(error))
    }

    render() {
        const { data } = this.state
        return (
            <div>
                <HeaderInfo />
                <div className="bookContent">
                    <div className="bookInfor">
                        <div className="bookL">
                            <img src={data.image} alt={data.title} title={data.title} style={{ "width": "265px" }} />
                        </div>
                        <div className="bookR">
                            <div className="bookinf01">
                                <div className="bookname">
                                    {data.title}
                                </div>
                                <p>
                                    <span className="author" style={{ 'margin-right': '12px' }}> 作者：{data.author}</span>
                                </p>
                            </div>
                            <div className="bookinf02">
                                <p>
                                    <i className="price">价格：{data.price}元</i>
                                </p>
                                <Button onClick={() => this.AddToCart()}>加入购物车</Button>
                            </div>
                            <div className="bookinf03">
                                <p>
                                    {data.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}
