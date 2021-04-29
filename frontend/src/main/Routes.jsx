import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import VeiculoCrud from '../components/veiculos/VeiculoCrud'

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/veiculos' component={VeiculoCrud} />
        <Redirect from='*' to='/' />
    </Switch>