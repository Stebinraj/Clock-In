import React from 'react';
import { Grid} from 'semantic-ui-react';

const NotFound = () => {
    return (
        <>
            {/* Not Found Page Start */}
            <Grid textAlign='center' style={{ height: '100vh', background_color: '#f0f2f5' }} verticalAlign='middle'>
                <Grid.Column>
                    <h1>Not found</h1>
                </Grid.Column>
            </Grid>
            {/* Not Found page End */}
        </>
    )
}

export default NotFound