import React from 'react'
import { Helmet } from 'react-helmet-async'

export default function SeoHeaders (props) {
  return (
    <>
      <Helmet
        title={props.page_title}
        meta={[
          {
            name: 'description',
            property: 'og:description',
            content: props.desc
          },
          { property: 'og:title', content: props.page_title },
          { property: 'og:url', content: props.share_url },
          { property: 'og:image', content: props.secure_image_url },
          { property: 'og:image:type', content: props.secure_image_type },
          { property: 'twitter:image:src', content: props.secure_image_url },
          { property: 'twitter:title', content: props.page_title },
          { property: 'twitter:description', content: props.desc }
        ]}
      />
    </>
  )
}
