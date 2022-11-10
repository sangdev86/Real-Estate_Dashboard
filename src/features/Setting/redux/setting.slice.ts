import { TYPE_SETTING } from 'src/features/Setting/redux/setting.action';
import { createSlice } from '@reduxjs/toolkit';
import { delay } from 'src/utils/time';
import { initialState } from './setting.init-state';
import { ACTION } from 'src/components/Actions/reducer/actions';

export const settingsSlice = createSlice({
  name: 'SETTINGS',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    const { post, get, put, del } = ACTION;
    const {
      createPermission,
      updatePermission,
      deletePermission,
      getAllPermissions,
      createGroupName,
      getAllGroupsNames,
      updateGroupName,
      deleteGroupName,
      setPermissionsToGroupName,
      getAllApprovalmanagers,
      getAllAddressOfCurrentUser
    } = TYPE_SETTING;
    builder
      //1. Permission
      .addCase(get(getAllPermissions).pending, (state) => {
        state.isFetching = true;
        delay();
      })
      .addCase(get(getAllPermissions).fulfilled, (state, action: any) => {
        state.isFetching = false;
        state.allPermissions = action.payload;
      })
      .addCase(get(getAllPermissions).rejected, (state) => {
        state.isFetching = false;
      })
      //-
      .addCase(post(createPermission).pending, (state) => {
        state.isFetching = true;
        delay();
      })
      .addCase(post(createPermission).fulfilled, (state) => {
        state.isFetching = false;
      })
      .addCase(post(createPermission).rejected, (state) => {
        state.isFetching = false;
      })
      //-
      .addCase(put(updatePermission).pending, (state) => {
        state.isFetching = true;
        delay();
      })
      .addCase(put(updatePermission).fulfilled, (state) => {
        state.isFetching = false;
      })
      .addCase(put(updatePermission).rejected, (state) => {
        state.isFetching = false;
      })
      //
      .addCase(del(deletePermission).pending, (state) => {
        state.isFetching = true;
        delay();
      })
      .addCase(del(deletePermission).fulfilled, (state) => {
        state.isFetching = false;
      })
      .addCase(del(deletePermission).rejected, (state) => {
        state.isFetching = false;
      })

      //2. GroupName
      .addCase(get(getAllGroupsNames).pending, (state) => {
        state.isFetching = true;
        delay(1);
      })
      .addCase(get(getAllGroupsNames).fulfilled, (state, action: any) => {
        state.isFetching = false;
        state.allGroupNames = action.payload;
      })
      .addCase(get(getAllGroupsNames).rejected, (state) => {
        state.isFetching = false;
      })
      //-create
      .addCase(post(createGroupName).pending, (state) => {
        state.isFetching = true;
        delay(1);
      })
      .addCase(post(createGroupName).fulfilled, (state) => {
        state.isFetching = false;
      })
      .addCase(post(createGroupName).rejected, (state) => {
        state.isFetching = false;
      })
      //-update
      .addCase(put(updateGroupName).pending, (state) => {
        state.isFetching = true;
        delay(1);
      })
      .addCase(put(updateGroupName).fulfilled, (state) => {
        state.isFetching = false;
      })
      .addCase(put(updateGroupName).rejected, (state) => {
        state.isFetching = false;
      })
      //-set
      .addCase(put(setPermissionsToGroupName).pending, (state) => {
        state.isFetching = true;
        delay(1);
      })
      .addCase(put(setPermissionsToGroupName).fulfilled, (state) => {
        state.isFetching = false;
      })
      .addCase(put(setPermissionsToGroupName).rejected, (state) => {
        state.isFetching = false;
      })
      .addCase(del(deleteGroupName).pending, (state) => {
        state.isFetching = true;
        delay(1);
      })
      .addCase(del(deleteGroupName).fulfilled, (state) => {
        state.isFetching = false;
      })
      .addCase(del(deleteGroupName).rejected, (state) => {
        state.isFetching = false;
      })

      //3. Approvalmanagers
      .addCase(get(getAllApprovalmanagers).pending, (state) => {
        state.isFetching = true;
        delay();
      })
      .addCase(get(getAllApprovalmanagers).fulfilled, (state, action: any) => {
        state.isFetching = false;
        state.allApprovalmanagers = action.payload;
      })
      .addCase(get(getAllApprovalmanagers).rejected, (state) => {
        state.isFetching = false;
      })

      //-;

      // 4.Address
      .addCase(get(getAllAddressOfCurrentUser).pending, () => {
        delay(0);
      })
      .addCase(get(getAllAddressOfCurrentUser).fulfilled, (state, action: any) => {
        state.allAddressCurrentUser = action.payload;
      })
      .addCase(get(getAllAddressOfCurrentUser).rejected, () => {});
  }
});
