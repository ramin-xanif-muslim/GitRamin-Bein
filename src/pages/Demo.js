import React from 'react';
import ReactDOM from 'react-dom';
import SuperTreeview from 'react-super-treeview';
import 'react-super-treeview/dist/style.css'
class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data.children
        };
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.data !== this.state.data) {
            this.setState({
                data: nextProps.data.children

            })
        }
    }
    render() {
        return (
            <SuperTreeview
                data={this.state.data}
                onUpdateCb={(updatedData) => {
                    this.setState({ data: updatedData })
                }}

                onCheckToggleCb={(nodes) => {
                    const checkState = nodes[0].isChecked;

                    applyCheckStateTo(nodes);

                    function applyCheckStateTo(nodes) {
                        nodes.forEach((node) => {
                            node.isChecked = checkState
                            if (node.children) {
                                applyCheckStateTo(node.children);
                            }
                        })
                    }
                }}

                // isExpandable={(nodes, depth)=>{ return (depth===0)? true : false; }}
                isExpandable={(nodes, depth) => { return (nodes.children.length === 0) ? false : true; }}
                isDeletable={(nodes, depth) => { return false }}
                isCheckable={(nodes, depth) => { return false }}

            />
        );
    }
}



export default Example