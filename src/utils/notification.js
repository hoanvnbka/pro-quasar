import { Notify } from 'quasar'

export default function showNotify (type, message) {
  Notify.create({
    position: 'top-right',
    type: type,
    message: message,
    timeout: 3000
  })
}
