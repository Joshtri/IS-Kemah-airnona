import React, { useMemo, useState } from "react";
import { useApiUrl, useCustom, useTranslate } from "@refinedev/core";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { RefineListView } from "../../components";

type DateFilter = "lastWeek" | "lastMonth";

const DATE_FILTERS: Record<
  DateFilter,
  {
    text: string;
    value: DateFilter;
  }
> = {
  lastWeek: {
    text: "Last Week",
    value: "lastWeek",
  },
  lastMonth: {
    text: "Last Month",
    value: "lastMonth",
  },
};

export const DashboardPage: React.FC = () => {
  const t = useTranslate();
  const API_URL = useApiUrl();

  const [selectedDateFilter, setSelectedDateFilter] = useState<DateFilter>(
    DATE_FILTERS.lastWeek.value,
  );

  const dateFilterQuery = useMemo(() => {
    const now = dayjs();
    switch (selectedDateFilter) {
      case "lastWeek":
        return {
          start: now.subtract(6, "days").startOf("day").format(),
          end: now.endOf("day").format(),
        };
      case "lastMonth":
        return {
          start: now.subtract(1, "month").startOf("day").format(),
          end: now.endOf("day").format(),
        };
      default:
        return {
          start: now.subtract(7, "days").startOf("day").format(),
          end: now.endOf("day").format(),
        };
    }
  }, [selectedDateFilter]);

  return (
    <RefineListView title={t("dashboard.title", "Dashboard")}
      headerButtons={() => (
        <Select
          size="small"
          value={selectedDateFilter}
          onChange={(e) => setSelectedDateFilter(e.target.value as DateFilter)}
          sx={{
            width: "160px",
            backgroundColor: (theme) => theme.palette.background.paper,
            borderRadius: "8px",
          }}
        >
          {Object.values(DATE_FILTERS).map((filter) => (
            <MenuItem key={filter.value} value={filter.value}>
              <Typography color="text.secondary" lineHeight="24px">
                {t(`dashboard.filter.date.${filter.text}`, filter.text)}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      )}
    >
      <Grid container spacing={3}>
        {/* Card Jumlah Jemaat Baru */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            elevation={4}
            sx={{
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardHeader
              avatar={
                <Box
                  sx={{
                    backgroundColor: "primary.main",
                    borderRadius: "50%",
                    padding: "8px",
                  }}
                >
                  <AccountCircleOutlinedIcon
                    fontSize="large"
                    sx={{ color: "white" }}
                  />
                </Box>
              }
              title={
                <Typography variant="h6" fontWeight="bold">
                  {t("dashboard.jumlahJemaatBaru.title", "Jumlah Jemaat Baru")}
                </Typography>
              }
            />
            <CardContent>
              <Typography variant="h4" fontWeight="bold" color="primary">
                150
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("dashboard.jumlahJemaatBaru.description", "Penambahan minggu ini")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card Jumlah Kegiatan Jemaat */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            elevation={4}
            sx={{
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardHeader
              avatar={
                <Box
                  sx={{
                    backgroundColor: "secondary.main",
                    borderRadius: "50%",
                    padding: "8px",
                  }}
                >
                  <WatchLaterOutlinedIcon
                    fontSize="large"
                    sx={{ color: "white" }}
                  />
                </Box>
              }
              title={
                <Typography variant="h6" fontWeight="bold">
                  {t("dashboard.jumlahKegiatanJemaat.title", "Jumlah Kegiatan")}
                </Typography>
              }
            />
            <CardContent>
              <Typography variant="h4" fontWeight="bold" color="secondary">
                12
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("dashboard.jumlahKegiatanJemaat.description", "Kegiatan minggu ini")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card Daftar Jemaat Terbaru */}
        <Grid item xs={12} md={8}>
          <Card
            elevation={4}
            sx={{
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardHeader
              avatar={
                <Box
                  sx={{
                    backgroundColor: "success.main",
                    borderRadius: "50%",
                    padding: "8px",
                  }}
                >
                  <TrendingUpIcon fontSize="large" sx={{ color: "white" }} />
                </Box>
              }
              title={
                <Typography variant="h6" fontWeight="bold">
                  {t("dashboard.daftarJemaatTerbaru.title", "Daftar Jemaat Terbaru")}
                </Typography>
              }
            />
            <CardContent>
              <Typography variant="body1" color="text.secondary">
                {t(
                  "dashboard.daftarJemaatTerbaru.description",
                  "Berikut daftar jemaat baru yang bergabung dalam beberapa hari terakhir."
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </RefineListView>
  );
};
