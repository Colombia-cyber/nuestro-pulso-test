import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export function PollBarChart({ poll, className = "" }) {
  const data = {
    labels: poll.options || [],
    datasets: [
      {
        label: 'Votos',
        data: poll.votes || [],
        backgroundColor: [
          'rgba(249, 115, 22, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 101, 101, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderColor: [
          'rgba(249, 115, 22, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 101, 101, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(245, 158, 11, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: poll.question || 'Resultados de la Encuesta',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = poll.totalVotes || 0;
            const percentage = total > 0 ? Math.round((context.parsed.y / total) * 100) : 0;
            return `${context.parsed.y} votos (${percentage}%)`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className={`chart-container ${className}`}>
      <Bar data={data} options={options} />
    </div>
  );
}

export function PollDoughnutChart({ poll, className = "" }) {
  const data = {
    labels: poll.options || [],
    datasets: [
      {
        data: poll.votes || [],
        backgroundColor: [
          'rgba(249, 115, 22, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 101, 101, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderColor: [
          'rgba(249, 115, 22, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 101, 101, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(245, 158, 11, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: poll.question || 'Distribución de Votos',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = poll.totalVotes || 0;
            const percentage = total > 0 ? Math.round((context.parsed / total) * 100) : 0;
            return `${context.label}: ${context.parsed} votos (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <div className={`chart-container ${className}`}>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export function LivePollChart({ poll, updates = [] }) {
  const [chartData, setChartData] = React.useState(poll);

  React.useEffect(() => {
    // Update chart data when new updates arrive
    if (updates.length > 0) {
      const latestUpdate = updates[updates.length - 1];
      if (latestUpdate.pollId === poll.id) {
        setChartData(prev => ({
          ...prev,
          votes: latestUpdate.votes,
          totalVotes: latestUpdate.votes.reduce((sum, count) => sum + count, 0)
        }));
      }
    }
  }, [updates, poll.id]);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center mb-4">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
        <span className="text-sm text-gray-600">Actualizando en tiempo real</span>
      </div>
      <PollBarChart poll={chartData} />
    </div>
  );
}