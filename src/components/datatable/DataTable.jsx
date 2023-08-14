import DataTable from 'react-data-table-component';

const DataTableComponent = ({ data, columns }) => {

  return (
    <>
      <DataTable
        data={data}
        pagination
        highlightOnHover
        columns={columns}
      />
    </>
  );
};

export default DataTableComponent;
