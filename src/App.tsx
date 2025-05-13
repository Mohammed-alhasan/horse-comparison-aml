import { HorsesTable } from "@/components/HorsesTable";
import { MainPageHeader } from "@/components/MainPageHeader";

// Will use useState to handle the state management rather than a State Management Library like Redux or Zustand
// because the app is small and simple and we don't need the complexity of a State Management Library


// TODO: Add tests for the table 
// TODO: Add a modal to display the horse details
// TODO: Update the horse details from the modal
// TODO: Add modal for adding a new  horse, possibly use same modal for editing ?
// TODO: Add a Comparison logic to compare the selected horses

function App() {
  return (
    <div className="p-8">
      <MainPageHeader onAddHorse={() => {}} />
      <HorsesTable onViewHorse={() => {}} />
    </div>
  );
}

export default App;
