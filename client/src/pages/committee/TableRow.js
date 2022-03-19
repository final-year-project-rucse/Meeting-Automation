const TableRow = ({ item }) => {
    
  return (
    <div>
      <tr key={item.objectID}>
        <td>{item.objectID}</td>
        <td>{item.title}</td>
      </tr>
    </div>
  );
};

export default TableRow;
