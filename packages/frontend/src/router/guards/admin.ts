export const admin: Voodollz.Guard = ({ next, store }) => {
  if (store.metamask.state.isOwner && store.firebase.auth.loggedIn.value) {
    next()
  } else {
    next({
      name: 'admin-login',
      stopPipeline: true,
    })
  }
}
