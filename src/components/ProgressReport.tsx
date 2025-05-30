import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { WorkoutEntry } from './WorkoutCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ProgressReportProps {
  workoutHistory: WorkoutEntry[];
}

const ProgressReport: React.FC<ProgressReportProps> = ({ workoutHistory }) => {
  // Sort workouts by date
  const sortedWorkouts = [...workoutHistory].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Prepare data for charts
  const labels = sortedWorkouts.map(workout => 
    `W${workout.week}D${workout.day} (${workout.date})`
  );

  const pushupsData: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Push-ups',
        data: sortedWorkouts.map(workout => workout.pushups),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
      },
    ],
  };

  const burpeesData: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Burpees',
        data: sortedWorkouts.map(workout => workout.burpees),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.1,
      },
    ],
  };

  const rpeData: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'RPE',
        data: sortedWorkouts.map(workout => workout.rpe),
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Progress Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Calculate improvements
  const calculateImprovement = (data: number[]) => {
    if (data.length < 2) return 0;
    const first = data[0];
    const last = data[data.length - 1];
    return ((last - first) / first) * 100;
  };

  const pushupsImprovement = calculateImprovement(sortedWorkouts.map(w => w.pushups));
  const burpeesImprovement = calculateImprovement(sortedWorkouts.map(w => w.burpees));

  return (
    <div className="progress-report">
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Push-ups Progress</h5>
              <Line options={chartOptions} data={pushupsData} />
              {pushupsImprovement !== 0 && (
                <p className={`mt-2 ${pushupsImprovement > 0 ? 'text-success' : 'text-danger'}`}>
                  {pushupsImprovement > 0 ? '↑' : '↓'} {Math.abs(pushupsImprovement).toFixed(1)}% improvement
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Burpees Progress</h5>
              <Line options={chartOptions} data={burpeesData} />
              {burpeesImprovement !== 0 && (
                <p className={`mt-2 ${burpeesImprovement > 0 ? 'text-success' : 'text-danger'}`}>
                  {burpeesImprovement > 0 ? '↑' : '↓'} {Math.abs(burpeesImprovement).toFixed(1)}% improvement
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">RPE Trend</h5>
              <Line options={chartOptions} data={rpeData} />
              <p className="mt-2 text-muted">
                RPE (Rate of Perceived Exertion) shows how hard you're working. 
                A stable or decreasing RPE with increasing reps indicates improved fitness.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Summary</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Total Workouts: {workoutHistory.length}
                </li>
                <li className="list-group-item">
                  Best Push-ups: {Math.max(...workoutHistory.map(w => w.pushups))}
                </li>
                <li className="list-group-item">
                  Best Burpees: {Math.max(...workoutHistory.map(w => w.burpees))}
                </li>
                <li className="list-group-item">
                  Average RPE: {(workoutHistory.reduce((sum, w) => sum + w.rpe, 0) / workoutHistory.length).toFixed(1)}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressReport; 