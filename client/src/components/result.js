import { h, render, Component } from 'preact'
import { ListGroup, ListGroupItem } from 'reactstrap'
import styledComponents from 'styled-components'

const Wrapper = styledComponents.div`
    margin: 15px 0;

    .title, .artist {
        margin-bottom: 5px;
    }

    .artist {
        font-size: 14px;
        color: #888;
    }

    .title {
        ._32kbps, ._180p {
            color: #16758C;
        }
    
        ._128kbps, ._360p {
            color: darkgreen;
        }
    
        ._320kbps, ._480p {
            color: darkblue;
        }
    
        ._500kbps, ._720p {
            color: orange;
        }
    
        ._lossless, ._1080p {
            color: red;
        }
    }
`

export default class Result extends Component {
    render() {
        return(
            <Wrapper>
                <ListGroup>
                    <ListGroupItem>
                        <p class='title'>
                            <a href='http://m2.chiasenhac.vn/mp3/vietnam/v-pop/minh-cuoi-nhau-di~huynh-james-pjnboys~tsvcwtrwqv9fa9.html'>Mình Cưới Nhau Đi</a> <span>3:55</span> <span class='_lossless'>Lossless</span>
                        </p>
                        
                        <p class='artist'>Huỳnh James; Pjnboys</p>
                    </ListGroupItem>
                </ListGroup>
            </Wrapper>
        )
    }
}