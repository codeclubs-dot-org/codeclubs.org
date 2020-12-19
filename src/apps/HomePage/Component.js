import React from 'react'
import SeoHeaders from 'components/Seo'
import useGlobal from 'store'
import { Grid, Paper } from '@material-ui/core'

export default function Component(props) {
    const [globalState, globalActions] = useGlobal()
    React.useEffect(() => {
        globalActions.api.performApi({
            apiName: 'Events',
            apiPath: '/event',
            apiAction: 'do-something',
            apiPayload: { ...globalState }
        })
    }, [globalActions.api, globalState])
    console.log('here')
    return <>
        <SeoHeaders />
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Paper>
                    Welcome to CodeClubs.org!

                    This is a test
                </Paper>
            </Grid>
        </Grid>
    </>
}
