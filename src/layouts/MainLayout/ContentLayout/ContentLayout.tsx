import { Box, Typography } from '@mui/material';
import React from 'react';
import { Route } from 'react-router-dom';
import { IMenuItem } from 'src/config/routes';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import './ContentLayout.scss';

interface IProps {
  sub: IMenuItem;
  parentsSub: IMenuItem;
}

export const ContentLayout: React.FC<IProps> = (props: IProps) => {
  const { sub, parentsSub } = props;
  return (
    <Box id="content-component">
      <Box className="content-header">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography variant="h6" color="text.primary">
            {parentsSub.title}
          </Typography>
          <Link underline="hover" color="inherit" href={sub.path}>
            <Typography variant="h6" color="text.primary">
              {sub.title}
            </Typography>
          </Link>
        </Breadcrumbs>
        <Typography variant="h3" gutterBottom component="div">
          {sub.title}
        </Typography>
      </Box>
      <Box className="content-body">
        <Route component={sub.component} />
      </Box>
      <Box className="content-footer"></Box>
    </Box>
  );
};
