import { h, render, Component } from 'preact'
import { Container } from 'reactstrap'
import styledComponents from 'styled-components'
import Player from '../components/player'
import axios from 'axios'

// Redux
import { connect } from 'react-redux'
import { FETCH_LINK } from '../redux/action'

import LinkDownload from '../components/link_download'

const Wrapper = styledComponents.div`
    .title {
        h5 {
            margin-top: 15px;
            margin-bottom: 5px;
            font-weight: normal;
        }
    }

    .artist {
        font-size: 14px;
        color: #888;
    }
`.withComponent(Container)

class Download extends Component {
    constructor(props) {
        super(props)

        this.state = {
            url: ''
        }
    }

    componentWillMount() {
        this.getLink()
    }

    getLink = async () => {
        let {dispatch} = this.props

        let res = await axios({
            url: 'http://192.168.1.11:9000/download',
            method: 'get',
            params: {
                link: window.atob(this.props.link)
            }
        })

        dispatch({
            type: FETCH_LINK,
            links: res.data
        })
    }

    render() {
        return(
            <Wrapper>
                <a href={document.URL} className='title'>
                    <h5>{this.props.title}</h5>
                </a>
                <p className='artist'>{this.props.artist}</p>
                
                <Player url={this.props.links && this.props.links.length > 0 ? this.props.links[0].link : ''}/>
                <LinkDownload />
            </Wrapper>
        )
    }
}

export default connect(state => {
    return {
        links: state.links
    }
})(Download)