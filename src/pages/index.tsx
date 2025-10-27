import { useState } from "react";

// Define the structure for a person object
interface Person {
  name: string;
  lunch: string;
  afternoon: string; // Not strictly needed for logic but kept for initial structure consistency
}

// Define the structure for a color state object
interface ColorState {
  morningName: string;
  afternoonName: string;
  lunch: string;
}

export default function Home() {
  // 1. Convert initial data to use a state hook
  const initialData: Person[] = [
    { name: "Mummy", lunch: "chicken curry", afternoon: "Mummy" },
    { name: "Daddy", lunch: "jacket potato", afternoon: "Daddy" },
    { name: "Max", lunch: "tomato pasta", afternoon: "Max" },
    { name: "Lucifur", lunch: "Chicken", afternoon: "Lucifur" },
    { name: "Clawed", lunch: "Beef", afternoon: "Clawed" },
  ];

  const [myData, setMyData] = useState<Person[]>(initialData);

  // 2. Lunch options for the dropdown
  const foodOptions: string[] = [
    "chicken curry",
    "jacket potato",
    "tomato pasta",
    "sandwich",
    "salad",
    "pizza",
    "Packed Lunch",
  ];

  // 3. Initialize color state based on initial data
  const initialColors: ColorState[] = initialData.map(() => ({
    morningName: "white",
    afternoonName: "white",
    lunch: "white",
  }));

  const [textColors, setTextColors] = useState<ColorState[]>(initialColors);

  // 4. State for the new person form inputs
  const [newPersonName, setNewPersonName] = useState<string>("");
  const [newPersonLunch, setNewPersonLunch] = useState<string>(
    foodOptions[0] // Default to the first option
  );

  // Function to handle color changes (remains the same)
  const handleColorChange = (
    index: number,
    column: keyof ColorState,
    color: string
  ) => {
    setTextColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = { ...newColors[index], [column]: color };
      return newColors;
    });
  };

  // 5. Function to handle adding a new person
  const handleAddPerson = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPersonName.trim()) {
      alert("Please enter a name.");
      return;
    }

    // New person data
    const newPerson: Person = {
      name: newPersonName.trim(),
      lunch: newPersonLunch,
      afternoon: newPersonName.trim(), // Assuming 'afternoon' column is same as name
    };

    // Update the list of people
    setMyData((prevData) => [...prevData, newPerson]);

    // Update the color state for the new person
    setTextColors((prevColors) => [
      ...prevColors,
      { morningName: "white", afternoonName: "white", lunch: "white" },
    ]);

    // Clear the form
    setNewPersonName("");
    setNewPersonLunch(foodOptions[0]); // Reset to default lunch option
  };

  return (
    // To properly simulate dark mode, you might wrap the entire div with a dark background.
    // I've added a container class here for demonstration.
    <div className="bg-gray-900 min-h-screen p-8 text-white">
      <h1 className="text-3xl font-bold underline">Register</h1>

      <br />

      <br />
      <hr className="border-gray-700" />

      {/* --- Morning Register Table --- */}
      <h2 className="text-2xl font-bold underline">Morning</h2>
      <table className="mt-4">
        <thead>
          <tr>
            <th className="border border-gray-600 px-4 py-2 bg-gray-700">
              Name
            </th>
            <th className="border border-gray-600 px-4 py-2 bg-gray-700">
              Here
            </th>
            <th className="border border-gray-600 px-4 py-2 bg-gray-700">
              Not Here
            </th>
          </tr>
        </thead>
        <tbody>
          {myData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-800">
              <td
                className="border border-gray-600 px-4 py-2"
                style={{ color: textColors[index]?.morningName || "white" }}
              >
                {item.name}
              </td>
              {/* ... (buttons remain the same) ... */}
              <td className="border border-gray-600 px-4 py-2">
                <button
                  style={{
                    backgroundColor: "lightgreen",
                    color: "darkgreen",
                    border: "none",
                    padding: "5px 10px",
                    marginRight: "5px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    handleColorChange(index, "morningName", "green")
                  }
                >
                  Here
                </button>
              </td>
              <td className="border border-gray-600 px-4 py-2">
                <button
                  style={{
                    backgroundColor: "lightcoral",
                    color: "darkred",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleColorChange(index, "morningName", "red")}
                >
                  Not Here
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* --- End Morning Register Table --- */}

      <br />
      <hr className="border-gray-700" />

      {/* --- Lunch Table --- */}
      <h2 className="text-2xl font-bold underline">Lunch</h2>
      <table className="border-collapse table-auto mt-4">
        <thead>
          <tr>
            <th className="border border-gray-600 px-4 py-2 bg-gray-700">
              Name
            </th>
            <th className="border border-gray-600 px-4 py-2 bg-gray-700">
              Lunch
            </th>
          </tr>
        </thead>
        <tbody>
          {myData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-800">
              <td className="border border-gray-600 px-4 py-2">{item.name}</td>
              <td
                className="border border-gray-600 px-4 py-2"
                style={{ color: textColors[index]?.lunch || "white" }}
              >
                {item.lunch}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* --- End Lunch Table --- */}

      <br />
      <hr className="border-gray-700" />

      {/* --- Afternoon Register Table --- */}
      <h2 className="text-2xl font-bold underline">Afternoon</h2>
      <table className="mt-4">
        <thead>
          <tr>
            <th className="border border-gray-600 px-4 py-2 bg-gray-700">
              Name
            </th>
            <th className="border border-gray-600 px-4 py-2 bg-gray-700">
              Here
            </th>
            <th className="border border-gray-600 px-4 py-2 bg-gray-700">
              Not Here
            </th>
          </tr>
        </thead>
        <tbody>
          {myData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-800">
              <td
                className="border border-gray-600 px-4 py-2"
                style={{ color: textColors[index]?.afternoonName || "white" }}
              >
                {item.name}
              </td>
              {/* ... (buttons remain the same) ... */}
              <td className="border border-gray-600 px-4 py-2">
                <button
                  style={{
                    backgroundColor: "lightgreen",
                    color: "darkgreen",
                    border: "none",
                    padding: "5px 10px",
                    marginRight: "5px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    handleColorChange(index, "afternoonName", "green")
                  }
                >
                  Here
                </button>
              </td>
              <td className="border border-gray-600 px-4 py-2">
                <button
                  style={{
                    backgroundColor: "lightcoral",
                    color: "darkred",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    handleColorChange(index, "afternoonName", "red")
                  }
                >
                  Not Here
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* --- End Afternoon Register Table --- */}
      {/* --- New Add Person Form Section --- */}
      <h2 className="text-2xl font-bold text-white">➕ Add Person</h2>
      <form
        onSubmit={handleAddPerson}
        className="border border-gray-700 p-4 mb-8 rounded shadow-lg bg-gray-800"
      >
        <div className="flex flex-col space-y-3">
          {/* Name Input */}
          <label className="flex items-center space-x-2 text-gray-300">
            <span className="font-semibold w-20">Name:</span>
            {/* Input background and text color set for dark mode usability */}
            <input
              type="text"
              value={newPersonName}
              onChange={(e) => setNewPersonName(e.target.value)}
              className="border border-gray-600 p-1 flex-grow text-gray-900 bg-gray-300 placeholder-gray-500"
              placeholder="Enter name"
              required
            />
          </label>

          {/* Food Dropdown */}
          <label className="flex items-center space-x-2 text-gray-300">
            <span className="font-semibold w-20">Lunch:</span>
            {/* Select background and text color set for dark mode usability */}
            <select
              value={newPersonLunch}
              onChange={(e) => setNewPersonLunch(e.target.value)}
              className="border border-gray-600 p-1 flex-grow text-gray-900 bg-gray-300"
            >
              {foodOptions.map((food) => (
                // Options inherit the select's colors
                <option key={food} value={food}>
                  {food}
                </option>
              ))}
            </select>
          </label>

          {/* Submit Button (color remains visible) */}
          <button
            type="submit"
            className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150"
          >
            Add to Register
          </button>
        </div>
      </form>
      {/* --- End Add Person Form Section --- */}
    </div>
  );
}
