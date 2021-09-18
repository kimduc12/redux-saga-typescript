import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import { Search } from '@material-ui/icons';
import { ChangeEvent } from 'hoist-non-react-statics/node_modules/@types/react';
import { City, ListParams } from 'models';
import React, { useRef } from 'react';

interface StudentFiltersProps {
    filter: ListParams;
    cityList: City[];
    onChange?: (newFilter: ListParams) => void;
    onSearchChange?: (newFilter: ListParams) => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2),
    },
    margin: {},
    withoutLabel: {},
    textField: {},
    formControl: {},
}));

export default function StudentFilters({ filter, cityList, onChange, onSearchChange }: StudentFiltersProps) {
    const searchRef = useRef<HTMLInputElement>();
    const classes = useStyles();

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!onSearchChange) return;

        onSearchChange({
            ...filter,
            _page: 1,
            name_like: e.target.value,
        });
    };

    const handleCityChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
        if (!onChange) return;

        onChange({
            ...filter,
            _page: 1,
            city: e.target.value || undefined,
        });
    };

    const handleSortChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
        if (!onChange) return;
        const value = e.target.value;
        const [_sort, _order] = (value as string).split('.');
        onChange({
            ...filter,
            _sort: _sort || undefined,
            _order: (_order as 'asc' | 'desc') || undefined,
        });
    };

    const handleClearFilter = () => {
        if (!onChange) return;
        onChange({
            ...filter,
            name_like: '',
            city: undefined,
            _sort: undefined,
            _order: undefined,
        });

        if (searchRef.current) {
            searchRef.current.value = '';
        }
    };

    return (
        <Box className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth className={classes.margin} variant="outlined" size="small">
                        <InputLabel htmlFor="searchByName">Search by name</InputLabel>
                        <OutlinedInput
                            id="searchByName"
                            endAdornment={<Search />}
                            labelWidth={60}
                            label="Search by name"
                            onChange={handleSearchChange}
                            inputRef={searchRef}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <FormControl variant="outlined" className={classes.formControl} fullWidth size="small">
                        <InputLabel id="filterByCity">Filter By City</InputLabel>
                        <Select
                            labelId="filterByCity"
                            onChange={handleCityChange}
                            label="Filter By City"
                            value={filter.city || ''}
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            {cityList.map((city) => (
                                <MenuItem key={city.code} value={city.code}>
                                    {city.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={2}>
                    <FormControl variant="outlined" className={classes.formControl} fullWidth size="small">
                        <InputLabel id="sortBy">Sort by</InputLabel>
                        <Select
                            labelId="sortBy"
                            onChange={handleSortChange}
                            label="Sort By"
                            value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
                        >
                            <MenuItem value="">
                                <em>No sort</em>
                            </MenuItem>
                            <MenuItem value="name.asc">Name ASC</MenuItem>
                            <MenuItem value="name.desc">Name DESC</MenuItem>
                            <MenuItem value="mark.asc">Mark ASC</MenuItem>
                            <MenuItem value="mark.desc">Mark DESC</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={1}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleClearFilter}>
                        Clear
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
