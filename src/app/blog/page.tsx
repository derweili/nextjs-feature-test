import { Suspense } from "react"
import { ArticleCard } from "@/components/article-card"
import { RefreshButton } from "@/components/refresh-button"

// MIGRATED from: export const dynamic = 'force-dynamic'
// → Wrapped dynamic content in Suspense boundary (required for Cache Components)
// This page uses cache: 'no-store' in fetch, so it will remain dynamic

interface Article {
  id: number
  title: string
  body: string
  userId: number
}

async function getRandomArticles(): Promise<Article[]> {
  try {
    // Fetch all posts first
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch articles')
    }
    
    const allPosts: Article[] = await response.json()
    
    // Get 6 random articles
    const shuffled = allPosts.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 6)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

async function ArticlesList() {
  const articles = await getRandomArticles()

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Sorry, we couldn&apos;t load any articles at the moment.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
            <p className="text-muted-foreground mt-2">
              Discover random articles from our collection
            </p>
          </div>
          <RefreshButton label="Refresh Articles" />
        </div>
      </div>

      <Suspense fallback={
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading articles...</p>
        </div>
      }>
        <ArticlesList />
      </Suspense>
    </div>
  )
}
