import { Divider } from 'antd'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CrownFilled, EyeFilled } from '@ant-design/icons'
import '../css/Section.css'

export class Section extends Component {
    BookLeft =
        {
            id: 1,
            title: '天嫁之合', author: '禾维', price: 999.99,
            introduce: '“薇，是你吗……”“学长，我不是，你认错人了，求你放开我——”那一晚醉酒，他却呼喊着另一个女孩儿的名字。在他眼中，她不过只是一个替身！',
            img: 'http://book.img.ireader.com/idc_1/m_1,w_156,h_208,q_100/c5938792/group61/M00/35/5A/CmQUOF2dhI2EeMSrAAAAAEiUl7k457483460.jpg?v=pky8A1kh&amp;t=CmQUOF6Ixj0.'
        }

    render() {
        return (
            <div className="pubBook">
                <div className="conBigTitle">
                    <h2>精选推荐</h2>
                    <p>
                        小说<Divider type='vertical' />励志成功<Divider type='vertical' />文学<Divider type='vertical' />经济管理<Divider type='vertical' />更多
                    </p>
                </div>
                <div className="show">
                    <div className='showLeft'>
                        <Link to={{ pathname: '/BookDetails', state: { ...this.BookLeft } }}>
                            <h3>{this.BookLeft.title}</h3>
                        </Link>
                        <p className="author">{'作者：' + this.BookLeft.author + ' 价格：' + this.BookLeft.price}</p>
                        <p className="introduce">{this.BookLeft.introduce}</p>
                        <Link to={{ pathname: '/BookDetails', state: { ...this.BookLeft } }}>
                        <span>
                            <img src={this.BookLeft.img} title={this.BookLeft.title} alt={this.BookLeft.title} className="bookCover lazy" />
                        </span>
                        </Link>
                    </div>
                    <ul className="showMid">
                        <li>
                            <img src="http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/c0e01cab/group61/M00/21/22/CmQUOV1wn9GEOlMmAAAAAJKg8kc470575815.jpg?v=18zG1qo-&amp;t=CmQUOV6Ixg4." title="宅中歌" alt="宅中歌" className="lazy" />
                            <p className="bookName">宅中歌</p>
                            <p>白鹭成双</p><p>￥999.9</p>
                        </li>
                        <li>
                            <img src="http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/b4d40c93/group61/M00/15/A2/CmQUOV1eXVOEZgKZAAAAACMUKlk298154081.jpg?v=lXgf2ndV&amp;t=CmQUOV1eXVM." title="悍女三嫁" alt="悍女三嫁" className="lazy" />
                            <p className="bookName">悍女三嫁</p>
                            <p>秋李子</p><p>￥999.9</p>
                        </li>
                        <li className="tb">
                            <img src="http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/e5f3c04e/group61/M00/60/F9/CmQUOV3p8t6EAa2hAAAAACHwWUU991029340.jpg?v=uXBVqjto&amp;t=CmQUOV6Ixpw." title="先婚后爱，楚少慢慢来" alt="先婚后爱，楚少慢慢来" className="lazy" />
                            <p className="bookName">先婚后爱，楚少慢慢来</p>
                            <p>天青烟雨</p><p>￥999.9</p>
                        </li>
                        <li className="tb">
                            <img src="http://book.img.ireader.com/idc_1/m_1,w_117,h_156,q_100/f2287521/group61/M00/41/84/CmQUOF22T3WEegFfAAAAAN4Ab38274066577.jpg?v=kgAYVXKY&amp;t=CmQUOF6IxlU." title="前妻的春天" alt="前妻的春天" className="lazy" />
                            <p className="bookName">前妻的春天</p>
                            <p>蓝岚</p><p>￥999.9</p>
                        </li>
                    </ul>

                    <div className="showRight">
                        <h3><CrownFilled />  畅销榜</h3>
                        <ul>
                            <li className="onShow">
                                {/* <dl className="close">
                                    <dt>1</dt>
                                    <dd>
                                        <span className="bookName">三体全集（全3册）</span>
                                        <span className="num"><s></s>3542</span>
                                    </dd>
                                </dl> */}
                                <dl className="open">
                                    <dt>1</dt>
                                    <dd>
                                        <div>
                                            <span className="bookPic">
                                                <img src="http://book.img.ireader.com/idc_1/m_1,w_63,h_84,q_100/207a5913/group61/M00/9C/7A/CmQUOVycjHiEHEavAAAAAAqB0h8765287492.jpg?v=zzHQJdFa&amp;t=CmQUOV6IxR4." title="三体全集（全3册）" alt="三体全集（全3册）" className="lazy" />
                                            </span>
                                            <div className="bookCon">
                                                <p>三体全集（全3册</p>
                                                <span className="num"><EyeFilled />3542</span>
                                            </div>
                                        </div>
                                    </dd>
                                </dl>
                            </li>
                            <li className="">
                                <dl className="close">
                                    <dt>2</dt>
                                    <dd>
                                        <span className="bookName">
                                            大秦帝国（套装版）
                                        </span>
                                        <span className="num"><EyeFilled />1862</span>
                                    </dd>
                                </dl>
                                {/* <dl className="open">
                                    <dt>2</dt>
                                    <dd>
                                        <div>
                                            <span className="bookPic">
                                                <img src="http://book.img.ireader.com/idc_1/m_1,w_63,h_84,q_100/ad6185bc/group6/M00/42/98/CmRaIVjdD-eERmKLAAAAABtu_rA893342291.jpg?v=Rv_SQ5vR&amp;t=CmQUN1_a1lM." title="大秦帝国（套装版）" alt="大秦帝国（套装版）" className="lazy" />
                                            </span>
                                            <div className="bookCon">
                                                <p>大秦帝国（套装版）</p>
                                                <span className="num"><s></s>1862</span>
                                            </div>
                                        </div>
                                    </dd>
                                </dl> */}
                            </li>
                            <li className="">
                                <dl className="close">
                                    <dt>3</dt>
                                    <dd>
                                        <span className="bookName">
                                            锦云遮，陌上霜
                                        </span>
                                        <span className="num"><EyeFilled />4039</span>
                                    </dd>
                                </dl>
                                {/* <dl className="open">
                                    <dt>3</dt>
                                    <dd>
                                        <div>
                                            <span className="bookPic">
                                                <img src="http://book.img.ireader.com/idc_1/m_1,w_63,h_84,q_100/ec1db13a/group61/M00/D6/89/CmQUOGAzUriEccoFAAAAAJ3YkT8570688526.jpg?v=zOrLpn-R&amp;t=CmQUOGAzUrg." title="锦云遮，陌上霜" alt="锦云遮，陌上霜" className="lazy" />
                                            </span>
                                            <div className="bookCon">
                                                <p>锦云遮，陌上霜</p>
                                                <span className="num"><s></s>4039</span>
                                            </div>
                                        </div>
                                    </dd>
                                </dl> */}
                            </li>
                            <li className="">
                                <dl className="close">
                                    <dt>4</dt>
                                    <dd>
                                        <span className="bookName">
                                            寡妇恩仇记
                                        </span>
                                        <span className="num"><EyeFilled />4780</span>
                                    </dd>
                                </dl>
                                {/* <dl className="open">
                                    <dt>4</dt>
                                    <dd>
                                        <div>
                                            <span className="bookPic">
                                                <img src="http://book.img.ireader.com/idc_1/m_1,w_63,h_84,q_100/5af0cb91/group61/M00/9C/EE/CmQUOF_hdAOEAJjRAAAAACrsB3Q830241728.jpg?v=7wJShkB2&amp;t=CmQUOF_hdAM." title="寡妇恩仇记" alt="寡妇恩仇记" className="lazy" />
                                            </span>
                                            <div className="bookCon">
                                                <p>
                                                    寡妇恩仇记
                                                </p>
                                                <span className="num"><s></s>4780</span>
                                            </div>
                                        </div>
                                    </dd>
                                </dl> */}
                            </li>
                            <li className="">
                                <dl className="close">
                                    <dt>5</dt>
                                    <dd>
                                        <span className="bookName">
                                            我的相公有点多
                                        </span>
                                        <span className="num"><EyeFilled />126</span>
                                    </dd>
                                </dl>
                                {/* <dl className="open">
                                    <dt>5</dt>
                                    <dd>
                                        <div>
                                            <span className="bookPic">
                                                <img src="http://book.img.ireader.com/idc_1/m_1,w_63,h_84,q_100/cc992c22/group61/M00/F8/62/CmQUOGBQKfeEOpyvAAAAAAZiJcw120396389.jpg?v=xdxsCSon&amp;t=CmQUOGBQKfc." title="我的相公有点多" alt="我的相公有点多" className="lazy" />
                                            </span>
                                            <div className="bookCon">
                                                <p>我的相公有点多</p>
                                                <span className="num"><s></s>126</span>
                                            </div>
                                        </div>
                                    </dd>
                                </dl> */}
                            </li>
                            <li className="">
                                <dl className="close">
                                    <dt>6</dt>
                                    <dd>
                                        <span className="bookName">
                                            新宋（全15册）
                                        </span>
                                        <span className="num"><EyeFilled />2003</span>
                                    </dd>
                                </dl>
                                {/* <dl className="open">
                                    <dt>6</dt>
                                    <dd>
                                        <div>
                                            <span className="bookPic">
                                                <img src="http://book.img.ireader.com/idc_1/m_1,w_63,h_84,q_100/cb514062/group61/M00/B7/3B/CmQUOV5DXWqEcQVpAAAAAGCVK7k559559908.jpg?v=42aMRQRB&amp;t=CmQUOV5DXWo." title="新宋（全15册）" alt="新宋（全15册）" className="lazy" />
                                            </span>
                                            <div className="bookCon">
                                                <p>新宋（全15册）</p>
                                                <span className="num"><s></s>2003</span>
                                            </div>
                                        </div>
                                    </dd>
                                </dl> */}
                            </li>
                            <li className="">
                                <dl className="close">
                                    <dt>7</dt>
                                    <dd>
                                        <span className="bookName">
                                            明朝那些事儿大合集
                                        </span>
                                        <span className="num"><EyeFilled />2306</span>
                                    </dd>
                                </dl>
                                {/* <dl className="open">
                                    <dt>7</dt>
                                    <dd>
                                        <div>
                                            <span className="bookPic">
                                                <img src="http://book.img.ireader.com/idc_1/m_1,w_63,h_84,q_100/67e53ed9/group6/M00/7E/40/CmQUOFjdKNCEMS_lAAAAAB2dzDM402138497.jpg?v=GZw2bjIq&amp;t=CmQUNl9jKEw." title="明朝那些事儿大合集" alt="明朝那些事儿大合集" className="lazy" />
                                            </span>
                                            <div className="bookCon">
                                                <p>明朝那些事儿大合集</p>
                                                <span className="num"><s></s>2306</span>
                                            </div>
                                        </div>
                                    </dd>
                                </dl> */}
                            </li>
                            <li>
                                <dl className="close">
                                    <dt>8</dt>
                                    <dd>
                                        <span className="bookName">
                                            世家妇
                                        </span>
                                        <span className="num"><EyeFilled />1677</span>
                                    </dd>
                                </dl>
                                {/* <dl className="open">
                                    <dt>8</dt>
                                    <dd>
                                        <div>
                                            <span className="bookPic">
                                                <img src="http://book.img.ireader.com/idc_1/m_1,w_63,h_84,q_100/abe4074a/group61/M00/52/CB/CmQUOF9gLtuEb_GdAAAAAOUqrCQ387246071.jpg?v=dvYCFXck&amp;t=CmQUOF9gLts." title="世家妇" alt="世家妇" className="lazy" />
                                            </span>
                                            <div className="bookCon">
                                                <p>世家妇</p>
                                                <span className="num"><s></s>1677</span>
                                            </div>
                                        </div>
                                    </dd>
                                </dl> */}
                            </li>
                            <li>
                                <dl className="close">
                                    <dt>9</dt>
                                    <dd>
                                        <span className="bookName">
                                            簪中录合集
                                        </span>
                                        <span className="num"><EyeFilled />1966</span>
                                    </dd>
                                </dl>
                                {/* <dl className="open">
                                    <dt>9</dt>
                                    <dd>
                                        <div>
                                            <span className="bookPic">
                                                <img src="http://book.img.ireader.com/idc_1/m_1,w_63,h_84,q_100/5a9badfd/group61/M00/54/26/CmQUOV3XlxiEZX65AAAAAMf8Ebw891867179.jpg?v=4m_zP0b8&amp;t=CmQUOV6IsaQ." title="簪中录合集" alt="簪中录合集" className="lazy" />
                                            </span>
                                            <div className="bookCon">
                                                <p>簪中录合集</p>
                                                <span className="num"><s></s>1966</span>
                                            </div>
                                        </div>
                                    </dd>
                                </dl> */}
                            </li>
                            <li>
                                <dl className="close">
                                    <dt>10</dt>
                                    <dd>
                                        <span className="bookName">
                                            大江大河（大全集共4册）
                                        </span>
                                        <span className="num"><EyeFilled />351</span>
                                    </dd>
                                </dl>
                                {/* <dl className="open">
                                    <dt>10</dt>
                                    <dd>
                                        <div>
                                            <span className="bookPic">
                                                <img src="http://book.img.ireader.com/idc_1/m_1,w_63,h_84,q_100/9d0a1350/group61/M00/03/C9/CmQUOGBcKFCEaQk3AAAAAKfTVA4727474127.jpg?v=gaHDwTim&amp;t=CmQUOGBcKFA." title="大江大河（大全集共4册）" alt="大江大河（大全集共4册）" className="lazy" />
                                            </span>
                                            <div className="bookCon">
                                                <p>大江大河（大全集共4册）</p>
                                                <span className="num"><s></s>351</span>
                                            </div>
                                        </div>
                                    </dd>
                                </dl> */}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
