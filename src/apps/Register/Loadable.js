
import Loadable from '@react-loadable/revised'

import LoadingIndicator from 'components/LoadingIndicator'

export default Loadable({
  loader: () => import('./index'),
  loading: LoadingIndicator
})
