import React from 'react';
import { appStyles } from '../Config/AppStyle';
import { useDBContext } from '../Config/DBProvider';
import { Switch, Redirect, Route } from "react-router-dom";
import { NavBar } from './NavBar';
import { NavLeft } from "./NavLeft";
import Page from './Page';
import { Home } from "./Home/Home";
import { /* Users, */ Login, Profile } from "./Users";
import { Clientes } from './Clients/Clientes';
import { RcvVenta } from './Accounts/RcvVenta';
import { XCobrar } from './Accounts/XCobrar';

const Layout = () => {
     const {isAuth} = useDBContext();
     const { root,offset,content  } = appStyles();


    if(isAuth==null) {
        return (<h1 style={{textAlign: 'center'}}>Verificando Credenciales...</h1 >)
    }

     return (
          <div className={root}>
               {!isAuth && <Login />}
               {!isAuth && <Redirect to="/Login" />}
               {isAuth &&
                    <>
                         <NavBar/>
                         <NavLeft/>
                         <div className={content}>
                              <div className={offset}></div>
                              <Page>
                                   <Switch>
                                        <Route path="/" exact>
                                             <Home />
                                        </Route>
                                        {/* <Route path="/users" >
                                             <Users/>
                                        </Route> */}
                                        <Route path="/Profile" >
                                             <Profile/>
                                        </Route>
                                        <Route path="/Clients" >
                                             <Clientes/>
                                        </Route>
                                        <Route path="/RcvVenta" >
                                             <RcvVenta/>
                                        </Route>
                                        <Route path="/XCobrar" >
                                             <XCobrar/>
                                        </Route>
                                   </Switch>
                              </Page>
                         </div>
                    </>
               }
          </div>
     )
}

export default Layout;
