import { applyMiddleware, /*compose,*/ createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//import monitorReducersEnhancer from './enhancers/monitorReducers'
//import loggerMiddleware from './middleware/logger'
import appReducers from './reducers/index'

export default function configureStore(preloadedState) {
  const middlewares = [/*loggerMiddleware,*/ thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer /*, monitorReducersEnhancer*/]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(appReducers, preloadedState, composedEnhancers)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(appReducers))
  }

  return store
}