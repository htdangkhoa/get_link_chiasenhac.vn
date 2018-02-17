import { h, render, Component } from 'preact'
import { InputGroup, InputGroupAddon, Input } from 'reactstrap'
import { TiZoom } from 'react-icons/lib/ti'
import styledComponents from 'styled-components'

const Wrapper  = styledComponents.div`
    .input-group .input-group-append .input-group-text {
        background: #ffffff;

        .flip {
            -webkit-transform: scaleX(-1);
            transform: scaleX(-1);
        }
    }
`

export default class Form extends Component {
    render() {
        return(
            <Wrapper>
                <InputGroup>
                    <Input placeholder='username' />
                    <div className='input-group-append'>
                        <button className='input-group-text'>
                            <TiZoom className='flip'/>
                        </button>
                    </div>
                </InputGroup>
            </Wrapper>
        )
    }
}