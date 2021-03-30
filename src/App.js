import React, { useEffect } from 'react';
import { getIsAuth } from './redux/selectors/authSelector'
import { useDispatch, useSelector } from 'react-redux';
import "./App.css"
import { HeaderComponent } from './components/Header/Header';
import { NavbarComponent } from './components/Navbar/Navbar';
import { Dashboard } from './components/Content/Dashboard/Dashboard';
import { Route, useHistory } from 'react-router-dom';
import { Project } from './components/Content/Project/Project';
import { isAuthSetCookie } from './components/utils/isAuthSetCookie';
import { ErrorsModal } from './components/utils/ErrorsModal';
import { Chart } from './components/Charts/Сhart';

export const App = () => {
  // Устанавливаю куки в стэйт если они присутствуют
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  isAuthSetCookie(isAuth, dispatch);

  return (
    <div className="wrapper" >
      <HeaderComponent />
      <NavbarComponent />
      <div className="wrapper-content">
        <Route exact path="/dashboard" render={() => <Dashboard />} />
        <Route path="/dashboard/project/:projectId?" render={() => <Project />} />
        <Route path="/chart" render={() => <Chart />} />
      </div>
      <ErrorsModal />
    </div>
  );
};
