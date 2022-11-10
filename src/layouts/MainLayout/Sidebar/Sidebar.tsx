import { Box, Collapse, Divider } from '@mui/material';
import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { IMenuItem } from 'src/config/routes';
import './sidebar.scss';

// interface ISidebarProps {}

const Sidebar: React.FunctionComponent<any> = ({ sidebar, id, handleSetId, routes }) => {
  const currentPath = window.location.pathname;
  const [display, setDisplay] = React.useState(true);
  const classWrapperItem = () => {
    if (sidebar) {
      return 'wrapper-item on';
    } else {
      return 'wrapper-item off';
    }
  };
  const checkActive = (index: any, subEl = false) => {
    // debugger;
    let indexPath: any = -1;
    for (let i = 0; i < routes.length; i++) {
      indexPath = routes[i].subRoute?.findIndex((sub: IMenuItem) => sub.path === currentPath);
      if (indexPath > -1 && index === i && !subEl) {
        return 'active';
      }
      if (indexPath === index && subEl) {
        return 'active';
      }
    }
  };
  const handleClick = (index: number) => {
    if (index === id) {
      handleSetId(-1);
    } else {
      handleSetId(index);
    }
  };

  React.useEffect(() => {
    setDisplay(false);
    setTimeout(() => {
      setDisplay(true);
    }, 50);
  }, [sidebar]);

  const open = (index: number) => {
    if (index === id) return true;
    return false;
  };
  const renderMenuItem = () => {
    return routes.map((item: IMenuItem, index: number) => {
      if (item['subRoute']) {
        return (
          <Box className={'menu-item-wrapper ' + checkActive(index)} key={index}>
            <Box className={'menu-item'} onClick={() => handleClick(index)}>
              <span className="icon-item">{item.icon}</span>
              <span className="title-item">{item.title}</span>
            </Box>
            {display ? (
              <Collapse in={open(index)} timeout="auto" unmountOnExit className="sub-wrapper">
                {item.subRoute.map((sub: IMenuItem, indexSub: number) => (
                  <Link
                    to={sub.path}
                    className={'sub-item ' + checkActive(indexSub, true)}
                    key={indexSub}
                  >
                    <span className={'title-sub ' + checkActive(indexSub, true)}>{sub.title}</span>
                  </Link>
                ))}
              </Collapse>
            ) : (
              ''
            )}
          </Box>
        );
      }

      return null;
    });
  };

  return (
    <Box className="wrapper-sidebar">
      <Box className={classWrapperItem()}>
        <Link to="/admin">
          <Box className="img-logo"></Box>
        </Link>
        <Divider className="divider-sidebar" />
        <Box className="menu-list">{renderMenuItem()}</Box>
      </Box>
    </Box>
  );
};

export default withRouter(Sidebar);
