import React from 'react';
import { Play, Pause } from 'lucide-react';

export default function Overlay({ logic }) {
  const { phase, timeRemaining, isRunning, toggleSimulation, queues } = logic;

  const directions = [
    { id: 'N', label: 'Northbound', pair: 'NS' },
    { id: 'S', label: 'Southbound', pair: 'NS' },
    { id: 'E', label: 'Eastbound', pair: 'EW' },
    { id: 'W', label: 'Westbound', pair: 'EW' }
  ];

  const getPhaseColor = () => {
    if (phase.includes('GREEN')) return 'var(--accent-emerald)';
    if (phase.includes('YELLOW')) return 'var(--accent-yellow)';
    return 'var(--text-primary)';
  };

  return (
    <div className="ui-container">
      <div className="header glass-panel" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="title-section">
          <h1 className="text-gradient">Smart Intersection</h1>
          <p>Phase-Based Control System</p>
        </div>
        <div className="controls">
          <button className="btn-icon" onClick={toggleSimulation}>
            {isRunning ? <Pause size={20} /> : <Play size={20} />}
          </button>
        </div>
      </div>

      <div className="glass-panel" style={{ alignSelf: 'flex-start', padding: 20, marginTop: 16, minWidth: 250 }}>
         <h2 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 12 }}>ACTIVE PHASE</h2>
         <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ 
               width: 32, height: 32, borderRadius: '50%', 
               background: getPhaseColor(), 
               boxShadow: `0 0 15px ${getPhaseColor()}` 
            }} />
            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>
               {phase.replace('_', ' ')}
            </div>
         </div>
         <div style={{ marginTop: 16, fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Phase Time Remaining:</span>
            <span style={{ float: 'right', fontWeight: 'bold' }}>{timeRemaining}s</span>
         </div>
         <div className="time-bar">
            <div className="time-bar-fill" style={{ width: `${(timeRemaining / 30) * 100}%`, backgroundColor: getPhaseColor() }} />
         </div>
      </div>

      <div className="lanes-panel" style={{ marginTop: 'auto' }}>
        {directions.map((dir) => {
          const isActive = phase.startsWith(dir.pair);
          const isGreen = isActive && phase.includes('GREEN');
          const isYellow = isActive && phase.includes('YELLOW');
          
          let statusClass = 'status-red';
          if (isGreen) statusClass = 'status-green';
          else if (isYellow) statusClass = 'status-yellow';

          return (
            <div key={dir.id} className={`lane-card glass-panel ${isActive ? 'active' : ''}`}>
              <div className="lane-header">
                <span>{dir.label}</span>
                <div className={`status-indicator ${statusClass}`} />
              </div>
              
              <div className="stat-row" style={{ marginTop: 12 }}>
                <span className="stat-label">Queue Length</span>
                <span className="stat-value">{queues[dir.id].length} vehicles</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
