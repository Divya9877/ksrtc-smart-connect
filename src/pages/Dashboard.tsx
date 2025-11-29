import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Ticket, Clock, FileText, LogOut, User } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Track Bus",
      description: "Live bus tracking",
      icon: MapPin,
      path: "/track-bus",
      color: "bg-primary",
    },
    {
      title: "Book Ticket",
      description: "Book your journey",
      icon: Ticket,
      path: "/book-ticket",
      color: "bg-accent",
    },
    {
      title: "View Timetable",
      description: "Check schedules",
      icon: Clock,
      path: "/timetable",
      color: "bg-primary",
    },
    {
      title: "My Tickets",
      description: "View bookings",
      icon: FileText,
      path: "/my-tickets",
      color: "bg-accent",
    },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="bg-card shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <User className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Welcome back!</h2>
              <p className="text-sm text-muted-foreground">Have a great journey</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">KSRTC Smart Transit</h1>
          <p className="text-muted-foreground mb-8">What would you like to do today?</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="p-8 hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-primary"
                  onClick={() => navigate(item.path)}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`w-20 h-20 rounded-2xl ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
