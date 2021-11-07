import mitt from 'mitt'

type Events = {
  'Loader:toggle': boolean
}

const emitter = mitt<Events>()

export { emitter }
