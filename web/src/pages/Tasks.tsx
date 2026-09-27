import React, { useState } from 'react';
import { CheckSquare, Plus, Filter, Tag, Clock, Trash2, CheckCircle2 } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  category: 'Personal' | 'College' | 'AI' | 'Coding' | 'Hackathon' | 'Fitness' | 'Finance';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  completed: boolean;
  dueDate?: string;
}

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Setup AURA FastAPI backend connection', category: 'Coding', priority: 'High', completed: true },
    { id: '2', title: 'Practice Python LeetCode array problems', category: 'AI', priority: 'High', completed: false, dueDate: 'Today' },
    { id: '3', title: 'Prepare Hackathon project architecture', category: 'Hackathon', priority: 'Critical', completed: false, dueDate: 'Tomorrow' },
    { id: '4', title: 'Upper body strength workout & stretch', category: 'Fitness', priority: 'Medium', completed: false },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newCategory, setNewCategory] = useState<Task['category']>('Coding');
  const [newPriority, setNewPriority] = useState<Task['priority']>('Medium');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      category: newCategory,
      priority: newPriority,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Pending') return !t.completed;
    if (selectedFilter === 'Completed') return t.completed;
    return t.category === selectedFilter;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <CheckSquare className="text-[#10B981]" size={22} />
            <h1 className="text-xl font-bold text-[#111827]">Task Manager</h1>
          </div>
          <p className="text-xs text-[#6B7280] mt-1">
            Deterministic Task Management (Personal, College, AI, Coding, Hackathon, Fitness, Finance)
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#4B5563]">
          <span className="px-3 py-1.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl">
            {tasks.filter(t => t.completed).length} / {tasks.length} Completed
          </span>
        </div>
      </div>

      {/* Add Task Form */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-3">Add New Task</h2>
        <form onSubmit={handleAddTask} className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 h-10 px-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#10B981] font-medium"
          />

          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value as Task['category'])}
            className="h-10 px-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-none focus:border-[#10B981]"
          >
            <option value="Coding">Coding</option>
            <option value="AI">AI</option>
            <option value="Hackathon">Hackathon</option>
            <option value="Fitness">Fitness</option>
            <option value="Finance">Finance</option>
            <option value="College">College</option>
            <option value="Personal">Personal</option>
          </select>

          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value as Task['priority'])}
            className="h-10 px-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs font-medium text-[#111827] focus:outline-none focus:border-[#10B981]"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
            <option value="Critical">Critical Priority</option>
          </select>

          <button
            type="submit"
            className="h-10 px-4 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0"
          >
            <Plus size={16} />
            <span>Add Task</span>
          </button>
        </form>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 select-none">
        <Filter size={14} className="text-[#9CA3AF] shrink-0" />
        {['All', 'Pending', 'Completed', 'Coding', 'AI', 'Hackathon', 'Fitness', 'Finance'].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedFilter === filter
                ? 'bg-[#111827] text-white'
                : 'bg-white border border-[#E5E7EB] text-[#4B5563] hover:border-[#D1D5DB]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-2.5">
        {filteredTasks.length === 0 ? (
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 text-center text-xs text-[#6B7280]">
            No tasks found matching filter "{selectedFilter}".
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`bg-white border rounded-2xl p-4 flex items-center justify-between gap-3 shadow-2xs transition-all ${
                task.completed ? 'border-[#E5E7EB] opacity-60 bg-[#FAFAFA]' : 'border-[#E5E7EB] hover:border-[#D1D5DB]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                    task.completed
                      ? 'bg-[#10B981] border-[#10B981] text-white'
                      : 'border-[#D1D5DB] hover:border-[#10B981]'
                  }`}
                >
                  {task.completed && <CheckCircle2 size={14} />}
                </button>
                <div className="min-w-0">
                  <p className={`text-xs font-semibold text-[#111827] truncate ${task.completed ? 'line-through text-[#9CA3AF]' : ''}`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#F3F4F6] text-[#4B5563]">
                      <Tag size={10} />
                      {task.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        task.priority === 'Critical'
                          ? 'bg-[#FEF2F2] text-[#EF4444]'
                          : task.priority === 'High'
                          ? 'bg-[#FFFBEB] text-[#D97706]'
                          : 'bg-[#F0FDF4] text-[#16A34A]'
                      }`}
                    >
                      {task.priority}
                    </span>
                    {task.dueDate && (
                      <span className="text-[10px] text-[#6B7280] flex items-center gap-1">
                        <Clock size={10} />
                        {task.dueDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-[#9CA3AF] hover:text-[#EF4444] p-1.5 rounded-lg hover:bg-[#FEF2F2] transition-colors"
                title="Delete task"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
