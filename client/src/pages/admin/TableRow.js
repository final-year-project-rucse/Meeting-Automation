const TableRow = (props) => {
  const {item, index} = props
  return (
    <tr key={item.objectID}>
      <td className="ps-4">{index}</td>
      <td>{item.title}</td>
      <td>{item.presidentName}</td>
      <td>
        <button
          onClick={() => props.deleteCommitteeHandler(item._id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
