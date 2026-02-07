import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const articles = [
  {
    title: "Introducing Sequoia Protocol",
    excerpt: "Learn about our vision for decentralized options trading and why we're building Sequoia Protocol.",
    date: "Feb 5, 2026",
    category: "Announcement",
  },
  {
    title: "Phase 1 Presale is Now Live",
    excerpt: "Join the first phase of our presale and become an early supporter of the Sequoia ecosystem.",
    date: "Feb 3, 2026",
    category: "Presale",
  },
  {
    title: "Understanding Options Trading",
    excerpt: "A beginner's guide to options trading and how Sequoia Protocol makes it accessible to everyone.",
    date: "Feb 1, 2026",
    category: "Education",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 lg:pt-32 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              Blog & <span className="gradient-text">News</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest news, announcements, and insights from Sequoia Protocol.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <article key={index} className="glass-card p-6 hover:border-primary/30 transition-colors cursor-pointer">
                <div className="mb-4">
                  <span className="inline-block bg-primary/20 text-primary text-xs font-medium px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-foreground mb-3 hover:text-primary transition-colors">
                  {article.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-4">{article.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {article.date}
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
