import { useEffect, useState } from "react";


export const Timer = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setTime(time + 1);
    }, 1000)
  })

  return (
    <span>{getFormattedTime(time)}</span>
  )
}

const getFormattedTime = (time: number): string => {
  return new Date(time * 1000).toISOString().substr(11, 8)
}