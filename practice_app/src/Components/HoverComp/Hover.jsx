import React, { useState } from "react";
import { article_list } from "../../assets/assets";

const Hover = () => {
  const [activeRow, setActiveRow] = useState(null); // Track which row is active
  const table_style = {
    padding: "10px",
  };

  const handleToggle = (index) => {
    // If the row is already active, deactivate it, else activate it
    setActiveRow(activeRow === index ? null : index);
  };

  return (
    <table style={table_style}>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>From</th>
          <th>No of Section</th>
          <th>Approved</th>
        </tr>
      </thead>
      <tbody>
        {article_list.map((item, idx) => (
          <React.Fragment key={idx}>
            <tr>
              <td className="no">
                <button onClick={() => handleToggle(idx)}>
                  {activeRow === idx ? "-" : "+"}
                </button>
                {item.sr_no}
              </td>
              <td>{item.name}</td>
              <td>{item.from}</td>
              <td>{item.no_of_section}</td>
              <td>{item.approved}</td>
            </tr>

            {/* Render child row if this row is active */}
            {activeRow === idx && (
              <tr className="child">
                <td colSpan={5}>
                  <ul>
                    <li>Created at: 29-02-2000</li>
                    <li>
                      Action: <button type="submit">Delete</button>{" "}
                      <button type="submit">Edit</button>
                    </li>
                  </ul>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default Hover;
