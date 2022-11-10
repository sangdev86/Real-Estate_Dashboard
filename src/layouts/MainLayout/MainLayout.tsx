import { Box } from '@mui/material';
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { IMenuItem } from 'src/config/routes';
import Sidebar from './Sidebar/Sidebar';
import Navigation from './Navigation/Navigation';
import './mainLayout.scss';
import { ContentLayout } from './ContentLayout/ContentLayout';

interface IProps {
  routes: IMenuItem[];
}

export const MainLayout: React.FC<IProps> = (props: IProps) => {
  const [sidebar, setSidebar] = React.useState(true);
  const [id, setId] = React.useState(-1);

  const handleSidebar = (agr: boolean) => {
    setSidebar(agr);
    setId(-1);
  };
  const handleSetId = (index: number) => {
    setId(index);
  };

  const onOff = () => (sidebar ? 'on' : 'off');

  return (
    <Box id="main-layout">
      <Box className={'sidebar ' + onOff()}>
        <Sidebar sidebar={sidebar} id={id} handleSetId={handleSetId} routes={props.routes} />
      </Box>
      <Box className={'main-content ' + onOff()}>
        <Navigation handleSidebar={handleSidebar} />
        <Box id="content-layout">
          <Box className="content-wrapper">
            <Switch>
              {props.routes.map((item) =>
                item.subRoute?.map((sub: IMenuItem) => (
                  <Route key={sub.path} exact path={sub.path}>
                    <ContentLayout sub={sub} parentsSub={item} />
                  </Route>
                ))
              )}
              <Redirect from="*" to={props.routes[0].path} />
            </Switch>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
