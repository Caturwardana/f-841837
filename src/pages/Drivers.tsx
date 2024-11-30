import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Sidebar } from "@/components/dashboard/Sidebar";

const Drivers = () => {
  const drivers = [
    { id: 1, name: "Jean Dupont", vehicle: "ABC-123", status: "Actif", hours: "38h", overtime: "2h" },
    { id: 2, name: "Marie Martin", vehicle: "DEF-456", status: "En pause", hours: "35h", overtime: "0h" },
    { id: 3, name: "Pierre Durant", vehicle: "GHI-789", status: "Indisponible", hours: "32h", overtime: "0h" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Gestion des Chauffeurs</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Liste des Chauffeurs</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Véhicule</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Heures</TableHead>
                    <TableHead>Heures Supp.</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drivers.map((driver) => (
                    <TableRow key={driver.id}>
                      <TableCell>{driver.name}</TableCell>
                      <TableCell>{driver.vehicle}</TableCell>
                      <TableCell>{driver.status}</TableCell>
                      <TableCell>{driver.hours}</TableCell>
                      <TableCell>{driver.overtime}</TableCell>
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

export default Drivers;