import React, { Component } from 'react'
import Demo from './Demo'
import LoaderHOC from '../components/LoaderHOC'
import { connect } from 'react-redux'
import {fetchData} from '../actions/getData-action'
import { getGroups } from '../actions/getGroups-action'
var datas = []

function convert(array) {
    var map = {}
    for (var i = 0; i < array.length; i++) {
        var obj = array[i]
        if (!(obj.id in map)) {
            map[obj.id] = obj
            map[obj.id].children = []
        }

        if (typeof map[obj.id].name == 'undefined') {
            map[obj.id].id = obj.id
            map[obj.id].name = obj.name
            map[obj.id].parent = obj.parent
        }

        var parent = obj.parent || '-';
        if (!(parent in map)) {
            map[parent] = {}
            map[parent].children = []
        }

        map[parent].children.push(map[obj.id])
    }
    return map['-']
}
var pid;

class CustomerFolder extends Component {

 
  
    render() {
        datas = []
        this.props.groups.map(d => {
            d.ParentId === '00000000-0000-0000-0000-000000000000' ? pid = '' : pid = d.ParentId
            datas.push({
                "id": d.Id, "name": d.Name, "parent": pid,
            })
        })
        return (
            <Demo from={'editCustomer'} data={convert(datas)} />
        )
    }
}


const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    fetchData, getGroups
}
export default connect(mapStateToProps, mapDispatchToProps)(LoaderHOC(CustomerFolder, 'groups'))