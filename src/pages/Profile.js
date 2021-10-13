import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProfile, putProfile } from '../actions/getProfile-action'
import ProfilePage from './ProfilePage'

class Profile extends Component {
    componentDidMount() {
        var profileFilter = {}
        this.props.fetchProfile('company', profileFilter)
    }

    render() {
        return (
            <div style={{ marginTop: '200px' }}>
                <ProfilePage fetching={this.props.state.profile.fetching} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = {
    fetchProfile, putProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
