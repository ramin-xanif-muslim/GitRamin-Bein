import React from 'react'
import { connect } from 'react-redux'

export const TokenHolder = (props) => {
    return (
        <>
        {
            props.state.login.token
        }
        </>
    )
}

const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenHolder)
