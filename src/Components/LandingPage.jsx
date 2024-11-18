import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Zap, Users, Trophy, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
export default function LandingPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    e.preventDefault();
    // Handle email submission here
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-purple-600 dark:text-purple-400"
          >
            QuizMaster
          </Link>
          <div className="space-x-4">
            <Link
              to="/admin"
              className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
            >
              Admin Dashboard
            </Link>
            <Link
              to="/login"
              className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
            >
              Signup
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4">
        <section className="py-20 text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            Master Any Subject with{" "}
            <span className="text-purple-600 dark:text-purple-400">
              Personalized Quizzes
            </span>
          </h1>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
            Engage, learn, and excel with our interactive and customized quiz
            platform.
          </p>
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Get Started for Free
          </Button>
        </section>

        <section id="features" className="py-20">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-white">
            Why Choose QuizMaster?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {[
              {
                icon: Brain,
                title: "Adaptive Learning",
                description:
                  "Personalized quizzes that adapt to your knowledge level",
              },
              {
                icon: Zap,
                title: "Instant Feedback",
                description:
                  "Get immediate results and explanations for each answer",
              },
              {
                icon: Users,
                title: "Collaborative Study",
                description:
                  "Create and share quizzes with friends or classmates",
              },
              {
                icon: Trophy,
                title: "Gamified Experience",
                description: "Earn points, badges, and climb the leaderboard",
              },
              {
                icon: Sparkles,
                title: "Personalized Quizzes",
                description:
                  "Create custom quizzes tailored to your specific learning needs",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="transition-all duration-300 hover:shadow-lg dark:bg-gray-800"
              >
                <CardContent className="p-6">
                  <feature.icon className="w-12 h-12 mb-4 text-purple-600 dark:text-purple-400" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-20 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
            Ready to Boost Your Knowledge?
          </h2>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
            Join thousands of learners and start your journey today.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-64 dark:bg-gray-700 dark:text-white"
              required
            />
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white"
            >
              Start Learning Now
            </Button>
          </form>
        </section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2023 QuizMaster. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <Link
              href="#"
              className="hover:text-purple-600 dark:hover:text-purple-400"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="hover:text-purple-600 dark:hover:text-purple-400"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="hover:text-purple-600 dark:hover:text-purple-400"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
