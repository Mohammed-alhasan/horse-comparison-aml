import { HorsesTable } from "@/components/HorsesTable";
import { MainPageHeader } from "@/components/MainPageHeader";
import type { Horse } from "./types";
import { useState } from "react";
import { HorseDetailsModal } from "./components/HorseDetailsModal";

// Will use useState to handle the state management rather than a State Management Library like Redux or Zustand
// because the app is small and simple and we don't need the complexity of a State Management Library


// TODO: Add tests for HorseDetailsModal
// TODO: Add a Comparison logic to compare the selected horses

function App() {
  const [dialogState, setDialogState] = useState({
    horse: null as Horse | null,
    isOpen: false,
    mode: "view" as "view" | "edit" | "create",
  });

  const showHorseDetailsModal = (horse: Horse) => {
    setDialogState({
      horse,
      isOpen: true,
      mode: "view",
    });
  };

  const closeHorseDetailsModal = () => {
    setDialogState((prev) => ({
      ...prev,
      isOpen: false,
      horse: prev.mode === "create" ? null : prev.horse,
    }));
  };

  const showCreateHorseModal = () => {
    setDialogState({
      horse: null,
      isOpen: true,
      mode: "create",
    });
  };
  return (
    <div className="p-8">
      <MainPageHeader onAddHorse={showCreateHorseModal} />
      <HorsesTable onViewHorse={showHorseDetailsModal} />
      {dialogState.isOpen && (
        <HorseDetailsModal
          horse={dialogState.horse}
          isOpen={dialogState.isOpen}
          onClose={closeHorseDetailsModal}
          mode={dialogState.mode}
        />
      )}
    </div>
  );
}

export default App;
