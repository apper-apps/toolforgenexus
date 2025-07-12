import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ToolGrid from "@/components/organisms/ToolGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useTools } from "@/hooks/useTools";

const Home = ({ searchQuery }) => {
  const { tools, loading, error, searchTools, getPopularTools } = useTools();
  const [featuredTools, setFeaturedTools] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      searchTools(searchQuery);
    } else {
      getPopularTools().then(() => {
        // Load featured tools separately
        setFeaturedTools(tools.slice(0, 4));
      });
    }
  }, [searchQuery]);

  const categories = [
    {
      name: "Image Tools",
      description: "Compress, convert, and optimize images",
      icon: "Image",
      color: "from-blue-500 to-cyan-500",
      route: "/image-tools",
      count: 4
    },
    {
      name: "PDF Tools", 
      description: "Merge, split, and convert PDF files",
      icon: "FileText",
      color: "from-red-500 to-pink-500",
      route: "/pdf-tools",
      count: 3
    },
    {
      name: "Text Tools",
      description: "Process and analyze text content",
      icon: "Type",
      color: "from-green-500 to-emerald-500", 
      route: "/text-tools",
      count: 3
    },
    {
      name: "Converters",
      description: "Transform data between formats",
      icon: "RefreshCw",
      color: "from-purple-500 to-indigo-500",
      route: "/all-tools",
      count: 2
    }
  ];

  if (loading) return <Loading type="tools" />;
  if (error) return <Error message={error} onRetry={() => window.location.reload()} />;

  if (searchQuery) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold text-secondary-500 mb-2">
            Search Results
          </h1>
          <p className="text-gray-600">
            Found {tools.length} tools for "{searchQuery}"
          </p>
        </div>
        <ToolGrid tools={tools} />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold text-secondary-500 mb-6">
            Essential File Tools
            <span className="block text-transparent bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text">
              Made Simple
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Transform, optimize, and convert your files instantly. No downloads, no accounts, 
            no limits. Just professional-grade tools that work in your browser.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/all-tools">
                <ApperIcon name="Grid3X3" className="h-5 w-5 mr-2" />
                Browse All Tools
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/image-tools">
                <ApperIcon name="Image" className="h-5 w-5 mr-2" />
                Start with Images
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Category Grid */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-display font-bold text-secondary-500 text-center mb-8">
            Choose Your Tool Category
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <Link to={category.route}>
                  <Card className="group cursor-pointer hover:shadow-strong border-0 overflow-hidden h-full">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                        <ApperIcon name={category.icon} className="h-8 w-8 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-display font-semibold text-secondary-500 group-hover:text-primary-500 transition-colors">
                            {category.name}
                          </h3>
                          <Badge variant="primary">{category.count} tools</Badge>
                        </div>
                        <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                          {category.description}
                        </p>
                      </div>
                      
                      <ApperIcon 
                        name="ArrowRight" 
                        className="h-5 w-5 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-200" 
                      />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Popular Tools */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-display font-bold text-secondary-500">
              Popular Tools
            </h2>
            <Button variant="outline" asChild>
              <Link to="/all-tools">
                View All
                <ApperIcon name="ArrowRight" className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <ToolGrid tools={tools} />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center px-8"
        >
          <h2 className="text-3xl font-display font-bold text-secondary-500 mb-12">
            Why Choose ToolForge?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "Zap",
                title: "Lightning Fast",
                description: "Process files instantly in your browser without uploads or downloads"
              },
              {
                icon: "Shield",
                title: "Privacy First", 
                description: "Your files never leave your device. Everything happens locally and securely"
              },
              {
                icon: "Smartphone",
                title: "Works Everywhere",
                description: "Fully responsive design that works perfectly on desktop, tablet, and mobile"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={feature.icon} className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-display font-semibold text-secondary-500 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;