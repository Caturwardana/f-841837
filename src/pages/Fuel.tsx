import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const Fuel = () => {
  const fuelRecords = [
    { id: 1, vehicle: "ABC-123", date: "2024-02-20", liters: 45, cost: "89.50€", consumption: "7.2L/100km" },
    { id: 2, vehicle: "DEF-456", date: "2024-02-19", liters: 52, cost: "103.50€", consumption: "8.1L/100km" },
    { id: 3, vehicle: "GHI-789", date: "2024-02-18", liters: 48, cost: "95.20€", consumption: "6.9L/100km" },
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Gestion du Carburant</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Historique des Pleins</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Véhicule</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Litres</TableHead>
                  <TableHead>Coût</TableHead>
                  <TableHead>Consommation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fuelRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.vehicle}</TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.liters}L</TableCell>
                    <TableCell>{record.cost}</TableCell>
                    <TableCell>{record.consumption}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Fuel;