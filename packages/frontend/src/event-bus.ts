import mitt from 'mitt'

type Events = {
  'MintErrorModal:toggle': boolean
  'MintPresaleErrorModal:toggle': boolean
  'MintSuccessModal:toggle': boolean
  'Loader:toggle': boolean
}

const emitter = mitt<Events>()

export { emitter }
