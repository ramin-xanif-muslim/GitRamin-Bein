import React from 'react'
import { connect } from 'react-redux'
import { Trans, useTranslation } from 'react-i18next'
import { CSVLink } from "react-csv";
import {
    DownloadOutlined
} from '@ant-design/icons';
var headerCSV = []
const ExportCSV = (props) => {
    const { t, i18n } = useTranslation();
    headerCSV = []
    props.cols.forEach(c => {
        headerCSV.push({
            label: t(c.text.props.word),
            key: c.dataField
        })
    })
    return (
        <>
            <CSVLink   className="exoirt_csv" filename={"my-file.csv"} enclosingCharacter={`'`} separator={";"} data={props.datas} headers={headerCSV}>
                <DownloadOutlined />
            </CSVLink>
        </>

    )
}
const mapStateToProps = (state) => ({
    state
})
export default connect(mapStateToProps)(ExportCSV)
