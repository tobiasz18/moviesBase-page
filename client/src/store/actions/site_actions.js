import * as site from './index'

export const changeLayout = (layout) => {
  return (dispatch) => {
    dispatch(site.appLayout(layout))
  }
}
