import React from 'react';
import { Cpu, BarChart3, GitBranch, Share2 } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}

function StatCard({ icon, title, value, description }: StatCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 hover:bg-white/10 transition-colors">
      <div className="flex items-center space-x-4">
        <div className="bg-purple-500/20 p-3 rounded-lg">
          {icon}
        </div>
        <div>
          <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
          <p className="text-white text-2xl font-semibold">{value}</p>
        </div>
      </div>
      <p className="text-gray-400 text-sm mt-2">{description}</p>
    </div>
  );
}

interface RecentProjectProps {
  name: string;
  type: string;
  date: string;
  accuracy: string;
}

function RecentProject({ name, type, date, accuracy }: RecentProjectProps) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-white/5 rounded-lg transition-colors">
      <div className="flex items-center space-x-4">
        <div className="bg-purple-500/20 p-2 rounded-lg">
          <GitBranch className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h4 className="text-white font-medium">{name}</h4>
          <p className="text-gray-400 text-sm">{type}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-white font-medium">{accuracy}</p>
        <p className="text-gray-400 text-sm">{date}</p>
      </div>
    </div>
  );
}

export function Dashboard() {
  const stats = [
    {
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      title: "Active Models",
      value: "12",
      description: "Models currently in production"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-purple-400" />,
      title: "Average Accuracy",
      value: "94.2%",
      description: "Across all deployed models"
    },
    {
      icon: <Share2 className="w-6 h-6 text-purple-400" />,
      title: "API Calls",
      value: "8.4K",
      description: "In the last 24 hours"
    }
  ];

  const recentProjects = [
    {
      name: "Customer Churn Predictor",
      type: "Classification",
      date: "2h ago",
      accuracy: "96.5%"
    },
    {
      name: "Sales Forecasting",
      type: "Time Series",
      date: "5h ago",
      accuracy: "92.8%"
    },
    {
      name: "Image Recognition",
      type: "Computer Vision",
      date: "1d ago",
      accuracy: "95.1%"
    }
  ];

  return (
    <div className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mt-8 space-y-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-lg p-8">
            <h1 className="text-3xl font-bold text-white mb-4">Welcome to MLflow</h1>
            <p className="text-gray-300 max-w-2xl">
              Get started by selecting a workflow from the side navigation. Build, train, and deploy
              your machine learning models with just a few clicks.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Recent Projects */}
          <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Projects</h2>
              <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-2">
              {recentProjects.map((project, index) => (
                <RecentProject key={index} {...project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;