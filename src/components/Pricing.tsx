import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

const pricingPlans = [
  {
    title: 'Basic',
    price: '$29',
    period: '/month',
    description: 'Perfect for small businesses getting started',
    features: [
      'Up to 10 properties',
      'Basic analytics',
      'Email support',
      'Standard templates',
      'Mobile responsive',
    ],
    popular: false,
  },
  {
    title: 'Professional',
    price: '$79',
    period: '/month',
    description: 'Ideal for growing real estate businesses',
    features: [
      'Up to 100 properties',
      'Advanced analytics',
      'Priority support',
      'Custom templates',
      'SEO optimization',
      'Lead management',
      'Virtual tours',
    ],
    popular: true,
  },
  {
    title: 'Enterprise',
    price: '$199',
    period: '/month',
    description: 'For large agencies and enterprises',
    features: [
      'Unlimited properties',
      'Full analytics suite',
      '24/7 dedicated support',
      'White-label solution',
      'API access',
      'Custom integrations',
      'Multi-agent support',
      'Advanced reporting',
    ],
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Choose the perfect plan for your real estate business. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${plan.popular ? 'border-2 border-blue-500 shadow-lg' : ''}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 transform bg-blue-500">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
                <CardDescription className="mt-2 text-gray-600">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
