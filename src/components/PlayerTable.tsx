'use client';

import { DataTable, type DataTableSortStatus, useDataTableColumns } from 'mantine-datatable';
import { PitchInfo, usePitches } from '@/src/hooks/usePitches';
import { useEffect, useState } from 'react';
import { IconChevronUp, IconSelector } from '@tabler/icons-react';
import sortBy from 'lodash/sortby';
import { Box, Button, Group } from '@mantine/core';

const columnsData = [
  { accessor: 'pitch_type', title: 'Pitch Type', width: 110, sortable: true },
  { accessor: 'number_of_pitches', title: 'Number of Pitches', sortable: true, draggable: true },
  {
    accessor: 'pitch_usage_percentage',
    title: 'Pitch Usage Percentage',
    sortable: true,
    draggable: true,
  },
  { accessor: 'average_speed', title: 'Average Pitch Speed', sortable: true, draggable: true },
  {
    accessor: 'average_horizontal_break',
    title: 'Average Horizontal Break',
    sortable: true,
    draggable: true,
  },
  {
    accessor: 'average_vertical_break',
    title: 'Average Induced Vertical Break',
    sortable: true,
    draggable: true,
  },
  { accessor: 'average_spin_rate', title: 'Average Spin Rate', sortable: true, draggable: true },
  {
    accessor: 'average_exit_speed',
    title: 'Average Hit Exit Speed',
    sortable: true,
    draggable: true,
  },
  {
    accessor: 'average_launch_angle',
    title: 'Average Hit Launch Angle',
    sortable: true,
    draggable: true,
  },
];

interface PlayerTableProps {
  playerId: number | null;
}

export default function PlayerTable({ playerId }: PlayerTableProps) {
  const key = 'draggable';
  const { pitchData, isLoading, error } = usePitches(playerId);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'number_of_pitches',
    direction: 'desc',
  });
  const [records, setRecords] = useState<PitchInfo[]>([]);

  useEffect(() => {
    if (pitchData) {
      let sortedData = sortBy(pitchData, [sortStatus.columnAccessor]);
      if (sortStatus.direction === 'desc') {
        sortedData = sortedData.reverse();
      }
      setRecords(sortedData);
    }
  }, [pitchData, sortStatus]);

  if (error) return <div>Error: {error}</div>;

  const { effectiveColumns, resetColumnsOrder } = useDataTableColumns<Record<string, unknown>>({
    key,
    columns: columnsData,
  });

  return (
    <Box mx={50}>
      <DataTable
        minHeight={150}
        withTableBorder
        borderRadius="sm"
        shadow="md"
        withRowBorders={false}
        withColumnBorders
        striped
        highlightOnHover
        verticalSpacing="xs"
        verticalAlign="center"
        storeColumnsKey={key}
        columns={effectiveColumns}
        records={records as unknown as Record<string, unknown>[]}
        noRecordsText="No records to show"
        fetching={isLoading}
        loaderSize="md"
        loaderBackgroundBlur={3}
        idAccessor="pitch_type"
        scrollAreaProps={{ type: 'always', offsetScrollbars: true, scrollbarSize: '9' }}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        sortIcons={{
          sorted: <IconChevronUp size={14} />,
          unsorted: <IconSelector size={14} />,
        }}
      />
      <Group justify="right">
        <Button onClick={resetColumnsOrder}>Reset Column Order</Button>
      </Group>
    </Box>
  );
}
