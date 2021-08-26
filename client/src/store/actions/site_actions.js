import * as site from './index'

export const actionName = (layout) => {
  return (dispatch) => {
    dispatch(site.appLayout(layout))
  }
}
