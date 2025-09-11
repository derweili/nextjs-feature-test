import { ArticleCard } from "@/components/article-card"
import { RefreshButton } from "@/components/refresh-button"

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
      next: { revalidate: 300 } // Cache for 5 minutes
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

export default async function BlogPage() {
  const articles = await getRandomArticles()

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
          <RefreshButton />
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Sorry, we couldn&apos;t load any articles at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}
