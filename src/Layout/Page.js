import React from 'react';
import { Grid, Paper } from "@material-ui/core"
import { appStyles } from "../Config/AppStyle";

const Page = ({children}) => {
    const { paper } = appStyles();
    return (
        <Grid container >
            <Grid item xs={12}>
                <Paper className={paper}>
                    {children}
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Page;
