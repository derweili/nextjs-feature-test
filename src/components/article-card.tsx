import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Article {
  id: number
  title: string
  body: string
  userId: number
}

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="line-clamp-2 text-lg">{article.title}</CardTitle>
        <CardDescription className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          Author ID: {article.userId}
          <Calendar className="h-4 w-4 ml-2" />
          Article #{article.id}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-4">
          {article.body}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link 
            href={`/blog/${article.id}`}
            className="flex items-center gap-2"
          >
            Read More
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
