import React from 'react';

interface WorkoutCardProps {
  week: number;
  day: number;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ week, day }) => {
  const id = `w${week}d${day}`;

  return (
    <div className="col">
      <div className="card h-100 border-primary">
        <div className="card-header bg-primary text-white">Week {week} - Day {day}</div>
        <div className="card-body">
          <ul>
            <li>Push-ups: 3 sets max reps</li>
            <li>Air Squats: 3 sets of 20</li>
            <li>Plank: 2 rounds of 30 sec</li>
            <li>Burpees: 1 min max reps</li>
          </ul>
          <hr />
          <h6>Track</h6>
          <form>
            <div className="mb-2">
              <label htmlFor={`pushups${id}`} className="form-label">Push-ups (best set):</label>
              <input type="number" className="form-control" id={`pushups${id}`} />
            </div>
            <div className="mb-2">
              <label htmlFor={`burpees${id}`} className="form-label">Burpees (1 min):</label>
              <input type="number" className="form-control" id={`burpees${id}`} />
            </div>
            <div className="mb-2">
              <label htmlFor={`rpe${id}`} className="form-label">RPE (1–10):</label>
              <input type="number" className="form-control" id={`rpe${id}`} />
            </div>
            <div className="mb-2">
              <label htmlFor={`notes${id}`} className="form-label">Notes:</label>
              <textarea className="form-control" id={`notes${id}`} rows={2} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard; 