import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redux/reducers'; // Assuming you have a rootReducer file

const store = configureStore({
  reducer: rootReducer,
 
});
export default store;
