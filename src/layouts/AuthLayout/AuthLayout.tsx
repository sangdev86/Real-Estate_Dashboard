import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { RoutesAndComponentConfig } from 'src/config/routes';

interface IProps {
  routesAndComponent: RoutesAndComponentConfig[];
}

export const AuthLayout: React.FC<IProps> = (props: IProps) => {
  return (
    <header>
      <Switch>
        {props.routesAndComponent.map((item) => (
          <Route key={item.path} path={item.path} component={item.component} />
        ))}

        {props.routesAndComponent.length > 0 ? (
          <Redirect to={props.routesAndComponent[0].path} />
        ) : null}
      </Switch>
    </header>
  );
};
