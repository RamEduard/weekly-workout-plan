import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Container } from 'react-bootstrap';
import WorkoutCard, { WorkoutEntry } from './components/WorkoutCard';
import ProgressReport from './components/ProgressReport';
import 'bootstrap/dist/css/bootstrap.min.css';

const LOCAL_STORAGE_KEY = 'workoutHistory';

function App() {
  const [workoutData, setWorkoutData] = useState<WorkoutEntry>({
    week: 1,
    day: 1,
    pushups: 0,
    burpees: 0,
    rpe: 0,
    notes: '',
    date: new Date().toISOString(),
  });
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutEntry[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      setWorkoutHistory(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    if (workoutHistory.length > 0) {
      // Set the data for WorkoutCard for the next workout depending on the last workout
      const lastWorkout = workoutHistory[workoutHistory.length - 1];
      setWorkoutData({
        week: lastWorkout.week,
        day: lastWorkout.day + 1,
        pushups: 0,
        burpees: 0,
        rpe: 0,
        notes: '',
        date: new Date().toISOString(),
      });
    }
  }, [workoutHistory]);

  const handleDeleteWorkout = (entry: WorkoutEntry) => {
    setWorkoutHistory(prev => {
      const filtered = prev.filter(e => !(e.week === entry.week && e.day === entry.day && e.date === entry.date));
      
      // Update the workout history in localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));

      return filtered;
    });
  };

  const handleWorkoutSubmit = (entry: WorkoutEntry) => {
    let isSaved = false;

    try {
      // Append to localStorage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...workoutHistory, entry]));
      isSaved = true;
    } catch (error) {
      console.error('Error saving workout history:', error);
    }

    if (!isSaved) {
      alert('Error saving workout history. Please try again.');

      return;
    }

    // Only one entry per week/day (replace if exists)
    setWorkoutHistory(prev => {
      const filtered = prev.filter(e => !(e.week === entry.week && e.day === entry.day && e.date === entry.date));
      return [...filtered, entry];
    });

    // Set the data for WorkoutCard for the next workout depending on the last workout

    setWorkoutData({
      week: entry.week,
      day: entry.day + 1,
      pushups: 0,
      burpees: 0,
      rpe: 0,
      notes: '',
      date: new Date().toISOString(),
    });

    alert(`Workout for week ${entry.week} day ${entry.day} saved successfully!`);
  };

  return (
    <Container className="py-4">
      <h1 className="mb-3 text-center">💪 4-Week Bodyweight Progress Tracker</h1>
      <p className="text-center mb-4">
        Train 3 days/week. Track your reps, time, and RPE. Improve weekly!
      </p>

      <Tabs
        defaultActiveKey="input"
        className="mb-4"
        fill
      >
        <Tab eventKey="input" title="Today's Workout">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <WorkoutCard
              key={`w${workoutData.week}d${workoutData.day}`}
              {...workoutData}
              onSubmit={handleWorkoutSubmit}
            />
          </div>
        </Tab>

        <Tab eventKey="history" title="Workout History">
          <div className="mt-4">
            <h4>📊 Completed Workouts</h4>
            {workoutHistory.length === 0 ? (
              <p className="text-muted">Your completed workouts will appear here</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Week</th>
                      <th>Day</th>
                      <th>Push-ups</th>
                      <th>Burpees</th>
                      <th>RPE</th>
                      <th>Notes</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workoutHistory
                      .sort((a, b) => a.date.localeCompare(b.date) || a.week - b.week || a.day - b.day)
                      .map((entry, idx) => (
                        <tr key={idx}>
                          <td>{entry.date}</td>
                          <td>{entry.week}</td>
                          <td>{entry.day}</td>
                          <td>{entry.pushups}</td>
                          <td>{entry.burpees}</td>
                          <td>{entry.rpe}</td>
                          <td>{entry.notes}</td>
                          <td>
                            <button className="btn btn-danger" onClick={() => handleDeleteWorkout(entry)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Tab>

        <Tab eventKey="progress" title="Progress Report">
          <div className="mt-4">
            <h4>📈 Progress Analysis</h4>
            {workoutHistory.length === 0 ? (
              <p className="text-muted">Complete some workouts to see your progress!</p>
            ) : (
              <ProgressReport workoutHistory={workoutHistory} />
            )}
          </div>
        </Tab>
      </Tabs>

      <div className="mt-5">
        <h4>📌 Tips for Tracking</h4>
        <ul>
          <li>Use a stopwatch or timer app for 1-minute exercises.</li>
          <li>RPE: 1 = Easy, 10 = Max effort.</li>
          <li>Consistency {'>'} Perfection. Beat your best weekly.</li>
        </ul>
      </div>
    </Container>
  );
}

export default App;
