import React from 'react'
import { Grid } from 'semantic-ui-react'
import TableList from '../pages/TableList'
const GridExampleContainer = ({groups}) => (
    
    <div>
        <Grid>
            <Grid.Column mobile={16} tablet={8} computer={13}>
                <TableList redirectTo={'editProduct'} from={'products'}/>
            </Grid.Column>

        </Grid>
    </div>
)

export default GridExampleContainer
