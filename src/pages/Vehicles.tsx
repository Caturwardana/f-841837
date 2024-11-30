import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VehicleList } from "@/components/dashboard/VehicleList";

const Vehicles = () => {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Gestion des Véhicules</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Liste des Véhicules</CardTitle>
          </CardHeader>
          <CardContent>
            <VehicleList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Vehicles;