import React from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'


const TableLoader = (props) => {
    return (
        <Segment className={`${props.className}`}>
            <Dimmer active>
                <Loader />
            </Dimmer>
        </Segment>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TableLoader)


