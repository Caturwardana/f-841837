import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VehicleList } from "@/components/dashboard/VehicleList";
import { Sidebar } from "@/components/dashboard/Sidebar";

const Vehicles = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
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
    </div>
  );
};

export default Vehicles;