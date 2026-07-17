import { BatteryMedium, Search, Terminal, Wifi } from 'lucide-react'
import { useEffect, useState } from 'react'

const formatTime = (date: Date) => {
  const weekday = new Intl.DateTimeFormat(undefined, { weekday: 'short' }).format(date)
  const month = new Intl.DateTimeFormat(undefined, { month: 'short' }).format(date)
  const day = new Intl.DateTimeFormat(undefined, { day: 'numeric' }).format(date)
  const time = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)

  return `${weekday} ${month} ${day} ${time}`
}

export default function MenuBar() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <header className="menu-bar">
      <div className="menu-bar__menus" aria-label="Terminal application menu">
        <span className="menu-bar__active-app">
          <Terminal aria-hidden="true" />
          Terminal
        </span>
        <span>Shell</span>
        <span>Edit</span>
        <span>View</span>
        <span>Window</span>
        <span>Help</span>
      </div>

      <div className="menu-bar__status">
        <span className="menu-bar__system-icons" aria-label="System status">
          <BatteryMedium aria-label="Battery" />
          <Wifi aria-label="Wi-Fi connected" />
          <Search aria-label="Search" />
        </span>
        <time dateTime={now.toISOString()}>{formatTime(now)}</time>
      </div>
    </header>
  )
}
