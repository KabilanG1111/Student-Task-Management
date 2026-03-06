import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, BookOpen, ArrowRight, Code2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Animated background component for the left panel
const AnimatedBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[120px]"
        />
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            className="absolute -bottom-32 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]"
        />

        {/* Floating Elements */}
        <div className="absolute inset-0 opacity-[0.03]">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    initial={{
                        y: Math.random() * window.innerHeight,
                        x: Math.random() * (window.innerWidth / 2)
                    }}
                    animate={{
                        y: [null, Math.random() * -100 - 50],
                        opacity: [0.5, 1, 0]
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5
                    }}
                >
                    {i % 3 === 0 ? <Code2 size={24} /> : i % 2 === 0 ? <span className="font-mono text-xl">{`{ }`}</span> : <span className="font-mono text-xl">{'</>'}</span>}
                </motion.div>
            ))}
        </div>
    </div>
);

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        roll_number: '',
        department: '',
        year: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg('');

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success || response.status === 201) {
                // Save the student data in localStorage as requested
                localStorage.setItem('studentData', JSON.stringify({
                    name: formData.name,
                    rollNumber: formData.roll_number,
                    department: formData.department,
                    year: formData.year
                }));

                // Redirect to dashboard
                navigate('/student-dashboard');
            } else {
                setErrorMsg(data.message || 'Error executing request.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMsg('Unable to reach the server. Make sure the backend is running on port 5000.');
        } finally {
            setIsLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const childVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div className="flex h-screen w-full bg-background text-zinc-100 overflow-hidden font-sans selection:bg-primary-500/30">

            {/* Left Branding Section */}
            <div className="hidden lg:flex flex-col justify-center relative w-5/12 xl:w-1/2 p-16 border-r border-white/5 z-10 bg-surface/30 backdrop-blur-3xl">
                <AnimatedBackground />

                <div className="relative z-10 max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex items-center gap-4 mb-8"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary-600 to-primary-400 flex items-center justify-center text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] relative">
                            <div className="absolute inset-0 bg-white/20 rounded-2xl mix-blend-overlay"></div>
                            <Code2 size={32} strokeWidth={2.5} />
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                            CodePulse
                        </h1>
                    </motion.div>

                    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
                        <motion.h2 variants={childVariants} className="text-5xl lg:text-5xl font-bold tracking-tight leading-[1.2] text-white">
                            Track your coding progress <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-600">across platforms.</span>
                        </motion.h2>
                        <motion.p variants={childVariants} className="text-lg text-zinc-400 leading-relaxed max-w-md">
                            Analyze performance and improve consistency. Join your student cohort and level up your problem-solving skills with elite analytics.
                        </motion.p>
                    </motion.div>
                </div>
            </div>

            {/* Right Registration/Form Section */}
            <div className="flex-1 flex flex-col justify-center items-center p-6 relative overflow-y-auto">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
                    className="w-full max-w-md my-8 lg:my-0"
                >
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex justify-center mb-10">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary-600 to-primary-400 flex items-center justify-center text-white shadow-neon">
                            <Code2 size={24} strokeWidth={2.5} />
                        </div>
                    </div>

                    <div className="glass-card rounded-[2rem] p-8 md:p-10 shadow-2xl relative border border-white/5 bg-surface/60 backdrop-blur-2xl">
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>

                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-white tracking-tight mb-2">Student Registration & Login</h3>
                            <p className="text-sm text-zinc-400">Enter your details to generate your dashboard profile.</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="space-y-2 group">
                                <label className="text-xs font-medium text-zinc-300 ml-1">Name</label>
                                <div className="relative">
                                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary-400 transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Leo"
                                        className="w-full bg-background/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-zinc-100 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 focus:bg-surface transition-all placeholder:text-zinc-600 shadow-inner"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 group">
                                <label className="text-xs font-medium text-zinc-300 ml-1">Roll Number</label>
                                <div className="relative">
                                    <BookOpen size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary-400 transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. 21CS101"
                                        className="w-full bg-background/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-zinc-100 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 focus:bg-surface transition-all placeholder:text-zinc-600 shadow-inner"
                                        value={formData.roll_number}
                                        onChange={e => setFormData({ ...formData, roll_number: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 group relative">
                                <label className="text-xs font-medium text-zinc-300 ml-1">Department</label>
                                <select
                                    required
                                    className="w-full bg-background/50 border border-white/10 rounded-xl py-3 px-4 text-sm text-zinc-100 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 focus:bg-surface appearance-none cursor-pointer"
                                    value={formData.department}
                                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                                >
                                    <option value="" disabled>Select Department</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Information Technology">Information Technology</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Mechanical">Mechanical</option>
                                    <option value="Civil">Civil</option>
                                </select>
                            </div>

                            <div className="space-y-2 group relative">
                                <label className="text-xs font-medium text-zinc-300 ml-1">Year</label>
                                <select
                                    required
                                    className="w-full bg-background/50 border border-white/10 rounded-xl py-3 px-4 text-sm text-zinc-100 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 focus:bg-surface appearance-none cursor-pointer"
                                    value={formData.year}
                                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                                >
                                    <option value="" disabled>Select Year</option>
                                    <option value="1">1st Year</option>
                                    <option value="2">2nd Year</option>
                                    <option value="3">3rd Year</option>
                                    <option value="4">4th Year</option>
                                </select>
                            </div>

                            {errorMsg && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl flex items-center gap-2"
                                >
                                    <span>⚠️</span> {errorMsg}
                                </motion.div>
                            )}

                            <motion.button
                                whileHover={{ scale: isLoading ? 1 : 1.01 }}
                                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                                type="submit"
                                disabled={isLoading}
                                className={`w-full bg-gradient-to-r ${isLoading ? 'from-primary-600/50 to-primary-400/50 cursor-not-allowed' : 'from-primary-600 to-primary-400 hover:from-primary-500 hover:to-primary-300'} text-white font-semibold py-3.5 px-4 rounded-xl shadow-neon transition-all hover:shadow-neon-hover relative overflow-hidden group mt-6 flex justify-center items-center gap-2`}
                            >
                                <div className={`absolute inset-0 bg-white/20 translate-y-full ${isLoading ? '' : 'group-hover:translate-y-0'} transition-transform duration-300 ease-out`}></div>
                                <span className="relative z-10">{isLoading ? 'Authenticating...' : 'Enter Dashboard'}</span>
                                {!isLoading && <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
