import { useState, useEffect } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserPlus, 
  Users, 
  Sun, 
  Moon, 
  Utensils, 
  UserCheck, 
  UserX, 
  Clock,
  CheckCircle2,
  XCircle,
  Plus
} from "lucide-react";
import { 
  Person, 
  subscribeToPeople, 
  addPerson, 
  updatePersonStatus,
  resetAllStatuses 
} from "@/lib/dataService";

export default function Home() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPersonName, setNewPersonName] = useState("");
  const [newPersonLunch, setNewPersonLunch] = useState("chicken curry");
  const [isAdding, setIsAdding] = useState(false);

  const foodOptions = [
    "chicken curry",
    "jacket potato",
    "tomato pasta",
    "sandwich",
    "salad",
    "pizza",
    "Packed Lunch",
  ];

  useEffect(() => {
    const unsubscribe = subscribeToPeople((data) => {
      setPeople(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAddPerson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPersonName.trim()) return;

    setIsAdding(true);
    try {
      await addPerson({
        name: newPersonName.trim(),
        lunch: newPersonLunch,
        afternoon: newPersonName.trim(),
        morningStatus: "default",
        afternoonStatus: "default",
      });
      setNewPersonName("");
      setNewPersonLunch(foodOptions[0]);
    } catch (error) {
      alert("Failed to add person. Check console for details.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleStatusChange = async (id: string, column: 'morningStatus' | 'afternoonStatus', status: string) => {
    try {
      await updatePersonStatus(id, { [column]: status });
    } catch (error) {
      alert("Failed to update status.");
    }
  };

  const handleReset = async () => {
    if (confirm("Are you sure you want to reset all attendance statuses?")) {
      try {
        await resetAllStatuses(people);
      } catch (error) {
        alert("Failed to reset statuses.");
      }
    }
  };

  const StatusButton = ({ 
    active, 
    type, 
    onClick 
  }: { 
    active: boolean, 
    type: 'here' | 'not-here', 
    onClick: () => void 
  }) => {
    const isHere = type === 'here';
    return (
      <button
        onClick={onClick}
        className={`flex items-center justify-center p-2 rounded-lg transition-all duration-300 ${
          active 
            ? (isHere ? "bg-green-500/20 text-green-400 border border-green-500/50" : "bg-red-500/20 text-red-400 border border-red-500/50")
            : "bg-white/5 text-gray-400 border border-transparent hover:bg-white/10"
        }`}
      >
        {isHere ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
        <span className="ml-2 text-sm font-medium">{isHere ? "Here" : "Absent"}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-transparent text-gray-100 font-sans selection:bg-blue-500/30">
      <Head>
        <title>Register | Premium Presence Tracking</title>
        <meta name="description" content="Modern attendance and lunch tracking system" />
      </Head>

      <main className="max-w-6xl mx-auto px-4 py-12 md:px-8">
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4"
            >
              <Clock size={12} className="mr-2" />
              Live Register
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent"
            >
              Daily Register
            </motion.h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-2xl backdrop-blur-md"
          >
            <div className="flex flex-col items-center px-4 py-2">
              <span className="text-2xl font-bold">{people.length}</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-widest">Total</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col items-center px-4 py-2 text-green-400">
              <span className="text-2xl font-bold">
                {people.filter(p => p.morningStatus === 'here').length}
              </span>
              <span className="text-[10px] uppercase tracking-widest opacity-70">Present</span>
            </div>
          </motion.div>
        </header>

        {/* Add Person Form */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
              <UserPlus size={20} />
            </div>
            <h2 className="text-xl font-bold">Add to Register</h2>
          </div>

          <form onSubmit={handleAddPerson} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <input
                type="text"
                value={newPersonName}
                onChange={(e) => setNewPersonName(e.target.value)}
                placeholder="Name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                required
              />
            </div>
            <div className="relative">
              <select
                value={newPersonLunch}
                onChange={(e) => setNewPersonLunch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none"
              >
                {foodOptions.map((food) => (
                  <option key={food} value={food} className="bg-gray-900">{food}</option>
                ))}
              </select>
              <Utensils size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
            <button
              type="submit"
              disabled={isAdding}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            >
              {isAdding ? "Adding..." : <><Plus size={20} /> Add Person</>}
            </button>
          </form>
        </motion.section>

        {/* Tables Grid */}
        <div className="space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Morning Register */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
                    <Sun size={20} />
                  </div>
                  <h2 className="text-xl font-bold">Morning Session</h2>
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Status</span>
              </div>
              
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="p-12 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" /></div>
                ) : (
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-gray-500">
                      <tr>
                        <th className="px-6 py-4">Participant</th>
                        <th className="px-6 py-4 text-center">Check-In</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <AnimatePresence>
                        {people.map((person) => (
                          <motion.tr 
                            key={person.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="hover:bg-white/[0.02] transition-colors group"
                          >
                            <td className="px-6 py-4">
                              <span className={`font-semibold transition-colors ${
                                person.morningStatus === 'here' ? 'text-green-400' : 
                                person.morningStatus === 'not-here' ? 'text-red-400' : 'text-gray-300'
                              }`}>
                                {person.name}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center gap-3">
                                <StatusButton 
                                  type="here" 
                                  active={person.morningStatus === 'here'} 
                                  onClick={() => handleStatusChange(person.id!, 'morningStatus', 'here')}
                                />
                                <StatusButton 
                                  type="not-here" 
                                  active={person.morningStatus === 'not-here'} 
                                  onClick={() => handleStatusChange(person.id!, 'morningStatus', 'not-here')}
                                />
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                )}
              </div>
            </motion.div>

            {/* Afternoon Register */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                    <Moon size={20} />
                  </div>
                  <h2 className="text-xl font-bold">Afternoon Session</h2>
                </div>
                <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Status</span>
              </div>
              
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="p-12 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" /></div>
                ) : (
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-gray-500">
                      <tr>
                        <th className="px-6 py-4">Participant</th>
                        <th className="px-6 py-4 text-center">Check-In</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <AnimatePresence>
                        {people.map((person) => (
                          <motion.tr 
                            key={person.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="hover:bg-white/[0.02] transition-colors group"
                          >
                            <td className="px-6 py-4">
                              <span className={`font-semibold transition-colors ${
                                person.afternoonStatus === 'here' ? 'text-green-400' : 
                                person.afternoonStatus === 'not-here' ? 'text-red-400' : 'text-gray-300'
                              }`}>
                                {person.name}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center gap-3">
                                <StatusButton 
                                  type="here" 
                                  active={person.afternoonStatus === 'here'} 
                                  onClick={() => handleStatusChange(person.id!, 'afternoonStatus', 'here')}
                                />
                                <StatusButton 
                                  type="not-here" 
                                  active={person.afternoonStatus === 'not-here'} 
                                  onClick={() => handleStatusChange(person.id!, 'afternoonStatus', 'not-here')}
                                />
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                )}
              </div>
            </motion.div>
          </div>

          {/* Lunch List - Below */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card overflow-hidden"
          >
            <div className="p-6 border-b border-white/5 flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                <Utensils size={20} />
              </div>
              <h2 className="text-xl font-bold">Lunch Orders</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {people.map(person => (
                  <div key={person.id} className="flex flex-col p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                    <span className="text-sm font-medium text-gray-300 mb-1">{person.name}</span>
                    <span className="text-xs text-blue-400 font-bold uppercase tracking-widest">{person.lunch}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>


        </div>

        {/* Reset Section */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-8 py-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 hover:border-red-500/50 rounded-2xl transition-all duration-300 font-bold group"
          >
            <Clock size={18} className="group-hover:rotate-180 transition-transform duration-500" />
            Reset Daily Register
          </button>
        </motion.footer>
      </main>
      
      {/* Background blobs for aesthetics */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
