import React from 'react'
import Carousel from 'react-material-ui-carousel'

export default function Component (props) {
  const { ItemList, Item } = props

  return (
    <Carousel {...props}>
      {
        ItemList.map((item, i) => <Item key={i} item={item} />)
      }
    </Carousel>
  )
}
