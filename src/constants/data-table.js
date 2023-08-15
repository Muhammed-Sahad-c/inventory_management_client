const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US"); // You can adjust the locale if needed
};

export const ItemReport_colums = [
  {
    name: "Name",
    selector: "name",
    sortable: true,
  },
  {
    name: "Price",
    selector: "price",
    sortable: true,
  },
  {
    name: "Stcok",
    selector: "quantity",
    sortable: true,
  },
  {
    name: "Purchased Count",
    selector: "purchasedCount",
    sortable: true,
  },
  {
    name: "Total Sales",
    selector: "totalSales",
    sortable: true,
  },
  {
    name: "Total Revenue",
    selector: "totalRevenue",
    sortable: true,
  },
];

export const salesReport_Columns = [
  {
    name: "Customer Name",
    selector: "customerName.customerName",
    sortable: true,
  },
  {
    name: "Quantity",
    selector: "quantity",
    sortable: true,
  },
  {
    name: "Product Name",
    selector: "product.name",
    sortable: true,
  },
  {
    name: "Product Price",
    selector: "product.price",
    sortable: true,
  },
  {
    name: "Date",
    selector: "date",
    sortable: true,
    format: (row) => formatDate(row.date),
  },
  {
    name: "Payment Method",
    selector: "paymentMethod",
    sortable: true,
  },
  {
    name: "Revenue",
    selector: "revenue",
    sortable: true,
  },
];

export const customerTransactions_Columns = [
  {
    name: "Customer Name",
    selector: "customerName.customerName",
    sortable: true,
  },
  {
    name: "Product Name",
    selector: "product.name",
    sortable: true,
  },
  {
    name: "Date",
    selector: "date",
    sortable: true,
    format: (row) => formatDate(row.date),
  },
  {
    name: "Payment Method",
    selector: "paymentMethod",
    sortable: true,
  },
  {
    name: "Expense",
    selector: "revenue",
    sortable: true,
  },
];
