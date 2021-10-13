import React from 'react'
import { Tab } from 'semantic-ui-react'
import PricesForm from './ProductPagePricesForm'

const panes = props => {
    return (


        [
            {
                menuItem: 'Qiymət',
                render: () => <Tab.Pane attached={false}>

                    <Form.Item label="Buy Price" name='buyprice'>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="Sale Price" name='price'>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="Minimum Price" name='minprice'>
                        <InputNumber />
                    </Form.Item>
                </Tab.Pane>,
            },
            {
                menuItem: 'Parametrlər',
                render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
            },
            {
                menuItem: 'Anbar qalığı',
                render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
            },
            {
                menuItem: 'Tarix',
                render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
            },
        ]
    )

}



const ProductPageTab = (props) => (
    <div className='tab_wrapper'>
        <Tab menu={{ attached: false }} panes={panes(props)} />

    </div>
)

export default ProductPageTab





