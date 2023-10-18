import React from "react";

interface Props<T extends { id: string }> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const GridListing = <T extends { id: string }>({
  items,
  renderItem,
}: Props<T>) => {
  return (
    <>
      {items.length === 0 && (
        <div className="py-12 text-center">No items to display</div>
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {items.map((item) => (
          <div className="self-start" key={item.id}>
            {renderItem(item)}
          </div>
        ))}
      </div>
    </>
  );
};

export { GridListing };
