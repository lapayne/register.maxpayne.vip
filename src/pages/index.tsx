// pages/index.js
import { useState } from 'react';

export default function Home() {
  const myData = [
    { name: "Mummy" },
    { name: "Daddy"},
    { name: "Max" },
    { name: "Miss Drew"},
  ];

  const [textColors, setTextColors] = useState(myData.map(() => ({
    name: 'white'
  })));

  const handleColorChange = (index:number, column:string, color:string) => {
    setTextColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = { ...newColors[index], [column]: color }; // Update specific column
      return newColors;
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Register</h1><br /> <br />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Here</th>
            <th>Not Here</th>
          </tr>
        </thead>
        <tbody>
          {myData.map((item, index) => (
            <tr key={index}>
              <td style={{ color: textColors[index].name }}>
                {item.name}
                </td>
                <td>
                <button style={{
              backgroundColor: 'lightgreen', // Green background
              color: 'darkgreen',         // Dark green text
              border: 'none',             // Remove default border
              padding: '5px 10px',       // Add padding
              marginRight: '5px',        // Gap between buttons
              borderRadius: '5px',        // Rounded corners
              cursor: 'pointer',         // Indicate clickable
            }} onClick={() => handleColorChange(index, 'name', 'green')}>Here</button>
                </td>
                  <td>
                <button style={{
              backgroundColor: 'lightcoral', // Light red background
              color: 'darkred',           // Dark red text
              border: 'none',             // Remove default border
              padding: '5px 10px',       // Add padding
              borderRadius: '5px',        // Rounded corners
              cursor: 'pointer',         // Indicate clickable
            }} onClick={() => handleColorChange(index, 'name', 'red')}>Not Here</button>
              </td>
            
            </tr>
          ))}
        </tbody>
      </table>

      {/* ... (form remains the same) */}
    </div>
  );
}