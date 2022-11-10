export const formatValue = (property: string, value: any, datas: any[][]) => {
  const refValue = (state: any) => {
    // console.log('property', property);
    // console.log('value', value);
    // console.log('data', datas);
    let key = property;
    switch (property) {
      case 'ParentId':
        key = 'AttributesId';
        break;
      case 'Type':
        key = 'AttributesId';
        break;
      default:
        // if (key === 'GroupNameId') {
        //   console.log(1);
        // }
        break;
    }
    if (value === 0 || value === '0') {
      return 'None';
    } else if (value) {
      for (let i = 0; i < datas.length; i++) {
        const index = datas[i].findIndex((item) => {
          return item[key] === value;
        });
        // console.log('i', i);
        // console.log('index', index);
        if (index !== -1) {
          // console.log('xxxx', index);
          // if (key === 'GroupNameId') {
          //   console.log(datas[i]);
          // }
          return datas[i][index][state];
        }
      }

      return value;
    }
  };
  switch (property) {
    case 'Email':
      return value === null ? 'None' : value;
    case 'Sex':
      let state = value;
      switch (state) {
        case '0':
          state = 'None';
          break;
        case '1':
          state = 'Nam';
          break;
        case '2':
          state = 'Nữ';
          break;
        default:
          break;
      }
      return state;
    case 'Birth':
      if (value === '0000-00-00') return 'None';
      return value;
    case 'Address':
      return value;
    case 'GroupNameId':
      return refValue('GroupNameName');
    case 'ParentId':
      return refValue('Name');
    case 'Type':
      return refValue('Name');
    case 'UserId':
      return refValue('Name');
    case 'PermissionIds':
      return refValue('');

    default:
      return value;
  }
};
