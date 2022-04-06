const TableRow = ({ item, index }) => {
  return (
    <tr key={item.objectID}>
      <td className="ps-4">{index}</td>
      <td>{item.title}</td>
      <td>{item.presidentName}</td>
    </tr>
  );
};

export default TableRow;
