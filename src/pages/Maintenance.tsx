import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/dashboard/Sidebar";

const Maintenance = () => {
  const maintenanceRecords = [
    { 
      id: 1, 
      vehicle: "ABC-123", 
      issue: "Changement des freins", 
      status: "En cours", 
      date: "2024-02-20" 
    },
    { 
      id: 2, 
      vehicle: "DEF-456", 
      issue: "Vidange", 
      status: "Planifié", 
      date: "2024-02-25" 
    },
    { 
      id: 3, 
      vehicle: "GHI-789", 
      issue: "Pneus à changer", 
      status: "En attente", 
      date: "2024-02-22" 
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En cours":
        return "bg-blue-500";
      case "Planifié":
        return "bg-green-500";
      case "En attente":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Maintenance</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Interventions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Véhicule</TableHead>
                    <TableHead>Problème</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maintenanceRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.vehicle}</TableCell>
                      <TableCell>{record.issue}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{record.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;