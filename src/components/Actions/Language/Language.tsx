import * as React from 'react';
import { useDispatch } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { objToArr1 } from 'src/utils/objToArr';
import { currentLang, getLan } from 'src/assets/languages';
import { localStorageLanguage } from 'src/config/storage';
import { ACTION } from '../reducer/actions';
import { createNotification } from '../reducer';

export const Language: React.FC<any> = () => {
  const dispatch = useDispatch();
  const [lan, setLan] = React.useState(currentLang);

  React.useEffect(() => {
    dispatch(ACTION.changeLanguage(lan));
  }, [dispatch, lan]);

  const handleChange = (event: SelectChangeEvent) => {
    event.preventDefault();
    setLan(event.target.value);
    localStorageLanguage.set(event.target.value);
    dispatch(createNotification('success', getLan().notification.change_language_successful));
  };

  const languagesArr = objToArr1(getLan().languages);
  const selectLanguage = () => (
    <Select
      labelId="demo-simple-select-helper-label"
      id="demo-simple-select-helper"
      value={lan}
      label="Language"
      onChange={handleChange}
    >
      {languagesArr.map((language: any, index: number) => {
        for (const key in language) {
          return (
            <MenuItem key={index} value={`${[key]}`}>
              {language[key]}
            </MenuItem>
          );
        }
      })}
    </Select>
  );

  return (
    <FormControl sx={{ m: 1, minWidth: 160 }}>
      <InputLabel id="demo-simple-select-helper-label">{getLan().text.language}</InputLabel>
      {selectLanguage()}
    </FormControl>
  );
};
