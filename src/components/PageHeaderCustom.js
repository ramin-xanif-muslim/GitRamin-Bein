
import React from 'react'
import { PageHeader } from 'antd';

 function PageHeaderCustom(props) {
 
    return (
        <PageHeader
        className="site-page-header"
        title= {props.activeSubItem}
    />
    )
}

export default PageHeaderCustom