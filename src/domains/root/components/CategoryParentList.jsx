const CategoryParentList = ({ parents }) => {
  return (
    <ul>
      {parents.map((parent) => (
        <li key={parent.uuid}>{parent.name}</li>
      ))}
    </ul>
  );
};

export default CategoryParentList;
