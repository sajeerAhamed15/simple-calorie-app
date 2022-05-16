/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { LinearProgress, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import "./styles.scss";
import { getAllEntries } from "../../Services/api";
import { CustomGrid } from "../../Components/CustomGrid";
import { CustomDialog } from "../../Components/CustomDialog";
import { loggedInAdmin, logoutAdmin } from "../../Utils/utils";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

export function AdminHome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [entryDialogOpen, setEntryDialogOpen] = useState(false);
  const [entries, setEntries] = useState<any>([]);

  const [entriesColumnDef] = useState([
    { field: "id" },
    { field: "userId", headerName: "User ID" },
    { field: "userName", headerName: "User Name" },
    { field: "entryDate", headerName: "Date" },
    { field: "entryTime", headerName: "Date" },
    { field: "foodName", headerName: "Food" },
    { field: "calorieValue", headerName: "Calories" },
  ]);


  useEffect(() => {
    if (!loggedInAdmin()) {
      navigate(`/admin/login`)
    } else {
      setLoading(true);
      loadEntries();
    }
  }, []);

  const logout = () => {
    logoutAdmin();
    navigate(`/admin/login`)
  }

  const loadEntries = () => {
    getAllEntries().then((data: any) => {
      setEntries(data);
      setLoading(false);
    });
  };

  const addEntry = () => {
    setEntryDialogOpen(true);
  };

  const onNewEntry = () => {
    loadEntries();
  };

  return (
    <div className="admin-home">
      {loading && <LinearProgress className="loader" />}
      <CustomDialog
        onSave={onNewEntry}
        open={entryDialogOpen}
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
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {`Admin Summary`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          
        </Grid>
      </Grid>
    </div>
  );
}
