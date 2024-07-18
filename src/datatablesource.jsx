export const userColumns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "userName",
      headerName: "Username",
      width: 170,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="image" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "displayName", headerName: "Display Name", width: 130 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "address", headerName: "Address", width: 130 },
    { field: "country", headerName: "Country", width: 90 },
    { field: "phone", headerName: "Phone", width: 100 },
  ];
  
  export const productColumns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "title",
      headerName: "Title",
      width: 170,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="image" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "description", headerName: "Description", width: 230 },
    { field: "price", headerName: "Price", width: 70 },
    { field: "category", headerName: "Category", width: 90 },
    { field: "stock", headerName: "Stock", width: 90 },
  ];
  
  export const categoryColumns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "name", headerName: "Name", width: 200 },
  ];