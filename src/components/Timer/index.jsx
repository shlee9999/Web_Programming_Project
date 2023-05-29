import { useTimer } from '../../hooks/useTimer';
const Timer = () => {
  const { time, startTimer, stopTimer, initializeTimer } = useTimer({
    defaultTime: 0,
  });
  return <div>{time}</div>;
};
export default Timer;
