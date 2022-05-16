/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { LinearProgress, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import "./styles.scss";
import { getAllEntries, getReportSummary } from "../../Services/api";
import { CustomGrid } from "../../Components/CustomGrid";
import { ManageEntryDialog } from "../../Components/ManageEntryDialog";
import { formatDate, loggedInAdmin, logoutAdmin } from "../../Utils/utils";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { CustomCard } from "../../Components/CustomCard";

export function AdminHome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [entryDialogOpen, setEntryDialogOpen] = useState(false);
  const [entries, setEntries] = useState<any>([]);
  const [clickedEntry, setClickedEntry] = useState<any>(null);
  const [isCreateForm, setIsCreateForm] = useState(false);
  const [reportValue, setReportValue] = useState<any>(null);

  const [entriesColumnDef] = useState([
    { field: "id" },
    { field: "userId", headerName: "User ID" },
    { field: "userName", headerName: "User Name" },
    { field: "entryDate", headerName: "Date" },
    { field: "entryTime", headerName: "Date" },
    { field: "foodName", headerName: "Food" },
    { field: "calorieValue", headerName: "Calories" },
    {
      field: "edit",
      headerName: "Edit",
      cellRenderer: "gridButton",
      cellRendererParams: {
        clicked: function (field: any) {
          setClickedEntry(field);
          setIsCreateForm(false);
          setEntryDialogOpen(true);
        }
      },
    }
  ]);

  useEffect(() => {
    if (!loggedInAdmin()) {
      navigate(`/admin/login`);
    } else {
      loadEntries();
      loadReportSummary();
    }
  }, []);

  const logout = () => {
    logoutAdmin();
    navigate(`/admin/login`);
  };

  const loadReportSummary = () => {
    setLoading(true);
    getReportSummary(formatDate(new Date())).then((data: any) => {
      setReportValue(data);
      setLoading(false);
    });
  };

  const loadEntries = () => {
    setLoading(true);
    getAllEntries().then((data: any) => {
      setEntries(data);
      setLoading(false);
    });
  };

  const addEntry = () => {
    setIsCreateForm(true);
    setEntryDialogOpen(true);
  };

  const onNewEntry = () => {
    loadEntries();
    loadReportSummary();
  };

  return (
    <div className="admin-home">
      {loading && <LinearProgress className="loader" />}
      <ManageEntryDialog
        admin={true}
        onComplete={onNewEntry}
        open={entryDialogOpen}
        createForm={isCreateForm}
        entry={clickedEntry}
        onClose={() => setEntryDialogOpen(false)}
      />
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
            {`Admin Dashboard`}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button
            className="button"
            onClick={logout}
            variant="contained"
            endIcon={<LogoutIcon />}
          >
            Logout
          </Button>
          <Button
            className="button"
            onClick={addEntry}
            variant="contained"
            endIcon={<AddIcon />}
          >
            Add Entry
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {`All Food Entries`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomGrid
            rowData={entries}
            columnDefs={entriesColumnDef}
            filers={true}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{ fontSize: 20, textAlign: "center" }}
            color="text.secondary"
            gutterBottom
          >
            {`Admin Summary`}
          </Typography>
        </Grid>
        {reportValue && (
          <Grid item justifyContent="center" container xs={12} spacing={3}>
            <Grid item xs={4}>
              <CustomCard
                text1="Number of Entries"
                text2={`${reportValue.numEntriesRecent} in last 7 Days`}
                text3={`${reportValue.numEntriesPast} in the week before`}
              />
            </Grid>
            <Grid item xs={4}>
              <CustomCard
                text1="Average Calorie Intake in Last 7 days"
                text2={`${reportValue.avgCalories} kCal`}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
