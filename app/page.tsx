import '../styles/globals.css'

import {categories} from '../cosntants'
import fetchNews from '../lib/fetchNews'


async function page() {

    const news: NewsResponse = await fetchNews(categories.join(','))

  return (
    <div>

    </div>
  )
}

export default page