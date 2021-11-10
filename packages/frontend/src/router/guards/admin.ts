export const admin: Voodollz.Guard = ({ next, store }) => {
  if (store.auth.loggedIn.value && store.auth.state.admin) {
    next()
  } else {
    next({
      name: 'admin-login',
      stopPipeline: true,
    })
  }
}
