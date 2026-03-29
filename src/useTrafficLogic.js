import { useState, useEffect, useRef, useCallback } from 'react';

const PHASES = ['NS_GREEN', 'NS_YELLOW', 'EW_GREEN', 'EW_YELLOW'];

export function useTrafficLogic() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(15);
  const [isRunning, setIsRunning] = useState(false);
  
  const [queues, setQueues] = useState({
    N: [], 
    S: [], 
    E: [], 
    W: []  
  });

  const nextVehicleId = useRef(0);
  const tickRef = useRef(null);

  const spawnVehicle = useCallback((direction, type, color) => {
    setQueues(prev => ({
      ...prev,
      [direction]: [...prev[direction], {
         id: nextVehicleId.current++,
         type, 
         color,
         spawnTime: Date.now()
      }]
    }));
  }, []);

  const removeVehicleFromQueue = useCallback((direction, vehicleId) => {
    setQueues(prev => ({
      ...prev,
      [direction]: prev[direction].filter(v => v.id !== vehicleId)
    }));
  }, []);

  const tick = useCallback(() => {
    const currentPhase = PHASES[phaseIndex];
    
    if (Math.random() > 0.6) {
      const directions = ['N', 'S', 'E', 'W'];
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const types = ['car', 'car', 'suv', 'bus'];
      const colors = ['#ffffff', '#ff2222', '#2222ff', '#aaaaaa', '#111111', '#eecc00'];
      spawnVehicle(
         dir, 
         types[Math.floor(Math.random() * types.length)],
         colors[Math.floor(Math.random() * colors.length)]
      );
    }

    if (timeRemaining <= 1) {
      const nextIndex = (phaseIndex + 1) % PHASES.length;
      const nextPhase = PHASES[nextIndex];
      setPhaseIndex(nextIndex);
      
      if (nextPhase === 'NS_YELLOW' || nextPhase === 'EW_YELLOW') {
         setTimeRemaining(3); 
      } else if (nextPhase === 'NS_GREEN') {
         setQueues(q => {
            const maxCars = Math.max(q.N.length, q.S.length);
            setTimeRemaining(Math.min(30, Math.max(8, maxCars * 2 + 4)));
            return q;
         });
      } else if (nextPhase === 'EW_GREEN') {
         setQueues(q => {
            const maxCars = Math.max(q.E.length, q.W.length);
            setTimeRemaining(Math.min(30, Math.max(8, maxCars * 2 + 4)));
            return q;
         });
      }
    } else {
      setTimeRemaining(prev => prev - 1);
    }
  }, [phaseIndex, timeRemaining, spawnVehicle]);

  useEffect(() => {
    if (isRunning) {
      tickRef.current = setInterval(tick, 1000);
    } else if (tickRef.current) {
      clearInterval(tickRef.current);
    }
    return () => clearInterval(tickRef.current);
  }, [isRunning, tick]);

  const toggleSimulation = () => setIsRunning(prev => !prev);
  
  useEffect(() => {
     spawnVehicle('N', 'car', '#ff0000');
     spawnVehicle('S', 'suv', '#0000ff');
     spawnVehicle('E', 'bus', '#ffffff');
  }, [spawnVehicle]);

  return { 
    phase: PHASES[phaseIndex], 
    timeRemaining, 
    isRunning, 
    toggleSimulation,
    queues,
    removeVehicleFromQueue
  };
}
