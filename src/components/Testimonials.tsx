import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Quote } from 'lucide-react'
import styles from './Testimonials.module.css'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    company: 'Elite Properties',
    avatar: '/api/placeholder/60/60',
    quote:
      "Weda.lk transformed how we showcase properties. Our listing views increased by 300% and we're closing deals faster than ever.",
  },
  {
    id: 2,
    name: 'Michael Chen',
    company: 'Urban Realty Group',
    avatar: '/api/placeholder/60/60',
    quote:
      'The virtual tour feature is incredible. Clients can explore properties from anywhere, saving us countless hours on unnecessary viewings.',
  },
  {
    id: 3,
    name: 'Priya Patel',
    company: 'Colombo Real Estate',
    avatar: '/api/placeholder/60/60',
    quote:
      "Since using Weda.lk, we've streamlined our entire sales process. The analytics help us understand what buyers really want.",
  },
  {
    id: 4,
    name: 'David Silva',
    company: 'Modern Homes LK',
    avatar: '/api/placeholder/60/60',
    quote:
      'Outstanding platform! Our property presentations look professional and our conversion rate has doubled in just 3 months.',
  },
  {
    id: 5,
    name: 'Asha Fernando',
    company: 'Heritage Properties',
    avatar: '/api/placeholder/60/60',
    quote:
      "Weda.lk's customer support is exceptional. They helped us migrate all our listings seamlessly and provided excellent training.",
  },
  {
    id: 6,
    name: 'James Rodriguez',
    company: 'Luxury Estates',
    avatar: '/api/placeholder/60/60',
    quote:
      'The mobile experience is fantastic. My clients love browsing properties on their phones, and the interface is incredibly intuitive.',
  },
  {
    id: 7,
    name: 'Kavya Sharma',
    company: 'Premier Realty',
    avatar: '/api/placeholder/60/60',
    quote:
      "The lead generation features have revolutionized our business. We're getting qualified leads daily and closing more deals.",
  },
  {
    id: 8,
    name: 'Robert Thompson',
    company: 'Coastal Properties',
    avatar: '/api/placeholder/60/60',
    quote:
      'Integration with our existing CRM was seamless. The API is well-documented and the support team is incredibly responsive.',
  },
  {
    id: 9,
    name: 'Nina Perera',
    company: 'City Center Realty',
    avatar: '/api/placeholder/60/60',
    quote:
      "Our clients love the detailed property reports and neighborhood insights. It's become a key differentiator for our agency.",
  },
  {
    id: 10,
    name: 'Alex Mitchell',
    company: 'Highland Estates',
    avatar: '/api/placeholder/60/60',
    quote:
      'The mobile app is outstanding. I can manage my entire business on the go and my clients appreciate the real-time updates.',
  },
  {
    id: 11,
    name: 'Samantha Lee',
    company: 'Metro Properties',
    avatar: '/api/placeholder/60/60',
    quote:
      'Since switching to Weda.lk, our property search conversion has increased by 250%. The user experience is unmatched.',
  },
  {
    id: 12,
    name: 'Daniel Costa',
    company: 'Tropical Realty',
    avatar: '/api/placeholder/60/60',
    quote:
      'The analytics dashboard provides incredible insights. We can now predict market trends and adjust our strategy accordingly.',
  },
  {
    id: 13,
    name: 'Lisa Wang',
    company: 'Urban Living',
    avatar: '/api/placeholder/60/60',
    quote:
      "Customer support is phenomenal. Any issue gets resolved within hours, and they're always adding new features we request.",
  },
  {
    id: 14,
    name: 'Marcus Johnson',
    company: 'Prestige Homes',
    avatar: '/api/placeholder/60/60',
    quote:
      'The virtual staging feature is incredible. Properties sell 40% faster now and buyers can really visualize their future home.',
  },
  {
    id: 15,
    name: 'Emma Wilson',
    company: 'Garden City Realty',
    avatar: '/api/placeholder/60/60',
    quote:
      'Weda.lk has streamlined our entire workflow. From listing to closing, everything is integrated and efficient.',
  },
  {
    id: 16,
    name: 'Raj Patel',
    company: 'Diamond Properties',
    avatar: '/api/placeholder/60/60',
    quote:
      'The ROI tracking and commission management features have made our business operations so much more transparent and profitable.',
  },
  {
    id: 17,
    name: 'Sophie Anderson',
    company: 'Riverside Realty',
    avatar: '/api/placeholder/60/60',
    quote:
      'Our team productivity has increased dramatically. The collaboration tools and shared dashboards keep everyone aligned.',
  },
  {
    id: 18,
    name: 'Thomas Brown',
    company: 'Executive Estates',
    avatar: '/api/placeholder/60/60',
    quote:
      'The automated marketing campaigns have saved us countless hours while generating more qualified leads than ever before.',
  },
  {
    id: 19,
    name: 'Grace Kim',
    company: 'Modern Living Co',
    avatar: '/api/placeholder/60/60',
    quote:
      "International clients love the multi-language support and currency converter. We've expanded globally thanks to Weda.lk.",
  },
  {
    id: 20,
    name: 'Oliver Davis',
    company: 'Luxury Homes LK',
    avatar: '/api/placeholder/60/60',
    quote:
      'The white-label solution allowed us to maintain our brand identity while leveraging powerful technology. Perfect partnership.',
  },
]

export default function Testimonials() {
  const firstRow = testimonials.slice(0, 10)
  const secondRow = testimonials.slice(10, 20)

  const TestimonialCard = ({ testimonial }: { testimonial: (typeof testimonials)[0] }) => (
    <Card className="testimonial-card mr-6 h-48 w-80 flex-shrink-0 bg-white shadow-md">
      <CardContent className="flex h-full flex-col justify-between p-4">
        <div>
          <Quote className="mb-2 h-6 w-6 text-blue-500" />
          <blockquote className="line-clamp-3 text-sm leading-relaxed text-gray-700">
            "{testimonial.quote}"
          </blockquote>
        </div>
        <div className="mt-4 flex items-center">
          <Avatar className="mr-3 h-10 w-10">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback className="text-xs">
              {testimonial.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-semibold text-gray-900">{testimonial.name}</div>
            <div className="text-xs text-gray-600">{testimonial.company}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <section className="overflow-hidden bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Join thousands of real estate professionals who trust Weda.lk to grow their business.
          </p>
        </div>

        {/* First Row - Scrolling Left */}
        <div className={`${styles.marqueeContainer} mb-8`}>
          <div className={`${styles.marquee} ${styles.marqueeLeft} flex`}>
            {firstRow.concat(firstRow).map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Second Row - Scrolling Right */}
        <div className={styles.marqueeContainer}>
          <div className={`${styles.marquee} ${styles.marqueeRight} flex`}>
            {secondRow.concat(secondRow).map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
