const redux = require('redux');
const createStore = redux.legacy_createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_ADDED = 'CAKE_ADDED'
const ICE_CREAM_ORDERED = 'ICE_CREAM_ORDERED'
const ICE_CREAM_ADDED = 'ICE_CREAM_ADDED'

function orderCake(q = 1) {
  return {
    type: CAKE_ORDERED,
    payload: q
  }
}

function cakeAdded(q = 1) {
  return {
    type: CAKE_ADDED,
    payload: q
  }
}

function orderIceCream(q = 1) {
  return {
    type: ICE_CREAM_ORDERED,
    payload: q
  }
}

function iceCreamAdded(q = 1) {
  return {
    type: ICE_CREAM_ADDED,
    payload: q
  }
}

const initialState = {
  numOfCakes: 10,
  numOfIceCreams: 20
}

const initialCakeState = {
  numOfCakes: 10,
}
const initialIceCreamState = {
  numOfIceCreams: 20
}

const cakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - action.payload,
      }
    case CAKE_ADDED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      }
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICE_CREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - action.payload,
      }
    case ICE_CREAM_ADDED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
});
const store = createStore(rootReducer);
console.log('initialState', store.getState())
const unsubscribe = store.subscribe(() => console.log(store.getState(), 'SG'))
// store.dispatch(orderCake(2));
// store.dispatch(orderCake(1));
// store.dispatch(orderCake());
// store.dispatch(cakeAdded(3));
const actions = bindActionCreators({orderCake, cakeAdded, iceCreamAdded, orderIceCream}, store.dispatch)
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.cakeAdded(12);
actions.iceCreamAdded(2);
actions.orderIceCream(10);

unsubscribe();