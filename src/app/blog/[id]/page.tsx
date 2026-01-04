import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

interface Article {
  id: number
  title: string
  body: string
  userId: number
}

async function getArticle(id: string): Promise<Article | null> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      next: { revalidate: 300 } // Cache for 5 minutes
    })
    
    if (!response.ok) {
      return null
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}

async function getAllArticleIds(): Promise<string[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      next: { revalidate: 3600 } // Cache for 1 hour during build
    })
    
    if (!response.ok) {
      return []
    }
    
    const posts: Article[] = await response.json()
    return posts.map((post) => post.id.toString())
  } catch (error) {
    console.error('Error fetching article IDs:', error)
    return []
  }
}

export async function generateStaticParams() {
  const ids = await getAllArticleIds()
  return ids.map((id) => ({
    id: id,
  }))
}

interface BlogArticlePageProps {
  params: Promise<{ id: string }>
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { id } = await params
  const article = await getArticle(id)

  if (!article) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      <article className="space-y-6">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">{article.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Article #{article.id}</span>
            <span>•</span>
            <span>Author ID: {article.userId}</span>
          </div>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed whitespace-pre-wrap">{article.body}</p>
        </div>
      </article>
    </div>
  )
}

