
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Ticket, Calendar, MapPin, Download } from "lucide-react";
import QRCode from "qrcode";
import { useState } from "react";

const MyTickets = () => {
  const navigate = useNavigate();

  const initialTickets = [
    {
      id: "KSRTC123456",
      busNumber: "Express 101",
      from: "Bangalore",
      to: "Mysore",
      date: "2024-02-15",
      time: "08:00 AM",
      seat: "A12",
      status: "Upcoming",
    },
    {
      id: "KSRTC123457",
      busNumber: "Volvo 303",
      from: "Mysore",
      to: "Bangalore",
      date: "2024-02-10",
      time: "02:00 PM",
      seat: "B8",
      status: "Completed",
    },
  ];

  const [tickets, setTickets] = useState(initialTickets);

  const handleDownloadTicket = async (ticket: any) => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 200;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 400, 200);

      // Header
      ctx.fillStyle = "#000000";
      ctx.font = "bold 20px Arial";
      ctx.fillText("Bus Ticket", 150, 30);

      // Ticket Info
      ctx.font = "16px Arial";
      ctx.fillText(`Ticket ID: ${ticket.id}`, 20, 70);
      ctx.fillText(`Bus: ${ticket.busNumber}`, 20, 95);
      ctx.fillText(`Route: ${ticket.from} to ${ticket.to}`, 20, 120);
      ctx.fillText(`Date: ${ticket.date} at ${ticket.time}`, 20, 145);
      ctx.fillText(`Seat: ${ticket.seat}`, 20, 170);

      // QR Code
      const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(ticket));
      const qrCodeImage = new Image();
      qrCodeImage.src = qrCodeDataUrl;
      qrCodeImage.onload = () => {
        ctx.drawImage(qrCodeImage, 300, 70, 80, 80);
        const link = document.createElement("a");
        link.download = `ticket-${ticket.id}.png`;
        link.href = canvas.toDataURL();
        link.click();
      };
    }
  };

  const handleCancelTicket = (ticketId: string) => {
    setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="bg-card shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">My Tickets</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {tickets.length === 0 ? (
            <Card className="p-12 text-center">
              <Ticket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">No Tickets Yet</h2>
              <p className="text-muted-foreground mb-6">Book your first journey with KSRTC</p>
              <Button onClick={() => navigate("/book-ticket")}>Book Ticket</Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Ticket className="w-5 h-5 text-primary" />
                          <span className="font-mono text-sm text-muted-foreground">{ticket.id}</span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground">{ticket.busNumber}</h3>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          ticket.status === "Upcoming"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Route
                        </p>
                        <p className="font-semibold text-foreground">
                          {ticket.from} → {ticket.to}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Date & Time
                        </p>
                        <p className="font-semibold text-foreground">
                          {ticket.date} at {ticket.time}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Seat Number</p>
                        <p className="font-semibold text-foreground">{ticket.seat}</p>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <Button variant="outline" className="flex-1" onClick={() => navigate(`/digital-ticket`)}>
                        View Details
                      </Button>
                      {ticket.status === "Upcoming" && (
                        <>
                          <Button variant="destructive" className="flex-1" onClick={() => handleCancelTicket(ticket.id)}>
                            Cancel Ticket
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleDownloadTicket(ticket)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Ticket
                          </Button>
                        </>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default MyTickets;
