import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import type { View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { X, Calendar as CalendarIcon, Clock } from 'lucide-react';
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
    const { scheduledPosts, user } = useAppStore();
    const [view, setView] = useState<View>(Views.MONTH);
    const [date, setDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState<any>(null);

    const displayPosts = (user?.email === 'testy@gmail.com' && scheduledPosts.length === 0)
        ? [
            {
                id: 'mock-1',
                caption: 'Stay hydrated and smart! Introducing the revolutionary SmartBottle 💧✨',
                platforms: ['instagram', 'facebook'],
                status: 'scheduled',
                scheduledFor: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
                createdAt: new Date().toISOString(),
            },
            {
                id: 'mock-2',
                caption: 'Excited to announce our new eco-friendly features. Check out the link in bio! 🌿',
                platforms: ['twitter'],
                status: 'scheduled',
                scheduledFor: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
                createdAt: new Date().toISOString(),
            },
            {
                id: 'mock-3',
                caption: 'Meet your new favorite everyday carry. Lightweight, 100% recycled steel. ♻️',
                platforms: ['tiktok'],
                status: 'scheduled',
                scheduledFor: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
                createdAt: new Date().toISOString(),
            }
        ]
        : scheduledPosts;

    const events = displayPosts.map((post) => {
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

            <div className="flex-1 bg-slate-50/50 rounded-3xl border border-slate-200 overflow-hidden shadow-sm p-6 flex flex-col min-h-[600px]">
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
                    view={view}
                    onView={setView}
                    date={date}
                    onNavigate={setDate}
                    onSelectEvent={(event) => setSelectedEvent(event)}
                    components={{
                        event: CustomEvent
                    }}
                    className="flex-1"
                />
            </div>

            {/* Event Details Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">Post Details</h3>
                            <button 
                                onClick={() => setSelectedEvent(null)}
                                className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-900"
                            >
                                <X size={20} strokeWidth={2.5} />
                            </button>
                        </div>
                        
                        <div className="p-6">
                            <div className="mb-6">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 block">Caption</label>
                                <p className="text-sm text-slate-800 font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    {selectedEvent.title}
                                </p>
                            </div>
                            
                            <div className="flex flex-col gap-4 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                        <CalendarIcon size={18} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date</p>
                                        <p className="text-sm font-semibold text-slate-900">{format(selectedEvent.start, 'EEEE, MMMM do, yyyy')}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                                        <Clock size={18} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Time</p>
                                        <p className="text-sm font-semibold text-slate-900">{format(selectedEvent.start, 'h:mm a')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-slate-100 pt-6">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 block">Platforms</label>
                                <div className="flex gap-2 flex-wrap">
                                    {selectedEvent.platforms.map((p: string) => (
                                        <span key={p} className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wide">
                                            {p}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
