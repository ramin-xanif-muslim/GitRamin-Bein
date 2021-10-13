import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../actions/getData-action'
import GridExampleContainer from './TransactionPage'
import ButtonsWrapper from '../components/ButtonsWrapper'
import buttonsNames from '../ButtonsNames/Transactions/buttonsNames'
import filterObject from '../config/filterObject'
import { setRedirect,isDeleted } from '../actions/delActions/delData-action'
import ok from '../audio/ok.mp3'
import Sound from 'react-sound';
import { getOwners,getDepartments } from '../actions/getGroups-action'

class Transaction extends Component {


    componentDidMount() {
        filterObject.pg = 0
        filterObject.id = ''
        filterObject.gp = ''
        this.props.getDepartments('departments')
        this.props.setRedirect(false)
        this.props.getOwners('owners')
    }
    handleDeleteDoc = () => {
        this.props.isDeleted(false)
    }
    render() {
        return (
            <div className='table_holder'>

                <ButtonsWrapper from={'normal'} fetchFast={'transactions'} buttonsName={buttonsNames} activeitem={this.props.state.navbar.activeItem} activesubitem={this.props.state.navbar.activeSubItem} />
                <GridExampleContainer groups={this.props.state.groups.groups} />
                < Sound
                    url={ok}
                    playStatus={this.props.state.putdatas.isdeleted ? Sound.status.PLAYING : Sound.status.Stopped}
                    onFinishedPlaying={this.handleDeleteDoc}

                />
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    fetchData,getOwners,getDepartments,setRedirect,isDeleted

}
export default connect(mapStateToProps, mapDispatchToProps)(Transaction)
