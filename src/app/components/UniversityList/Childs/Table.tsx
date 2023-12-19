import React, { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

const Table = (props: any) => {
  //should be memoized or stable
  const { columns, data, loading } = props;

  const table = useMaterialReactTable({
    columns,
    data,
    state: {
      isLoading: loading,
    },
  });

  return <MaterialReactTable table={table} />;
};

export default Table;
