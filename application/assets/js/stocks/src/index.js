import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import 'react-dates/initialize';
import {App} from './App';
import './config';
import 'react-dates/lib/css/_datepicker.css';

window.ManageStocks = {
    render: (element) => {
        render(
            <BrowserRouter>
                <Switch>
                    <Route
                        path="/"
                        render={({match}) => (
                            <App
                                match={match}
                            />
                        )}
                    />
                </Switch>
            </BrowserRouter>,
            element
        );
    }
};
