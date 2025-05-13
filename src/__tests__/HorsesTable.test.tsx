import { fireEvent, render, screen } from "@testing-library/react";
import { HorsesTable } from "@/components/HorsesTable";
import { useHorses } from "@/hooks/useHorses";
import { vi, describe, test, expect, beforeEach, type Mock } from "vitest";
import type { Horse } from "@/types";

// Mock the useHorses hook
vi.mock("@/hooks/useHorses");

describe("HorsesTable Component", () => {
  const mockHorses: Horse[] = [
    {
      id: "1",
      name: "Secretariat",
      profile: {
        favouriteFood: "Apples",
        physical: {
          height: 173,
          weight: 540,
        },
      },
    },
    {
      id: "2",
      name: "Black Beauty",
      profile: {
        favouriteFood: "Carrots",
        physical: {
          height: 165,
          weight: 480,
        },
      },
    },
    // Add more mock horses to test pagination
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `${i + 3}`,
      name: `Horse ${i + 3}`,
      profile: {
        favouriteFood: `Food ${i + 3}`,
        physical: {
          height: 150 + i,
          weight: 450 + i * 10,
        },
      },
    })),
  ];

  const mockOnViewHorse = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders loading state", () => {
    (useHorses as Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    render(<HorsesTable onViewHorse={mockOnViewHorse} />);

    expect(screen.getByTestId("horses-table-loading")).toBeInTheDocument();
  });

  test("renders error state", () => {
    const errorMessage = "Failed to fetch horses";
    (useHorses as Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error(errorMessage),
    });

    render(<HorsesTable onViewHorse={mockOnViewHorse} />);

    expect(screen.getByTestId("horses-table-error")).toBeInTheDocument();
  });

  test("renders empty state", () => {
    (useHorses as Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(<HorsesTable onViewHorse={mockOnViewHorse} />);

    expect(screen.getByText("No horses added yet")).toBeInTheDocument();
  });

  test("renders table with horses data", () => {
    (useHorses as Mock).mockReturnValue({
      data: mockHorses,
      isLoading: false,
      error: null,
    });

    render(<HorsesTable onViewHorse={mockOnViewHorse} />);

    // Check table headers
    expect(screen.getByTestId("horses-table-head-name")).toHaveTextContent(
      "Name"
    );
    expect(screen.getByTestId("horses-table-head-height")).toHaveTextContent(
      "Height"
    );
    expect(screen.getByTestId("horses-table-head-weight")).toHaveTextContent(
      "Weight"
    );
    expect(
      screen.getByTestId("horses-table-head-favorite-food")
    ).toHaveTextContent("Favorite Food");

    // Check first horse data (should be visible on first page)
    expect(screen.getByText("Secretariat")).toBeInTheDocument();
    expect(screen.getByText("173")).toBeInTheDocument();
    expect(screen.getByText("540")).toBeInTheDocument();
    expect(screen.getByText("Apples")).toBeInTheDocument();
  });

  test("handles empty values correctly", () => {
    const horsesWithNullValues: Horse[] = [
      {
        id: "1",
        name: "Incomplete Horse",
        profile: {
          favouriteFood: null,
          physical: {
            height: null,
            weight: null,
          },
        },
      },
    ];

    (useHorses as Mock).mockReturnValue({
      data: horsesWithNullValues,
      isLoading: false,
      error: null,
    });

    render(<HorsesTable onViewHorse={mockOnViewHorse} />);

    // Check that null values are displayed as "Empty"
    expect(screen.getByText("Incomplete Horse")).toBeInTheDocument();
    expect(screen.getAllByText("Empty")).toHaveLength(3);
  });

  test("handles pagination correctly", () => {
    (useHorses as Mock).mockReturnValue({
      data: mockHorses,
      isLoading: false,
      error: null,
    });

    render(<HorsesTable onViewHorse={mockOnViewHorse} />);

    // Check that the first page is displayed (page 1)
    expect(screen.getByText("Secretariat")).toBeInTheDocument();
    expect(screen.getByText("Black Beauty")).toBeInTheDocument();

    // First page should show horses 1-10
    expect(screen.getByText("Horse 3")).toBeInTheDocument();

    // Horse 11 should not be visible on first page
    expect(screen.queryByText("Horse 11")).not.toBeInTheDocument();

    // Check that the pagination info is correct
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
    expect(screen.getByTestId("pagination-showing-start")).toHaveTextContent("1");
    expect(screen.getByTestId("pagination-showing-end")).toHaveTextContent("10");
    expect(screen.getByTestId("pagination-showing-total")).toHaveTextContent("17");

    // Navigate to second page using the Next button with data-testid
    fireEvent.click(screen.getByTestId("pagination-next"));

    // On page 2, Horse 3 should no longer be visible
    expect(screen.queryByText("Horse 3")).not.toBeInTheDocument();

    // Horse 11 should now be visible
    expect(screen.getByText("Horse 11")).toBeInTheDocument();

    // First page horses should not be visible
    expect(screen.queryByText("Secretariat")).not.toBeInTheDocument();
    expect(screen.queryByText("Black Beauty")).not.toBeInTheDocument();

    // Check pagination info updated
    expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
    expect(screen.getByTestId("pagination-showing-start")).toHaveTextContent("11");
    expect(screen.getByTestId("pagination-showing-end")).toHaveTextContent("17");
    expect(screen.getByTestId("pagination-showing-total")).toHaveTextContent("17");

    // Navigate back to first page
    fireEvent.click(screen.getByTestId("pagination-prev"));

    // Verify we're back on first page
    expect(screen.getByText("Secretariat")).toBeInTheDocument();
    expect(screen.getByText("Black Beauty")).toBeInTheDocument();
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
  });
});
