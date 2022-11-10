import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/root-reducer';
import { ACTION } from 'src/components/Actions/reducer/actions';
import TableCS, { ITable } from 'src/components/Table';
import { TYPE_SETTING } from '../../redux/setting.action';
const Approvalmanager: React.FC = () => {
  const allApprovalmanagers = useSelector((state: RootState) => state.settings.allApprovalmanagers);
  const currentApprovalmanager = useSelector(
    (state: RootState) => state.settings.currentApprovalmanager
  );
  const { get } = ACTION;
  const props = (): ITable => ({
    body: allApprovalmanagers,
    currentBody: currentApprovalmanager,
    widthCell: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 0, 0, 0, 0],
    mainAction: get(TYPE_SETTING.getAllApprovalmanagers),
    subAction: []
  });

  return <TableCS {...props()} />;
};

export default Approvalmanager;
