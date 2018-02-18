import { h, render, Component } from 'preact'
import { InputGroup, InputGroupAddon, Input } from 'reactstrap'
import { TiZoom } from 'react-icons/lib/ti'
import styledComponents from 'styled-components'
import axios from 'axios'

// Redux
import { connect } from 'react-redux'

const Wrapper  = styledComponents.div`
    margin-top: 15px;

    .input-group .input-group-append .input-group-text {
        background: #ffffff;

        .flip {
            -webkit-transform: scaleX(-1);
            transform: scaleX(-1);
        }
    }
`

class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: ''
        }
    }

    search = async () => {
        const { dispatch } = this.props

        let res = await axios({
            url: 'http://192.168.1.11:8888/search',
            method: 'get',
            params: {
                q: this.state.value
            }
        })

        dispatch({
            type: 'FETCH_SONG',
            songs: res.data
        })
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    render() {
        return(
            <Wrapper>
                <InputGroup>
                    <Input placeholder='Search song, video,...' onChange={this.handleChange.bind(this)} />
                    <div className='input-group-append'>
                        <button className='input-group-text' onclick={this.search.bind(this)}>
                            <TiZoom className='flip'/>
                        </button>
                    </div>
                </InputGroup>
            </Wrapper>
        )
    }
}

export default connect(state => ({
    songs: state.songs
}))(Form)