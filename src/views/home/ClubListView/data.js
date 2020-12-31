import { v4 as uuid } from 'uuid'

export default [
  {
    id: uuid(),
    registrationDeadline: 'Jan 11, 2021',
    startDate: 'Jan 28, 2021',
    description: 'Beginning Arduino',
    media: '/static/images/products/product_1.png',
    title: 'Intro to Arduino',
    numSeats: '7'
  }, {
    id: uuid(),
    registrationDeadline: 'Feb 14, 2021',
    startDate: 'Feb 28, 2021',
    description: 'Beginning Javascript',
    media: '/static/images/products/product_1.png',
    title: 'Intro to Javascript',
    numSeats: '7'
  }, {
    id: uuid(),
    registrationDeadline: 'Jan 11, 2021',
    startDate: 'Jan 28, 2021',
    description: 'Intermediate Web',
    media: '/static/images/products/product_1.png',
    title: 'Web Programming',
    numSeats: '7'
  }
]
