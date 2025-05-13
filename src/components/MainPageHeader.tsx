import { Button } from "./ui/button";

export const MainPageHeader = ({ onAddHorse }: { onAddHorse: () => void }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold">Horses</h1>
      <Button onClick={onAddHorse}>Add New Horse</Button>
    </div>
  );
};
