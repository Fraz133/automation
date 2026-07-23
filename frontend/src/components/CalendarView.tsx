import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import type { View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { X, Calendar as CalendarIcon, Clock, LayoutGrid, List, CalendarDays } from 'lucide-react';
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
        <div className="flex flex-col gap-0.5 p-1">
            <div className="flex items-center gap-1 flex-wrap">
                {event.platforms.map((platform: string) => (
                    <span
                        key={platform}
                        className="text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-md bg-slate-900/15 text-slate-900"
                    >
                        {platform}
                    </span>
                ))}
            </div>
            <span className="text-[11px] font-semibold truncate w-full block">
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

    const viewOptions: { id: View; label: string; icon: React.ReactNode }[] = [
        { id: Views.MONTH, label: 'Month', icon: <LayoutGrid size={14} /> },
        { id: Views.WEEK, label: 'Week', icon: <CalendarDays size={14} /> },
        { id: Views.DAY, label: 'Day', icon: <List size={14} /> },
    ];

    return (
        <div className="p-8 md:p-10 h-full min-h-[750px] flex flex-col bg-white rounded-2xl">
            {/* Header */}
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm">
                        <CalendarIcon size={20} className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Content Calendar</h2>
                        <p className="text-xs font-semibold text-slate-500">Visualize and manage your scheduled posts</p>
                    </div>
                </div>

                {/* Custom View Switcher */}
                <div className="flex items-center bg-slate-100 rounded-xl p-1 gap-1">
                    {viewOptions.map((v) => (
                        <button
                            key={v.id}
                            onClick={() => setView(v.id)}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                                view === v.id
                                    ? 'bg-white text-slate-900 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            {v.icon}
                            <span>{v.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100/50 rounded-2xl px-5 py-4 text-center">
                    <p className="text-2xl font-black text-indigo-600">{events.length}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Scheduled</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100/50 rounded-2xl px-5 py-4 text-center">
                    <p className="text-2xl font-black text-emerald-600">0</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Published</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-100/50 rounded-2xl px-5 py-4 text-center">
                    <p className="text-2xl font-black text-amber-600">0</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Drafts</p>
                </div>
            </div>

            {/* Calendar */}
            <div className="flex-1 bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm p-4 sm:p-6 flex flex-col min-h-[500px]">
                <style>
                    {`
            .rbc-calendar { font-family: inherit; }
            .rbc-toolbar { margin-bottom: 16px; }
            .rbc-toolbar button { 
              border-radius: 10px; 
              padding: 6px 14px;
              font-weight: 700;
              font-size: 12px;
              border: 1px solid #e2e8f0;
              transition: all 0.2s;
            }
            .rbc-toolbar button:hover {
              background-color: #f1f5f9;
            }
            .rbc-event {
              background: linear-gradient(135deg, #dfff00 0%, #c4e600 100%) !important;
              color: #181a14 !important;
              border: none !important;
              border-radius: 10px !important;
              padding: 4px 6px !important;
              box-shadow: 0 2px 8px rgba(196, 230, 0, 0.25);
              font-weight: 600;
            }
            .rbc-event:hover {
              box-shadow: 0 4px 12px rgba(196, 230, 0, 0.4);
            }
            .rbc-today {
              background-color: rgba(99, 102, 241, 0.04) !important;
            }
            .rbc-toolbar button.rbc-active {
              background: #0f172a !important;
              color: #dfff00 !important;
              border-color: #0f172a !important;
              box-shadow: 0 2px 8px rgba(15, 23, 42, 0.2);
            }
            .rbc-toolbar button:active, .rbc-toolbar button:focus {
              background-color: #f1f5f9 !important;
              color: #0f172a !important;
              box-shadow: none !important;
            }
            .rbc-header {
              padding: 12px 0;
              font-weight: 800;
              text-transform: uppercase;
              font-size: 0.7rem;
              letter-spacing: 0.05em;
              color: #64748b;
              border-bottom: 2px solid #e2e8f0 !important;
            }
            .rbc-month-view {
              border-radius: 16px;
              overflow: hidden;
              border: 1px solid #e2e8f0;
            }
            .rbc-day-bg + .rbc-day-bg,
            .rbc-month-row + .rbc-month-row {
              border-color: #f1f5f9 !important;
            }
            .rbc-off-range-bg {
              background-color: #fafafa !important;
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
                    toolbar={true}
                />
            </div>

            {/* Event Details Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-500 to-violet-600 p-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-black text-white tracking-tight">Post Details</h3>
                                <button 
                                    onClick={() => setSelectedEvent(null)}
                                    className="p-2 rounded-full hover:bg-white/20 transition-colors text-white/80 hover:text-white"
                                >
                                    <X size={18} strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>
                        
                        <div className="p-6">
                            <div className="mb-6">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block">Caption</label>
                                <p className="text-sm text-slate-800 font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    {selectedEvent.title}
                                </p>
                            </div>
                            
                            <div className="flex flex-col gap-4 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                        <CalendarIcon size={18} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</p>
                                        <p className="text-sm font-semibold text-slate-900">{format(selectedEvent.start, 'EEEE, MMMM do, yyyy')}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                                        <Clock size={18} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Time</p>
                                        <p className="text-sm font-semibold text-slate-900">{format(selectedEvent.start, 'h:mm a')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-slate-100 pt-5">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 block">Platforms</label>
                                <div className="flex gap-2 flex-wrap">
                                    {selectedEvent.platforms.map((p: string) => (
                                        <span key={p} className="px-3 py-1.5 rounded-lg bg-slate-900 text-[#dfff00] text-xs font-bold uppercase tracking-wide">
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
