export const admin: Voodollz.Guard = ({ next, store }) => {
  next({
    name: 'home',
    stopPipeline: true,
  })
}
