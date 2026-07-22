import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAppStore } from '../store/useAppStore';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CustomEvent: React.FC<{ event: any }> = ({ event }) => {
  return (
    <div className="flex flex-col gap-1 p-1">
      <div className="flex items-center gap-1 flex-wrap">
        {event.platforms.map((platform: string) => (
          <span 
            key={platform} 
            className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-sm bg-black/20 text-slate-900"
          >
            {platform}
          </span>
        ))}
      </div>
      <span className="text-xs font-semibold truncate w-full block">
        {event.title}
      </span>
    </div>
  );
};

export const CalendarView: React.FC = () => {
  const { scheduledPosts } = useAppStore();

  const events = scheduledPosts.map((post) => {
    const startDate = new Date(post.scheduledFor || post.createdAt);
    // Add 1 hour for end time so it shows up nicely on the calendar
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 1);

    return {
      id: post.id,
      title: post.caption,
      start: startDate,
      end: endDate,
      platforms: post.platforms,
    };
  });

  return (
    <div className="p-8 h-full min-h-[750px] flex flex-col bg-white rounded-2xl">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Content Calendar</h2>
          <p className="text-sm font-medium text-slate-500 mt-2">Visualize and manage your scheduled posts across all platforms.</p>
        </div>
      </div>
      
      <div className="flex-1 bg-slate-50/50 rounded-3xl border border-slate-200 overflow-hidden shadow-sm p-6">
        <style>
          {`
            .rbc-calendar { font-family: inherit; }
            .rbc-event {
              background-color: #dfff00 !important;
              color: #181a14 !important;
              border: 1px solid rgba(0,0,0,0.1) !important;
              border-radius: 8px !important;
              padding: 4px !important;
              box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            }
            .rbc-today {
              background-color: rgba(223, 255, 0, 0.05) !important;
            }
            .rbc-toolbar button.rbc-active {
              background-color: #dfff00 !important;
              color: #181a14 !important;
              border-color: #dfff00 !important;
              font-weight: bold;
              box-shadow: none !important;
            }
            .rbc-toolbar button:active, .rbc-toolbar button:focus {
              background-color: #dfff00 !important;
              color: #181a14 !important;
            }
            .rbc-header {
              padding: 10px 0;
              font-weight: 800;
              text-transform: uppercase;
              font-size: 0.75rem;
              color: #64748b;
              border-bottom: 2px solid #e2e8f0 !important;
            }
            .rbc-month-view {
              border-radius: 12px;
              overflow: hidden;
              border: 1px solid #e2e8f0;
            }
          `}
        </style>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={['month', 'week', 'day']}
          defaultView="month"
          components={{
            event: CustomEvent
          }}
          className="h-full"
        />
      </div>
    </div>
  );
};
