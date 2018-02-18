import { h, render, Component } from 'preact'
import { ListGroup, ListGroupItem } from 'reactstrap'
import styledComponents from 'styled-components'

import { connect } from 'react-redux'

const Wrapper = styledComponents.div`
    margin-top: 15px;

    p {
        margin-bottom: 5px;
    }
`

class LinkDownload extends Component {
    render() {
        return(
            <Wrapper>
                <p>Downloads</p>
                <ListGroup>
                    {
                        this.props.links.map(link => 
                            <ListGroupItem>
                                <p>
                                    <a href={link.link} download>{link.label}</a>
                                </p>
                            </ListGroupItem>
                        )
                    }
                </ListGroup>
            </Wrapper>
        )
    }
}

export default connect(state => {
    return {
        links: state.links
    }
})(LinkDownload)