import { createStore } from 'vuex';
import { authModule } from './authModule.js';
import { orderModule } from './orderModule.js';

export default createStore({
  state: {
    
  },
  
  modules: {
    auth: authModule,
    order: orderModule
  }
})