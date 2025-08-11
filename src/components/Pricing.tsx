import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    title: "Basic",
    price: "$29",
    period: "/month",
    description: "Perfect for small businesses getting started",
    features: [
      "Up to 10 properties",
      "Basic analytics",
      "Email support",
      "Standard templates",
      "Mobile responsive"
    ],
    popular: false
  },
  {
    title: "Professional",
    price: "$79",
    period: "/month",
    description: "Ideal for growing real estate businesses",
    features: [
      "Up to 100 properties",
      "Advanced analytics",
      "Priority support",
      "Custom templates",
      "SEO optimization",
      "Lead management",
      "Virtual tours"
    ],
    popular: true
  },
  {
    title: "Enterprise",
    price: "$199",
    period: "/month",
    description: "For large agencies and enterprises",
    features: [
      "Unlimited properties",
      "Full analytics suite",
      "24/7 dedicated support",
      "White-label solution",
      "API access",
      "Custom integrations",
      "Multi-agent support",
      "Advanced reporting"
    ],
    popular: false
  }
];

export default function Pricing() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your real estate business. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-2 border-blue-500 shadow-lg' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button 
                  className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}