import RBreadcrumb from "@/components/Kit/RBreadcrumb";

const CategoryParentList = ({ parents }) => {
  return (
    <RBreadcrumb.List>
      {parents.length > 1 &&
        parents.map((parent) => (
          <RBreadcrumb.Current key={parent.uuid}>
            {parent.name}
          </RBreadcrumb.Current>
        ))}
    </RBreadcrumb.List>
  );
};

export default CategoryParentList;
