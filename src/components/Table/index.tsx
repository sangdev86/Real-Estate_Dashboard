import * as React from 'react';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Select, Table } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CButton from '../Button';
import ModalCS from '../Actions/Modal';
import './_table.scss';
import { IForm } from '../Form/Form';
import { RootState } from 'src/app/root-reducer';
import { createModal, createNotification } from '../Actions/reducer';
import { formatValue } from '../formatValue';

interface Column {
  id: any;
  label: string;
  minWidth: number; // > 0 : formatValue , < 0 ko can fomat, value = Math.abs(value)
  align?: 'right';
}
export interface ITable {
  body: any[];
  featuresTable?: string;
  currentBody: any;
  sizeWH?: [number | string, number | string];
  widthCell: { [key: number]: number };
  subAction: any[] | any;
  mainAction: any;
  deleteAction?: {
    params: string;
    action: any;
  };
  resetAction?: {
    params: string;
    action: any;
  };
  isFetching?: any;
  modalForm?: IForm;
}
export default function TableCS(props: ITable) {
  const {
    body,
    featuresTable,
    currentBody,
    sizeWH,
    widthCell,
    subAction,
    mainAction,
    isFetching,
    deleteAction,
    resetAction,
    modalForm
  } = props;
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [curIndex, setCurIndex] = React.useState(-1);
  const [getParams, setGetParams] = React.useState('all');

  const open = useSelector((state: RootState) => state.actions.modal.open);
  const stateStore = useSelector((state: RootState) => state);
  const { settings, realEstate, accounts, history } = stateStore;
  const { allGroupNames, allPermissions } = settings;
  const { allUsers } = accounts;
  const { allAddressCurrentUser } = settings;
  const { allParentAttributes, allAttributes } = realEstate;
  const { allPayments } = history;

  // event

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columnsCS = (): Column[] => {
    const arr: any[] = [];
    let i = 0;
    for (const key in currentBody) {
      arr[i] = { id: key as string, label: key as string, minWidth: widthCell[i] as number };
      i++;
    }
    return arr;
  };
  const columns: readonly Column[] = columnsCS();
  const innerHight = window.innerHeight;

  const checkActiveForm = (id: number) => (curIndex === id && open ? 'active-form' : '');

  const cb = React.useCallback(async () => {
    await Promise.all(subAction.map((sub: any) => dispatch(sub())));
    dispatch(mainAction(getParams));
  }, [dispatch, getParams, mainAction, subAction]);

  React.useEffect(() => {
    cb();
  }, []);
  // vong lap//  sửa lại body lấy từ store ở tại compỏnnt này là hết
  const handleAdd = () => {
    if (!modalForm) return;
    const add = { ...modalForm };
    add.subAction = subAction;
    add.mainAction = mainAction;
    dispatch(createModal(true, add));
  };
  const handleUpdate = (row: any, id: number) => {
    if (!modalForm) return;
    const update = { ...modalForm };
    update.body = row;
    update.typeForm = 'update';
    update.subAction = subAction;
    update.mainAction = mainAction;
    setCurIndex(id);
    dispatch(createModal(true, update));
  };

  const handleDelete = (row: any) => {
    if (deleteAction) {
      const { params, action } = deleteAction;
      dispatch(action(row[params]));
    }
  };
  const handReset = (row: any) => {
    if (resetAction) {
      const { params, action } = resetAction;
      dispatch(action({ [params]: parseInt(row[params]) }))
        .then((res: any) => {
          console.log('res', res);
          dispatch(
            createNotification('success', `Mật khẩu mới: ${res.payload.PasswordRAW}`, 10000)
          );
        })
        .catch((err: any) => console.log(err));
    }
  };
  const showValue = (property: any, value: any, width: number, row: any) => {
    if (width < 0) return value;
    let result;
    switch (property) {
      case 'PermissionIds':
        return (
          <Box>
            {value.map((id: any, index: number) => {
              const indexFind = allPermissions.findIndex((item) => item.PermissionId === id);
              if (indexFind > -1) {
                const { PermissionName, PermissionDescription } = allPermissions[indexFind];
                return (
                  <Box key={index}>
                    {++index + '. '}
                    <strong>{'[' + PermissionName + ']: '}</strong>
                    {PermissionDescription}
                  </Box>
                );
              }
            })}
          </Box>
        );
      case 'Address':
        {
          const index = allAddressCurrentUser.findIndex((item: any) => value === item.AddressId);
          if (index === -1) return;
          const { Detail, Ward, District, Province } = allAddressCurrentUser[index];
          result = `${Detail + ' ' + Ward.Name + ' ' + Province.Name + ' ' + District.Name}`;
        }
        return result;
      case 'AddressId':
        {
          const index = allAddressCurrentUser.findIndex((item: any) => value === item.AddressId);
          if (index === -1) return;
          const { Detail, Ward, District, Province } = allAddressCurrentUser[index];

          result = `${Detail + ' ' + Ward.Name + ' ' + Province.Name + ' ' + District.Name}`;
        }
        return result;
      case 'Password': {
        if (resetAction) {
          result = <CButton label="Reset" loading={isFetching} onClick={() => handReset(row)} />;
        }
        return result;
      }
      default:
        return formatValue(property, value, [
          allGroupNames,
          allUsers,
          allParentAttributes,
          allAttributes
        ]);
    }
  };

  // fix cb , chauw có thời gian sửa toàn bô features
  let bodytrans = body;
  if (featuresTable) {
    switch (featuresTable) {
      case 'allPayments':
        bodytrans = allPayments;
        break;
      case 'allInvoices':
        bodytrans = history[featuresTable];
        break;
      default:
        break;
    }
  }
  return (
    <Box id="table">
      <Box onClick={handleAdd}>
        <CButton label={'Add'} loading={false} />
      </Box>
      <Box className="table-modal">
        <Box className="overlay-modal" />
        <Box className="modal-wrapper">
          <ModalCS />
        </Box>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer
          sx={{
            width: sizeWH ? sizeWH[0] : '100%',
            height: sizeWH ? sizeWH[1] : '100%',
            maxHeight: innerHight - 390
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: Math.abs(column.minWidth ? column.minWidth : 100),
                      display: widthCell[index] !== 0 ? '' : 'none'
                    }}
                  >
                    {column.label}
                    {column.label === 'Status' ? (
                      <Select
                        labelId="demo-simple-select-error-label"
                        id="demo-simple-select-error"
                        value={getParams}
                        onChange={(e) => setGetParams(e.target.value)}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 600,
                              width: 100
                            }
                          },

                          anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'center'
                          },
                          transformOrigin: {
                            vertical: 'top',
                            horizontal: 'center'
                          },
                          variant: 'menu'
                        }}
                      >
                        {/* <MenuItem value={'all'}>All</MenuItem>
                        <MenuItem value={'wait'}>Đợi Duyệt</MenuItem>
                        <MenuItem value={'verified'}>Đã Duyệt</MenuItem>
                        <MenuItem value={'rejected'}>Đã từ chối</MenuItem> */}
                      </Select>
                    ) : (
                      ''
                    )}
                  </TableCell>
                ))}
                <TableCell sx={{ minWidth: 200, textAlign: 'center' }}>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bodytrans
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, id: number) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={id}
                      // onClick={() => handleUpdate(row, id)}
                      className={checkActiveForm(id)}
                      sx={{ cursor: 'pointer' }}
                    >
                      {columns.map((column, index) => {
                        const value = row[column.id];
                        if (columns.length - 1 === index) {
                          if (column.minWidth !== 0) {
                            return (
                              <>
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  sx={{
                                    minWidth: Math.abs(column.minWidth ? column.minWidth : 100),
                                    display: widthCell[index] !== 0 ? '' : 'none',
                                    maxWidth: 300,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                  }}
                                >
                                  {showValue(column.id, value, column.minWidth, row)}
                                </TableCell>
                                <TableCell
                                  key={column.id}
                                  sx={{ textAlign: 'center', minWidth: 230 }}
                                >
                                  <CButton
                                    label="Sửa"
                                    loading={isFetching}
                                    onClick={() => handleUpdate(row, id)}
                                  />{' '}
                                  <CButton
                                    label="Xoá"
                                    loading={isFetching}
                                    onClick={() => handleDelete(row)}
                                  />{' '}
                                </TableCell>
                              </>
                            );
                          } else {
                            return (
                              <TableCell key={column.id} sx={{ textAlign: 'center' }}>
                                <CButton
                                  label="Sửa"
                                  loading={isFetching}
                                  onClick={() => handleUpdate(row, id)}
                                />{' '}
                                <CButton
                                  label="Xoá"
                                  loading={isFetching}
                                  onClick={() => handleDelete(row)}
                                />
                              </TableCell>
                            );
                          }
                        }
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              minWidth: Math.abs(column.minWidth ? column.minWidth : 100),
                              display: widthCell[index] !== 0 ? '' : 'none',
                              maxWidth: 300,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {showValue(column.id, value, column.minWidth, row)}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100, 1000]}
          component="div"
          count={body.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
