import React from 'react';
import WorkoutCard from './components/WorkoutCard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container py-4">
      <h1 className="mb-3 text-center">💪 4-Week Bodyweight Progress Tracker</h1>
      <p className="text-center mb-4">
        Train 3 days/week. Track your reps, time, and RPE. Improve weekly!
      </p>

      <div className="row row-cols-1 row-cols-md-2 g-4">
        {Array.from({ length: 4 }, (_, week) =>
          Array.from({ length: 3 }, (_, day) => (
            <WorkoutCard key={`w${week + 1}d${day + 1}`} week={week + 1} day={day + 1} />
          ))
        )}
      </div>

      <div className="mt-5">
        <h4>📌 Tips for Tracking</h4>
        <ul>
          <li>Use a stopwatch or timer app for 1-minute exercises.</li>
          <li>RPE: 1 = Easy, 10 = Max effort.</li>
          <li>Consistency {'>'} Perfection. Beat your best weekly.</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
