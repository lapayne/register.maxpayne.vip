import { useState } from "react";

export default function Home() {
  const myData = [
    { name: "Mummy", lunch: "chicken curry", afternoon: "Mummy" },
    { name: "Daddy", lunch: "jacket potato", afternoon: "Daddy" },
    { name: "Max", lunch: "tomato pasta", afternoon: "Max" },
  ];

  const [textColors, setTextColors] = useState(
    myData.map(() => ({
      morningName: "white", // Separate color state for morning name
      afternoonName: "white", // Separate color state for afternoon name
      lunch: "white", // Color state for lunch
    }))
  );

  const handleColorChange = (index, column, color) => {
    setTextColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = { ...newColors[index], [column]: color };
      return newColors;
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Register</h1>
      <br /> <br />
      <h2 className="text-2xl font-bold underline">Morning</h2>
      <table>
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Here</th>
            <th className="border border-gray-300 px-4 py-2">Not Here</th>
          </tr>
        </thead>
        <tbody>
          {myData.map((item, index) => (
            <tr key={index}>
              <td
                className="border border-gray-300 px-4 py-2"
                style={{ color: textColors[index].morningName }} // Use morningName
              >
                {item.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  style={{
                    backgroundColor: "lightgreen", // Green background
                    color: "darkgreen", // Dark green text
                    border: "none", // Remove default border
                    padding: "5px 10px", // Add padding
                    marginRight: "5px", // Gap between buttons
                    borderRadius: "5px", // Rounded corners
                    cursor: "pointer", // Indicate clickable
                  }}
                  onClick={() =>
                    handleColorChange(index, "morningName", "green")
                  } // Update morningName
                >
                  Here
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  style={{
                    backgroundColor: "lightcoral", // Light red background
                    color: "darkred", // Dark red text
                    border: "none", // Remove default border
                    padding: "5px 10px", // Add padding
                    borderRadius: "5px", // Rounded corners
                    cursor: "pointer", // Indicate clickable
                  }}
                  onClick={() => handleColorChange(index, "morningName", "red")} // Update morningName
                >
                  Not Here
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br /> <br />
      <table className="border-collapse table-auto">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Lunch</th>
          </tr>
        </thead>
        <tbody>
          {myData.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td
                className="border border-gray-300 px-4 py-2"
                style={{ color: textColors[index].lunch }} // Use lunch color state
              >
                {item.lunch}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br /> <br />
      <h2 className="text-2xl font-bold underline">Afternoon</h2>
      <table>
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Here</th>
            <th className="border border-gray-300 px-4 py-2">Not Here</th>
          </tr>
        </thead>
        <tbody>
          {myData.map((item, index) => (
            <tr key={index}>
              <td
                className="border border-gray-300 px-4 py-2"
                style={{ color: textColors[index].afternoonName }} // Use afternoonName
              >
                {item.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  style={{
                    backgroundColor: "lightgreen", // Green background
                    color: "darkgreen", // Dark green text
                    border: "none", // Remove default border
                    padding: "5px 10px", // Add padding
                    marginRight: "5px", // Gap between buttons
                    borderRadius: "5px", // Rounded corners
                    cursor: "pointer", // Indicate clickable
                  }}
                  onClick={() =>
                    handleColorChange(index, "afternoonName", "green")
                  } // Update afternoonName
                >
                  Here
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  style={{
                    backgroundColor: "lightcoral", // Light red background
                    color: "darkred", // Dark red text
                    border: "none", // Remove default border
                    padding: "5px 10px", // Add padding
                    borderRadius: "5px", // Rounded corners
                    cursor: "pointer", // Indicate clickable
                  }}
                  onClick={() =>
                    handleColorChange(index, "afternoonName", "red")
                  } // Update afternoonName
                >
                  Not Here
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
