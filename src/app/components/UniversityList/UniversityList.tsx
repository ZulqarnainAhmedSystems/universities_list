"use client";
import { University } from "@/app/models/University";
import React, { useEffect, useState, useMemo } from "react";
import Table from "./Childs/Table";
import { countries } from "../../data/countryList";

import { type MRT_ColumnDef } from "material-react-table";
import { TextField, Autocomplete, Box } from "@mui/material";

export default function UniversityList() {
  const [country, setCountry] = useState<CountryType | null>();
  const [data, setData] = useState<University[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const columns = useMemo<MRT_ColumnDef<University>[]>(
    () => [
      {
        accessorKey: "name",
        header: "University Name",
        size: 150,
      },
      {
        accessorKey: "country",
        header: "Country",
        size: 150,
      },
      {
        accessorKey: "state-province",
        header: "State/Province",
        size: 200,
      },
      {
        accessorKey: "alpha_two_code",
        header: "Alpha Two Code",
        size: 150,
      },
      {
        accessorKey: "web_pages",
        header: "Web Pages",
        size: 150,
      },
      {
        accessorKey: "domains",
        header: "Domains",
        size: 150,
      },
    ],
    []
  );

  useEffect(() => {
    const fetchUniversityData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://universities.hipolabs.com/search?country=${country?.label}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching university data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (country !== undefined) fetchUniversityData();
  }, [country]);

  return (
    <Box sx={{ p: 5, background: "white" }}>
      <Autocomplete
        id="country-select-demo"
        sx={{ width: 300, mb: 2 }}
        options={countries}
        autoHighlight
        getOptionLabel={(option) => option.label}
        onChange={(event: any, newValue: CountryType | null) => {
          setCountry(newValue);
        }}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            {option.label}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a country"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
      <Table columns={columns} data={data} loading={loading} />
    </Box>
  );
}
