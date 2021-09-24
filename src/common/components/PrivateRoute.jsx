import { inject, observer } from 'mobx-react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ uiStore: { isUserAuthenticated } , ...rest }) {
    if (!isUserAuthenticated) return <Redirect to={'/'}/>

    return <Route {...rest}/>
}

export default inject('uiStore')(observer(PrivateRoute))
