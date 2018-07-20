import React, { PureComponent } from 'react';
import {ToastContainer} from 'react-toastify';
import { Route, Switch, withRouter } from 'react-router';

import '../styles/app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Login from '../containers/Login';
import Home from '../containers/Home';
import Order from '../containers/Order';
import User from '../containers/User';
import OrderDetail from '../containers/OrderDetail';
import UserDetail from '../containers/UserDetail';
import BookDetail from '../containers/BookDetail';

class ConfigRouter extends PureComponent{

  render(){
    const Parent = () => (
      <Switch>
        <Route exact path='/' component={Login} />
        <Route component={Child}/>
      </Switch>
    )

    const Child = () => (
      <Switch>
        <Route exact path='/home' component={Home} />
        <Route
          name="BookEditDetail"
          path="/book/:id"
          component={withRouter(BookDetail)}
        />
        <Route path='/orders' component={Order}/>
        <Route
          name="OrderEditDetail"
          path="/orders/:id"
          component={withRouter(OrderDetail)}
        />
        <Route path='/users' component={User}/>
        <Route
          name="UserEditDetail"
          path="/users/:id"
          component={withRouter(UserDetail)}
        />
        <Route path='/b' component={Login} />
      </Switch>
    )
    return(
      <div className="flex-container">
        <ToastContainer hideProgressBar={true} pauseOnHover={false}/>
        <Header/>
        <Route component={Parent}/>
        <Footer/>
      </div>
    )
  }
}

export default withRouter(ConfigRouter);



