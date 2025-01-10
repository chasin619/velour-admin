interface TableProps {
  data: any[];
  titles: any[];
}

const Table: React.FC<TableProps> = ({ data, titles }) => {
  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex flex-col justify-between">
        <div className="grid grid-cols-4">
          {titles.map((title, index) => (
            <div className="px-2 pb-3.5" key={index}>
              <h5 className="text-sm font-medium xsm:text-base">{title}</h5>
            </div>
          ))}
        </div>

        {data.map((item, key) => (
          <div
            className={`grid grid-cols-4 ${
              key === data.length - 1
                ? ""
                : "border-b border-stroke dark:border-dark-3"
            }`}
            key={key}
          >
            <div className="flex items-center justify-start gap-3.5 px-2 py-4">
              <p className="hidden font-medium text-dark dark:text-white sm:block">
                {item.fullName}
              </p>
            </div>

            <div className="flex items-center justify-start px-2 py-4">
              <p className="font-medium text-dark dark:text-white">
                {item.portalName}
              </p>
            </div>

            <div className="flex items-center justify-start px-2 py-4">
              <p className="font-medium text-dark dark:text-white">
                {item.email}
              </p>
            </div>

            <div className="flex items-center justify-start px-2 py-4">
              <p className="font-medium text-green-light-1">
                {item.status || "active"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
