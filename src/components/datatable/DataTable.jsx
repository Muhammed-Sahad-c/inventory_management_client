import DataTable from 'react-data-table-component';

const DataTableComponent = ({ data, columns }) => {

  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        pagination
        paginationPerPage={7}
        paginationRowsPerPageOptions={[7, 14, 24]}
        paginationComponentOptions={{
          rowsPerPageText: 'Rows per page:',
          rangeSeparatorText: 'of',
          noRowsPerPage: false,
          selectAllRowsItem: false,
          selectAllRowsItemText: 'All',
        }}
        searchable
      />
    </>
  );
};

export default DataTableComponent;
