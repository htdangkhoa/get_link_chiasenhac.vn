import { h, render, Component } from 'preact'
import { ListGroup, ListGroupItem } from 'reactstrap'
import styledComponents from 'styled-components'

import { connect } from 'react-redux'

const Wrapper = styledComponents.div`
    margin: 15px 0;

    &.hidden {
        display: none;
    }

    .title, .artist {
        margin-bottom: 5px;
    }

    .artist {
        font-size: 14px;
        color: #888;
    }

    .title {
        .greenblue {
            color: #16758C;
        }
    
        .darkgreen {
            color: darkgreen;
        }
    
        .darkblue {
            color: darkblue;
        }
    
        .orange {
            color: orange;
        }
    
        .red {
            color: red;
        }
    }
`

class Result extends Component {
    getQuality = (quality) => {
        switch (quality.toLowerCase()) {
            case '32kbps': case '180p':
                return 'greenblue'
            case '128kbps': case '360p':
                return 'darkgreen'
            case '320kbps': case '480p':
                return 'darkblue'
            case '500kbps': case 'HD 720p':
                return 'orange'
            case 'lossless': case 'HD 1080p':
                return 'red'
            default: return 'greenblue'
        }
    }

    render() {
        return(
            <Wrapper>
                <ListGroup>
                    {
                        this.props.songs.map(song => 
                            <ListGroupItem>
                                <p className='title'>
                                    <a href={song.url}>{song.title} </a>
                                    <span>{song.duration} </span>
                                    <span className={ this.getQuality(song.quality) }>
                                        {song.quality}
                                    </span>
                                </p>
                                
                                <p className='artist'>{song.artist}</p>
                            </ListGroupItem>
                        )
                    }
                </ListGroup>
            </Wrapper>
        )
    }
}

export default connect(state => ({
    songs: state.songs
}))(Result)