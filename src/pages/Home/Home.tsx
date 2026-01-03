import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-900 mb-4">Welcome to Snowman</h1>
          <p className="text-xl text-blue-700">A premium interactive experience</p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Modern Stack</CardTitle>
              <CardDescription>Built with latest technologies</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Vite, React, TypeScript, Tailwind CSS, and shadcn/ui for optimal performance and developer experience.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Responsive Design</CardTitle>
              <CardDescription>Works on all devices</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Mobile-first approach ensures your experience is perfect on any screen size.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Premium UI</CardTitle>
              <CardDescription>Beautiful components</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                50+ pre-built accessible components ready to use and customize.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button size="lg" className="mr-4">Get Started</Button>
          <Button size="lg" variant="outline">Learn More</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
