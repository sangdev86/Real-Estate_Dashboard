import { history } from './history';
import { combineReducers } from '@reduxjs/toolkit';
import { accountsSlice } from '../features/Accounts/redux/accounts.slice';
import { actionsSlice } from '../components/Actions/reducer/actions.slice';
import { authSlice } from '../features/Auth/redux/auth.slice';
import { connectRouter } from 'connected-react-router';
import { settingsSlice } from 'src/features/Setting/redux/setting.slice';
import { realEstatesSlice } from 'src/features/RealEstate/redux/realEstate.slice';
import { historySlice } from 'src/features/History/redux/history.slice';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  accounts: accountsSlice.reducer,
  actions: actionsSlice.reducer,
  settings: settingsSlice.reducer,
  realEstate: realEstatesSlice.reducer,
  history: historySlice.reducer,
  router: connectRouter(history)
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
