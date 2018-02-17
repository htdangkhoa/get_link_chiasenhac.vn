import { h, render, Component } from 'preact'
import { InputGroup, InputGroupAddon, Input } from 'reactstrap'
import { TiZoom } from 'react-icons/lib/ti'
import styledComponents from 'styled-components'
import axios from 'axios'

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

export default class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: ''
        }
    }

    search = async () => {
        console.log(this.state.value);

        let res = await axios({
            url: 'http://localhost:8888/search?q=minh%20cuoi%20nhau%20di',
            method: 'get'
        })

        console.log(res);
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    render() {
        return(
            <Wrapper>
                <InputGroup>
                    <Input placeholder='Aa...' onChange={this.handleChange.bind(this)} />
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