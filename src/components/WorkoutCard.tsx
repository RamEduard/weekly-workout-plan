import React, { useState } from 'react';

interface WorkoutCardProps {
  week: number;
  day: number;
  onSubmit: (data: WorkoutEntry) => void;
}

export interface WorkoutEntry {
  week: number;
  day: number;
  pushups: number;
  burpees: number;
  rpe: number;
  notes: string;
  date: string;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ week, day, onSubmit }) => {
  const id = `w${week}d${day}`;
  const [pushups, setPushups] = useState(0);
  const [burpees, setBurpees] = useState(0);
  const [rpe, setRpe] = useState(1);
  const [notes, setNotes] = useState('');
  const [editWeek, setEditWeek] = useState(week);
  const [editDay, setEditDay] = useState(day);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      week: editWeek,
      day: editDay,
      pushups,
      burpees,
      rpe,
      notes,
      date: new Date().toISOString().split('T')[0],
    });
    setPushups(0);
    setBurpees(0);
    setRpe(1);
    setNotes('');
  };

  const handleEditWeekAndDay = () => {
    const newWeek = window.prompt(`Edit week`);
    const newDay = window.prompt(`Edit day`);

    setEditWeek(Number(newWeek));
    setEditDay(Number(newDay));
  };

  return (
    <div className="col">
      <div className="card h-100 border-primary">
        <div className="card-header bg-primary text-white">
          Week {editWeek} - Day {editDay}
          <button className="btn btn-outline-light float-end" onClick={handleEditWeekAndDay}>Edit</button>
        </div>
        <div className="card-body">
          <ul>
            <li>Push-ups: 3 sets max reps</li>
            <li>Air Squats: 3 sets of 20</li>
            <li>Plank: 2 rounds of 30 sec</li>
            <li>Burpees: 1 min max reps</li>
          </ul>
          <hr />
          <h6>Track</h6>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor={`pushups${id}`} className="form-label">Push-ups (best set):</label>
              <input type="number" className="form-control" id={`pushups${id}`} value={pushups} min={0} onChange={e => setPushups(Number(e.target.value))} />
            </div>
            <div className="mb-2">
              <label htmlFor={`burpees${id}`} className="form-label">Burpees (1 min):</label>
              <input type="number" className="form-control" id={`burpees${id}`} value={burpees} min={0} onChange={e => setBurpees(Number(e.target.value))} />
            </div>
            <div className="mb-2">
              <label htmlFor={`rpe${id}`} className="form-label">RPE (1–10):</label>
              <input type="number" className="form-control" id={`rpe${id}`} value={rpe} min={1} max={10} onChange={e => setRpe(Number(e.target.value))} />
            </div>
            <div className="mb-2">
              <label htmlFor={`notes${id}`} className="form-label">Notes:</label>
              <textarea className="form-control" id={`notes${id}`} rows={2} value={notes} onChange={e => setNotes(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-success w-100 mt-2">Save Workout</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard; 