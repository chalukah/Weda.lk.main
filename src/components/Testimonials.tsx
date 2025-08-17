'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Quote, Star } from 'lucide-react'
import styles from './Testimonials.module.css'
import { useEffect, useState } from 'react'

interface Review {
  id: string
  rating: number
  comment: string
  createdAt: string
  reviewer: {
    name: string
    avatar: string | null
    initials: string
  }
  service: {
    name: string
    type: string
  }
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews/public?limit=20')
        if (response.ok) {
          const data = await response.json()
          setReviews(data.reviews)
        }
      } catch (error) {
        console.error('Error fetching reviews:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  // If no reviews available, don't show the section
  if (!loading && reviews.length === 0) {
    return null
  }

  const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2))
  const secondRow = reviews.slice(Math.ceil(reviews.length / 2))

  const TestimonialCard = ({ review }: { review: Review }) => (
    <Card className="testimonial-card mr-6 h-56 w-80 flex-shrink-0 bg-white shadow-md">
      <CardContent className="flex h-full flex-col justify-between p-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">for {review.service.type}</span>
          </div>
          <blockquote className="line-clamp-4 text-sm leading-relaxed text-gray-700">
            "{review.comment}"
          </blockquote>
        </div>
        <div className="mt-4 flex items-center">
          <Avatar className="mr-3 h-10 w-10">
            <AvatarImage src={review.reviewer.avatar || undefined} alt={review.reviewer.name} />
            <AvatarFallback className="text-xs">{review.reviewer.initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-semibold text-gray-900">{review.reviewer.name}</div>
            <div className="text-xs text-gray-600">via {review.service.name}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <section className="overflow-hidden bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              What Our Clients Say
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Loading customer testimonials...
            </p>
          </div>
          <div className="flex gap-6">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="h-56 w-80 flex-shrink-0 animate-pulse bg-white shadow-md">
                  <CardContent className="p-4">
                    <div className="mb-4 h-4 rounded bg-gray-200"></div>
                    <div className="mb-2 h-3 rounded bg-gray-200"></div>
                    <div className="mb-2 h-3 rounded bg-gray-200"></div>
                    <div className="mb-4 h-3 rounded bg-gray-200"></div>
                    <div className="flex items-center">
                      <div className="mr-3 h-10 w-10 rounded-full bg-gray-200"></div>
                      <div>
                        <div className="mb-1 h-3 w-20 rounded bg-gray-200"></div>
                        <div className="h-2 w-16 rounded bg-gray-200"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="overflow-hidden bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Real reviews from customers who have used our service platform.
          </p>
        </div>

        {firstRow.length > 0 && (
          <div className={`${styles.marqueeContainer} mb-8`}>
            <div className={`${styles.marquee} ${styles.marqueeLeft} flex`}>
              {firstRow.concat(firstRow).map((review, index) => (
                <TestimonialCard key={`${review.id}-${index}`} review={review} />
              ))}
            </div>
          </div>
        )}

        {secondRow.length > 0 && (
          <div className={styles.marqueeContainer}>
            <div className={`${styles.marquee} ${styles.marqueeRight} flex`}>
              {secondRow.concat(secondRow).map((review, index) => (
                <TestimonialCard key={`${review.id}-${index}`} review={review} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
