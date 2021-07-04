import React, { Component } from 'react'
import HeaderInfo from '../components/HeaderInfo'
import { BookList } from '../components/BookList'
import { Layout } from 'antd'
import '../css/HomeView.css'

export default class HomeView extends Component {

    constructor(props) {
        super(props)
        this.state = { booklist: [] }
    }

    componentDidMount() {
        console.log('HomeView执行componentDidMount()')
        if (this.state.booklist.length === 0) {
            fetch(`http://localhost:8080/booklist`).then(
                response => response.json()
            ).then(
                response => {
                    this.setState({ booklist: response })
                }
            ).catch(
                error => { console.log(error) }
            )
        }
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }
    render() {
        console.log("HomeView执行render()")
        return (
            <Layout>
                <HeaderInfo user={this.state.user} />
                {/* <Advertising /> */}
                <BookList data={typeof (this.props.location.data) != "undefined" ?
                    this.props.location.data : this.state.booklist} />
            </Layout>
        )
    }
}
