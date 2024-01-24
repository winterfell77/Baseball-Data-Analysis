'use client';

import {DataTable, type DataTableSortStatus} from 'mantine-datatable';
import {PitchInfo, usePitches} from '@/src/hooks/usePitches';
import { useEffect, useState } from 'react';
import { IconChevronUp, IconSelector } from '@tabler/icons-react';
import sortBy from 'lodash/sortby';


const columnsData = [
  { accessor: 'pitch_type', title: 'Pitch Type', width: 110, sortable: true },
  { accessor: 'number_of_pitches', title: 'Number of Pitches', sortable: true },
  { accessor: 'pitch_usage_percentage', title: 'Pitch Usage Percentage', sortable: true },
  { accessor: 'average_speed', title: 'Average Pitch Speed', sortable: true },
  { accessor: 'average_horizontal_break', title: 'Average Horizontal Break', sortable: true },
  { accessor: 'average_vertical_break', title: 'Average Induced Vertical Break', sortable: true },
  { accessor: 'average_spin_rate', title: 'Average Spin Rate', sortable: true },
  { accessor: 'average_exit_speed', title: 'Average Hit Exit Speed', sortable: true },
  { accessor: 'average_launch_angle', title: 'Average Hit Launch Angle', sortable: true },
];

export default function PlayerTable() {
    const { pitchData, isLoading, error } = usePitches(543037);
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


  return (
    <div>
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
        columns={columnsData.map((column) => ({ ...column }))}
        records={records as unknown as Record<string, unknown>[]}
        noRecordsText="No records to show"
        fetching={isLoading}
        loaderSize="md"
        loaderBackgroundBlur={3}
        idAccessor="pitch_type"
        scrollAreaProps={{ type: 'always', offsetScrollbars: true }}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        sortIcons={{
          sorted: <IconChevronUp size={14} />,
          unsorted: <IconSelector size={14} />,
        }}
      />
    </div>
  );
}
