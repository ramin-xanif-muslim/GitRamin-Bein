import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { updateSubheader } from '../actions/getNavbar-action';
import { updateZIndex, openSettingPage } from '../actions/updateStates-action'
import { logOut, ClearNav } from '../actions/putLogin-actions.js/logOut'
import { Icon } from 'semantic-ui-react'

// TODO: This is missing functionality for sub-menu here from SUI core examples.
// The "Publish To Web" item should contain a sub-menu.



const dropdownText = (user) => (
    <p className='custom_margin_null main_header_items flex-direction-column'>
        <span>{user}</span>
        <br />
        <span>99.9 <sup>₼</sup></span>
    </p>
)

const DropdownLogin = (props) => {

    const onOpen = () => {
        props.updateZIndex(true)
    }

    const onClose = () => {
        props.updateZIndex(false)
    }


    const openSettingPage = () => {
        props.openSettingPage(true)
        props.updateSubheader('', '')
    }

    const logOut = () => {
        props.logOut()
        props.ClearNav()
    }
    return (
        <Dropdown onOpen={onOpen} onClose={onClose} className='flex-direction-column-center admin_menu ' text={
            <div className='admin_dropdown_text' style={{ flexDirection: 'row' }}>
                <p
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        marginRight: '12px',
                        marginBottom: '0'
                    }}
                >
                    <span>{props.state.profile.profile.CompanyName}</span>
                    <span>{JSON.parse(localStorage.getItem('user')).Login}</span>
                </p>
                <img style={{ margin: '0' }} className='small_logo_pics custom_width' src={`/images/newSetAdmin.png`} />
            </div>
        }>
            <Dropdown.Menu>
                <Dropdown.Item onClick={openSettingPage} as={Link} to={'/settings'}><span>Ayarlar</span></Dropdown.Item>
                <Dropdown.Item><span>Xəbərlər</span></Dropdown.Item>
                <Dropdown.Item><span>Balans {props.state.notifications.AccountBalance} ₼</span></Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logOut} text='Çıxış' />
            </Dropdown.Menu>


        </Dropdown >
    )


}

const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = {
    updateZIndex, logOut, ClearNav, openSettingPage, updateSubheader
}

export default connect(mapStateToProps, mapDispatchToProps)(DropdownLogin)
