import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
// import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import UploadIcon from '@mui/icons-material/Upload';
// import { Box, FormLabel, Typography } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import './Form.scss';
import CButton from '../Button';
import commonAction from 'src/features/common/redux/common.action';
import { Obj } from 'src/utils/checklObj';
import { Box, TextField } from '@mui/material';
import { RootState } from 'src/app/root-reducer';
import { formatValue } from '../formatValue';
import { createModal, createNotification } from '../Actions/reducer';
import Checkbox from '@mui/material/Checkbox';
import { useStyles } from './style';

export interface IRender {
  config?: {
    grid: { xs?: any; sm?: any; md?: any; lg?: any };
  };
  type: 'text' | 'password' | 'file' | 'select' | 'Multiselect' | 'date' | 'multipleChip' | '' | 0;
  label?: string;
  value: any;
  key?: any;
  width?: number;
}
export interface IType {
  [key: string]:
    | 'text'
    | 'password'
    | 'file'
    | 'select'
    | 'Multiselect'
    | 'date'
    | 'multipleChip'
    | ''
    | 0;
}
export interface IFunctionForm {
  tittleForm: string;
  button: string;
  asyncActionForm: {
    bodyAPI: IType;
    action: any;
  }[];
}

export interface IForm {
  body: any;
  dto?: any;
  typeForm: 'add' | 'post' | 'update';
  post?: IFunctionForm;
  add?: IFunctionForm;
  update?: IFunctionForm;
  subAction?: any[] | [];
  mainAction?: any;
}

export const Form: React.FC<any> = (props: IForm) => {
  // state
  const { body, dto, typeForm, subAction, mainAction } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();

  const [bodyState, setBodyState] = React.useState(body);
  const [errorState, setErrorState] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  // multiselect

  const classes = useStyles();

  const actionForm = props[typeForm];
  const arrActionState = actionForm?.asyncActionForm;
  const defaultWidth = 400;

  const stateStore = useSelector((state: RootState) => state);
  const { settings, realEstate, accounts } = stateStore;
  const { allGroupNames, allPermissions } = settings;
  const { allUsers } = accounts;
  const { allAttributes, allParentAttributes, allHome } = realEstate;

  const converKeyAPI = () => {
    const arr: any[] = [];
    const type: IType = {};
    if (arrActionState !== undefined) {
      for (let i = 0; i < arrActionState.length; i++) {
        const { bodyAPI } = arrActionState[i];
        for (const key in bodyAPI) {
          const index = arr.findIndex((item: any) => item === key);

          if (index === -1) {
            arr.push(key);
            type[key] = bodyAPI[key];
          }
        }
      }
      // console.log('bodyState', bodyState);
    }
    // console.log('arr, type', { arr, type });
    return { arr, type };
  };
  const renderF = (): IRender[] | any => {
    if (props === undefined) return;
    const { arr, type } = converKeyAPI();
    const render = [];
    if (arrActionState !== undefined) {
      for (const key in bodyState) {
        const index = arr.findIndex((item: string) => item === key);
        const value = bodyState[key as keyof typeof bodyState];
        // console.log('key', type);
        // console.log('xxas', value);
        // switch (key) {
        //   case 'GroupNamePermission':
        //     render.push({
        //       type: type['PermissionIds'],
        //       value: value,
        //       key: 'PermissionIds'
        //     });
        //     break;
        //   default:
        //     break;
        // }

        if (index > -1 && value !== undefined && type[key] !== undefined) {
          render.push({
            type: type[key],
            value: value,
            key: key
          });
        }
      }
    }
    // console.log('renderF', render);
    return render;
  };
  const renderSelect = (key: any) => {
    switch (key) {
      case 'Sex':
        return [
          { id: '1', name: 'Nam' },
          { id: '2', name: 'Nữ' }
        ].map((selectItem: any, ind: number) => (
          <MenuItem key={ind} value={selectItem.id}>
            {selectItem.name}
          </MenuItem>
        ));
      case 'GroupNameId':
        return allGroupNames?.map((selectItem: any, ind: number) => (
          <MenuItem key={ind} value={selectItem.GroupNameId}>
            {selectItem.GroupNameName}
          </MenuItem>
        ));
      case 'ParentId':
        return allParentAttributes?.map((selectItem: any, ind: number) => (
          <MenuItem key={ind} value={selectItem.AttributesId}>
            {selectItem.Name}
          </MenuItem>
        ));
      case 'Type':
        return allAttributes?.map((selectItem: any, ind: number) => (
          <MenuItem key={ind} value={selectItem.AttributesId}>
            {selectItem.Name}
          </MenuItem>
        ));
      case 'HomeId': {
        return allHome?.map((select: any, index: number) => (
          <MenuItem key={index} value={select.HomeId}>
            {select.HomeId}
          </MenuItem>
        ));
      }
      case 'UserId': {
        return allUsers?.map((select: any, index: number) => (
          <MenuItem key={index} value={select.UserId}>
            {select.Name}
          </MenuItem>
        ));
      }
    }
  };

  const renderValueMultiSelect = (key: any, value: any) => {
    switch (key) {
      case 'PermissionIds':
        const showSelect = value.map((id: any) => {
          const index = allPermissions.findIndex((per: any) => per.PermissionId == id);
          if (index > -1) {
            return allPermissions[index].PermissionDescription;
          }
        });
        return showSelect.join('/');

      default:
        break;
    }
  };
  const showValue = (property: any, value: any) => {
    return formatValue(property, value, [allGroupNames]);
  };

  const checkError = async () => {
    const { errors } = await commonAction.validate(bodyState, dto);

    if (!Obj.isEmpty(errors)) {
      setErrorState(errors);
      return true;
    }
    setErrorState({});
    return false;
  };
  const showError = (key: any) => {
    if (!Obj.isEmpty(errorState)) {
      return errorState[(key + 'Error') as keyof typeof errorState];
    }
    return '';
  };
  const checkLable = (label: any, key: any) => {
    if (label === undefined) {
      return key;
    }

    return label;
  };

  //event
  const onChangeForm = (key: number, value: any) => {
    const updateState = { ...bodyState };
    updateState[key] = value;
    setBodyState({ ...updateState });
  };

  const handleMultiselect = (key: any, value: any) => {
    const updateState = { ...bodyState };
    updateState[key] = value;
    if (value[value.length - 1] === 'all') {
      updateState[key] =
        value.length - 1 === allPermissions.length
          ? []
          : allPermissions.map((item) => item.PermissionId);
    }
    setBodyState({ ...updateState });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (await checkError()) return;
    setLoading(true);
    const arrAction: any[] = [];

    if (actionForm === undefined) return;

    const asyncActionForm = [...actionForm.asyncActionForm];
    asyncActionForm.map((item) => {
      let checkBody = false;
      const { bodyAPI, action } = item;
      const bodyAPIupdate = { ...bodyAPI };
      for (const key in bodyAPI) {
        bodyAPIupdate[key] = bodyState[key];
        if (Object.getOwnPropertyNames(bodyAPI).length === 1 && bodyState[key] === '') {
          checkBody = true;
        }
        if (body[key] !== bodyState[key]) {
          checkBody = true;
        }
      }
      if (checkBody) {
        arrAction.push(action(bodyAPIupdate));
      }
    });

    if (arrAction.length === 0) {
      dispatch(createNotification('error', 'Bạn đã không chỉnh sửa dữ liệu'));
    } else {
      await Promise.all(arrAction.map((arr: any) => dispatch(arr)))
        .then(async () => {
          console.log('chay else');
          if (subAction !== undefined) {
            console.log('sub chay');
            await Promise.all(subAction?.map((sub: any) => dispatch(sub())));
          }
          if (mainAction !== undefined) {
            console.log('main chay');
            await dispatch(mainAction());
          }
        })
        .catch((error) => console.log(error));
    }
    setLoading(false);
    dispatch(createModal(false));
  };
  const renderMultilSelect = (key: any, value: any, label: any) => {
    const renderFinal = (arr: any[], arrId: string, arrDescription: string) => {
      const isAllSelected = arr.length > 0 && value.length === arr.length;
      return (
        <Select
          labelId={label}
          multiple
          value={value}
          onChange={(e) => handleMultiselect(key, e.target.value)}
          renderValue={(idSelect) => renderValueMultiSelect(key, idSelect)}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5 + 20,
                width: 350
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
          <MenuItem
            value="all"
            classes={{
              root: isAllSelected ? classes.selectedAll : ''
            }}
          >
            <ListItemIcon>
              <Checkbox
                classes={{ indeterminate: classes.indeterminateColor }}
                checked={isAllSelected}
                indeterminate={value.length > 0 && value.length < arr.length}
              />
            </ListItemIcon>
            Select All
          </MenuItem>

          {arr.map((item: any, index: number) => (
            <MenuItem key={index} value={item[arrId]}>
              <ListItemIcon>
                <Checkbox checked={value.indexOf(item[arrId]) > -1} />
              </ListItemIcon>
              {item[arrDescription]}
            </MenuItem>
          ))}
        </Select>
      );
    };
    switch (key) {
      case 'PermissionIds':
        return renderFinal(allPermissions, 'PermissionId', 'PermissionDescription');

      default:
        break;
    }
  };
  const showValidation = (key: any) => (
    <FormHelperText variant="filled" id="outlined-weight-helper-text">
      {showError(key) ? showError(key) : <span className="transparent-validator ">validation</span>}
    </FormHelperText>
  );
  // console.log('body', body);
  // console.log('state', bodyState);getAllParentAttributes

  // const checkGrid = (gr: any) => {
  //   if (!gr) {
  //     return {...xs ={12}};
  //   }
  //   const grid = { ...gr };
  //   for (const key in grid) {
  //     if (grid[key] === null || grid[key] === undefined) {
  //       grid[key] = 12;
  //     }
  //   }
  //   return { ...grid };
  // };
  // console.log('bodyState', bodyState);
  return (
    <form id="form-custom" onSubmit={handleSubmit}>
      <Box className="tittle-form">{actionForm?.tittleForm}</Box>
      <Box className="wrapper-input">
        {renderF().map((item: IRender, index: number) => {
          const { type, label, value, key, width } = item;
          switch (type) {
            case 'text':
              return (
                <Box key={index} className="input-grid">
                  <FormControl
                    variant="outlined"
                    sx={{ width: (width ? width : defaultWidth) + 'px' }}
                  >
                    <InputLabel>{checkLable(label, key)}</InputLabel>
                    <OutlinedInput
                      type={type}
                      value={showValue(key, value)}
                      onChange={(e) => onChangeForm(key, e.target.value)}
                      placeholder={checkLable(label, key)}
                      label={checkLable(label, key)}
                    />

                    {showValidation(key)}
                  </FormControl>
                </Box>
              );
            case 'password':
              return (
                <Grid key={index} xs={12} className="input-grid">
                  <FormControl
                    variant="outlined"
                    sx={{ width: (width ? width : defaultWidth) + 'px' }}
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      {checkLable(label, key)}
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={!showPassword ? type : 'text'}
                      value={value}
                      onChange={(e) => onChangeForm(key, e.target.value)}
                      placeholder={checkLable(label, key)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label={checkLable(label, key)}
                    />
                    {showValidation(key)}
                  </FormControl>
                </Grid>
              );
            case 'select':
              return (
                <Grid key={index} xs={12} className="input-grid">
                  <FormControl key={index} sx={{ width: (width ? width : defaultWidth) + 'px' }}>
                    <InputLabel id="demo-simple-select-error-label">
                      {checkLable(label, key)}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-error-label"
                      id="demo-simple-select-error"
                      value={value}
                      defaultValue={showValue(key, value)}
                      label={checkLable(label, key)}
                      onChange={(e) => onChangeForm(key, e.target.value)}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 600,
                            width: 350
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
                      {renderSelect(key)}
                    </Select>
                    {showValidation(key)}
                  </FormControl>
                </Grid>
              );
            case 'Multiselect':
              return (
                <Grid key={index} xs={12} className="input-grid">
                  <FormControl sx={{ width: (width ? width : defaultWidth) + 'px' }}>
                    <InputLabel id="mutiple-select-label"> {checkLable(label, key)}</InputLabel>
                    {renderMultilSelect(key, value, label)}
                    {showValidation(key)}
                  </FormControl>
                </Grid>
              );
            case 'date':
              let date = value;
              if (!isNaN(Number(value)) && value > 0) {
                const d = new Date(parseInt(value));
                let m: any = d.getMonth() + 1;
                let dt: any = d.getDate();
                if (m < 10) {
                  m = '0' + m;
                }
                if (dt < 10) {
                  dt = '0' + dt;
                }
                date = `${d.getFullYear()}-${m}-${dt}`;
              }
              return (
                <Grid key={index} xs={12} className="input-grid">
                  <FormControl sx={{ width: (width ? width : defaultWidth) + 'px' }}>
                    <TextField
                      id="date"
                      label={checkLable(label, key)}
                      type="date"
                      value={date}
                      defaultValue={'1970-01-19'}
                      onChange={(e) => onChangeForm(key, e.target.value)}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                    {showValidation(key)}
                  </FormControl>
                </Grid>
              );
            case 'file':
              return (
                <Grid key={index} className="input-grid">
                  <label htmlFor="contained-button-file">
                    <input accept="image/*" id="contained-button-file" multiple type="file" />
                    <Button variant="contained" component="span">
                      Click to Upload
                    </Button>
                  </label>
                </Grid>
              );
          }
        })}
      </Box>
      <Grid item xs={12} className="submit" sx={{ textAlign: 'center' }}>
        <CButton
          type="submit"
          label={actionForm?.button}
          loading={loading}
          onClick={handleSubmit}
        />
      </Grid>
    </form>
  );
};
