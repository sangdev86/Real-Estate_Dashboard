import { ComponentClass, FunctionComponent } from 'react';
import { ConnectedComponent } from 'react-redux';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import { AbcOutlined } from '@mui/icons-material/';
import { Login } from 'src/features/Auth/screen';
import { getLan } from 'src/assets/languages';
import ListAccounts from 'src/features/Accounts/screens/ListAccounts';
import Permission from 'src/features/Setting/screens/Permission';
import Role from 'src/features/Setting/screens/Role';
import Approvalmanager from 'src/features/Setting/screens/Approvalmanager';
import Attributes from 'src/features/RealEstate/screens/Attributes';
import Posts from 'src/features/RealEstate/screens/Posts';
import Home from 'src/features/RealEstate/screens/Home';
import ListKYC from 'src/features/Accounts/screens/KYC';
import Payments from 'src/features/History/screen/Payment';
import Invoices from 'src/features/History/screen/Invoice';

export interface IMenuItem {
  icon?: any;
  title: string;
  path: string;
  component?: ComponentClass | FunctionComponent | ConnectedComponent<any, any>;
  permission?: string;
  subRoute?: IMenuItem[];
}

export interface RoutesAndComponentConfig {
  path: string;
  component: ComponentClass | FunctionComponent | ConnectedComponent<any, any>;
}

export const authRoutes: RoutesAndComponentConfig[] = [
  {
    path: '/login',
    component: Login
  }
];

export const menuList = (): IMenuItem[] => [
  {
    icon: <PersonOutlineOutlinedIcon />,
    title: getLan().routes.accounts,
    path: '/accounts-KYC',
    subRoute: [
      { title: getLan().routes.list_account, path: '/accounts-list', component: ListAccounts },
      { title: 'KYC', path: '/accounts-KYC', component: ListKYC }
    ]
  },
  {
    icon: <AbcOutlined />,
    title: 'Lịch sử',
    path: '/history-payments',
    subRoute: [
      { title: 'Nạp tiền', path: '/history-payments', component: Payments },
      { title: 'Hóa đơn', path: '/history-invoice', component: Invoices }
    ]
  },
  {
    icon: <AdminPanelSettingsOutlinedIcon />,
    title: getLan().routes.setting,
    path: '/setting-permissions',
    subRoute: [
      { title: getLan().routes.permissions, path: '/setting-permissions', component: Permission },
      { title: getLan().routes.roles, path: '/setting-roles', component: Role },
      {
        title: getLan().routes.approvalmanager,
        path: '/setting-approvalmanagers',
        component: Approvalmanager
      }
    ]
  },
  {
    icon: <AccountTreeOutlinedIcon />,
    title: 'Bất động sản',
    path: '/real-estate-attribute',
    subRoute: [
      { title: 'Nhóm thuộc tính', path: '/real-estate-attribute', component: Attributes },
      { title: 'Tài Sản', path: '/real-estate-home', component: Home },
      { title: 'Tin đăng', path: '/real-estate-sell-post', component: Posts }
    ]
  }
];
