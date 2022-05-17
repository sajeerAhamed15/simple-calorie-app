/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { LinearProgress, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import "./styles.scss";
import CustomDateRange from "../../Components/CustomDataRange";
import { getEntries, getAggEntries } from "../../Services/api";
import { CustomGrid } from "../../Components/CustomGrid";
import { getCellClassRules, loggedInUser } from "../../Utils/utils";
import { useNavigate } from "react-router-dom";
import { ManageEntryDialog } from "../../Components/ManageEntryDialog";

export function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [entryDialogOpen, setEntryDialogOpen] = useState(false);
  const [entries, setEntries] = useState<any>([]);
  const [aggEntries, setAggEntries] = useState<any>([]);
  const [date1, setDate1] = useState<string | null>(null);
  const [date2, setDate2] = useState<string | null>(null);
  const [dailyThreshold, setDailyThreshold] = useState<any>(null);

  const [entriesColumnDef] = useState([
    { field: "id" },
    { field: "entryDate", headerName: "Date" },
    { field: "entryTime", headerName: "Date" },
    { field: "foodName", headerName: "Food" },
    { field: "calorieValue", headerName: "Calories" },
  ]);

  const [aggEntriesColumnDef] = useState([
    { field: "summaryDate", headerName: "Date" },
    {
      field: "totalCalorie",
      headerName: "Total Calorie Consumed",
      cellClassRules: getCellClassRules(),
    },
  ]);

  useEffect(() => {
    if (!loggedInUser()) {
      navigate(`/login`)
    } else {
      setLoading(true);
      setDailyThreshold(loggedInUser().dailyCalorieLimit as number)
      loadAggEntries();
    }
  }, []);

  const loadAggEntries = () => {
    getAggEntries().then((data: any) => {
      setAggEntries(data);
      setLoading(false);
    });
  };

  const loadEntries = () => {
    if (date1 && date2) {
      getEntries(date1, date2).then((data: any) => {
        setEntries(data);
      });
    }
  };

  const addEntry = () => {
    setEntryDialogOpen(true);
  };

  const onSearch = (_date1: string, _date2: string) => {
    setDate1(_date1);
    setDate2(_date2);
    getEntries(_date1, _date2).then((data: any) => {
      setEntries(data);
    });
  };

  const onNewEntry = () => {
    loadEntries();
    loadAggEntries();
  };

  

  return (
    <div className="home">
      {loading && <LinearProgress className="loader" />}
      <ManageEntryDialog
        admin={false}
        onComplete={onNewEntry}
        open={entryDialogOpen}
        createForm={true}
        onClose={() => setEntryDialogOpen(false)}
      />
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
            {`Daily Threshold: ${dailyThreshold} Calories`}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button
            className="button"
            onClick={addEntry}
            variant="contained"
            endIcon={<AddIcon />}
          >
            Add Entry
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {`All Food Entries`}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <CustomDateRange onSearch={onSearch} />
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
            {`Daily Summary`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CustomGrid
            rowData={aggEntries}
            columnDefs={aggEntriesColumnDef}
            filers={false}
          />
        </Grid>
      </Grid>
    </div>
  );
}
