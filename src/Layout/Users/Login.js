import React from 'react';
import { Card, CardHeader, CardContent, CardActions, TextField, Button, Container } from '@material-ui/core';
import { useDBContext } from '../../Config/DBProvider';
import Page from '../Page';
import { appStyles } from '../../Config/AppStyle';

const Login = () => {
    const { login, emailChange, passwordChange } = useDBContext();
    const { cardLogin, containerLogin, headerLogin, btnLogin } = appStyles();

    return (
        <Page>
            <Container fixed 
                style={{display: 'flex', justifyContent: 'center', alignItems: "center", height: "100vh"}}>
                <form onSubmit={login} className={containerLogin}>
                    <Card className={cardLogin}>
                        <CardHeader className={headerLogin} title="Login CMR - AFS Cargo" />
                        <CardContent>
                            <TextField
                                onChange={emailChange}
                                placeholder="Email"
                                fullWidth
                                type="email" />
                            <TextField
                                onChange={passwordChange}
                                placeholder="Password"
                                fullWidth
                                type="password" />
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                size="large"
                                color="primary"
                                className={btnLogin}
                                type="submit">Iniciar Session</Button>
                        </CardActions>
                    </Card>
                </form>
            </Container>
        </Page>
    )
}

export default Login;