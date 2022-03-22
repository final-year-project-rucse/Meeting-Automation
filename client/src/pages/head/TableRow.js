const TableRow = ({ item, index }) => {
  return (
    <tr key={item.objectID}>
      <td>{index}</td>
      <td>{item}</td>
    </tr>
  );
};

export default TableRow;
