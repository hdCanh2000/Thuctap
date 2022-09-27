import React from "react";
import { Button, IconButton, Icon, Grid, TextField } from "@material-ui/core";
import MaterialTable from "material-table";
import {
  getItem,
  saveItem,
  updateItem,
  deleteItem,
  exportExcel,
} from "./EmployeeService";
import EmployeeDialog from "./EmployeeDialog";
import { ConfirmationDialog, Breadcrumb } from "egret";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure({
  autoClose: 1500,
  limit: 2,
});

class Employee extends React.Component {
  state = {
    employees: [],
    typeDialog: "",
    openFormDialog: false,
    openConfirmDeleteDialog: false,
    currentData: null,
    searchValue: "",

    reRender: false,
  };

  handleReRender = () => {
    this.setState({
      openFormDialog: false,
      reRender: !this.state.reRender,
      openConfirmDeleteDialog: false,
    });
  };

  addNewEmployee = (data) => {
    saveItem(data).then((res) => {
      if (res.data.data) {
        this.handleReRender();
        toast.success("Thêm mới thành công!");
      } else {
        toast.error(res.data.message);
      }
    });
  };

  updateEmployee = (data) => {
    updateItem(data).then((res) => {
      if (res.data.data) {
        this.handleReRender();
        toast.success("Cập nhật thành công!");
      } else {
        toast.error(res.data.message);
      }
    });
  };

  deleteEmployee = (data) => {
    deleteItem(data).then((res) => {
      if (res.data.data) {
        this.handleReRender();
        toast.success("Xóa thành công!");
      } else {
        toast.error(res.data.message);
      }
    });
  };

  handleFilter = (employee) => {
    if (this.state.searchInput === "") return employee;
    if (
      employee.code
        .toLowerCase()
        .includes(this.state.searchValue.toLowerCase()) ||
      employee.email
        .toLowerCase()
        .includes(this.state.searchValue.toLowerCase()) ||
      employee.name
        .toLowerCase()
        .includes(this.state.searchValue.toLowerCase()) ||
      employee.phone
        .toLowerCase()
        .includes(this.state.searchValue.toLowerCase()) ||
      employee.age
        .toString()
        .toLowerCase()
        .includes(this.state.searchValue.toLowerCase())
    )
      return employee;
  };

  componentDidMount() {
    getItem({}).then((data) => {
      console.log(data.data);
      this.setState({
        employees: [...data.data.data],
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.reRender !== this.state.reRender) {
      getItem({}).then((data) => {
        this.setState({
          employees: [...data.data.data],
        });
      });
    }
  }

  render() {
    let {
      employees,
      typeDialog,
      openFormDialog,
      openConfirmDeleteDialog,
      currentData,
      searchValue,
    } = this.state;
    let { t } = this.props;
    // console.log(this.state.employees);
    const columns = [
      {
        title: "Hành động",
        field: "action",
        render: (rowData) => (
          <>
            <IconButton
              onClick={() =>
                this.setState({
                  typeDialog: "update",
                  currentData: rowData,
                  openFormDialog: true,
                })
              }
            >
              <Icon color="primary">edit</Icon>
            </IconButton>
            <IconButton
              onClick={() =>
                this.setState({
                  currentData: rowData,
                  openConfirmDeleteDialog: true,
                })
              }
            >
              <Icon color="error">delete</Icon>
            </IconButton>
          </>
        ),
      },
      {
        title: "Code",
        field: "code",
      },
      {
        title: "Họ và tên",
        field: "name",
      },
      {
        title: "Tuổi",
        field: "age",
      },
      {
        title: "Email",
        field: "email",
      },
      {
        title: "Số điện thoại",
        field: "phone",
      }
    ];

    return (
      // <></>
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: t("Dashboard.category"), path: "/directory/employees" },
              { name: "Nhân viên" },
            ]}
          />
        </div>

        <Grid container spacing={2}>
          <Grid item container justify="space-between">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  this.setState({
                    currentData: null,
                    typeDialog: "add",
                    openFormDialog: true,
                  })
                }
              >
                Thêm mới
              </Button>
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={searchValue}
                size="small"
                placeholder="Tìm kiếm..."
                variant="outlined"
                fullWidth
                onChange={(e) =>
                  this.setState({
                    searchValue: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
          <Grid item>
            <MaterialTable
              title={""}
              data={employees.filter((employee) => this.handleFilter(employee))}
              columns={columns}
              options={{
                rowStyle: (rowData, index) => {
                  return {
                    backgroundColor: index % 2 === 1 ? "#EEE" : "#FFF",
                  };
                },
                maxBodyHeight: "450px",
                minBodyHeight: "370px",
                headerStyle: {
                  backgroundColor: "#358600",
                  color: "#fff",
                },
                padding: "dense",
                // search: false,
                // exportButton: false,
                toolbar: false
              }}
            />
          </Grid>
        </Grid>
        {openFormDialog && (
          <EmployeeDialog
            closeDialog={() =>
              this.setState({
                openFormDialog: false,
              })
            }
            type={typeDialog}
            currentData={currentData}
            submitData={(newEmployeeData) =>
              newEmployeeData.id
                ? this.updateEmployee(newEmployeeData)
                : this.addNewEmployee(newEmployeeData)
            }
          />
        )}
        {openConfirmDeleteDialog && (
          <ConfirmationDialog
            open={openConfirmDeleteDialog}
            onConfirmDialogClose={() =>
              this.setState({
                openConfirmDeleteDialog: false,
              })
            }
            onYesClick={() => this.deleteEmployee(currentData)}
            title={t("confirm")}
            text={t("general.deleteConfirm")}
            Yes={t("Yes")}
            No={t("No")}
          />
        )}
      </div>
    );
  }
}

export default Employee;
