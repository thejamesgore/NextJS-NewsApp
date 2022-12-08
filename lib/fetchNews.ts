import {gql} from 'graphql-request'

import sortNewsByImage from './sortNewsByImage'

const fetchNews = async (

    category?: Category |  string,
    keywords?: string,
    isDynamic?: boolean

) => {
    // GraphQl Query
const query = gql`
  query MyQuery(
    $access_key: String!
    $categories: String!
    $keywords: String
  )   {
    myQuery(
        access_key: $access_key
        categories: $categories
        countries: "gb"
        sort: "published_desc"
        keywords: $keywords
        ) {
      data {
        author
        category
        country
        description
        image
        language
        published_at
        source
        title
        url
      }
      pagination {
        count
        limit
        offset
        total
      }
    }
  }`


// Fetch function with Next.js 13 caching

const res = await fetch('https://gleneagle.stepzen.net/api/corn/__graphql', {
    method: 'POST',
    cache: isDynamic ? "no-cache" : "default",
    next: isDynamic ?  { revalidate: 0} : {revalidate : 60},
    headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`
    },
    body: JSON.stringify({
        query,
        variables: {
            access_key: process.env.MEDIASTACK_API_KEY,
            category: category,
            keywords: keywords,
        }
    })

    
})
console.log("Loading new data form api for category >>>", category,keywords)

const newResponse = await res.json()

const data = sortNewsByImage(newResponse.data.myQuery)



}
export default fetchNews

