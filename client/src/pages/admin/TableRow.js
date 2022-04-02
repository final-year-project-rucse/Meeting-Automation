const TableRow = ({ item, index }) => {
  return (
    <tr key={item.objectID}>
      <td>{index}</td>
      <td>{item.title}</td>
      <td>{item.presidentName}</td>
    </tr>
  );
};

export default TableRow;
