import { Paper, Text, Table, Stack } from "@mantine/core";
import { TimesFactory } from "../services/TimesFactory";

export function TimeListComponent() {
  const timesService = TimesFactory.getTimesService();
  const times = timesService.getTimes();

  const formatTime = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const rows = times.map((time) => (
    <Table.Tr key={time.id}>
      <Table.Td>{time.id}</Table.Td>
      <Table.Td>{formatTime(time.totalTime)}</Table.Td>
    </Table.Tr>
  ));

  const totalSum = times.reduce((acc, time) => acc + time.totalTime, 0);

  return (
    <Paper p="xl" withBorder>
      <Stack>
        <Text fw={700}>Recorded Times</Text>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Time</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <Text fw={700} mt="md">
          Total Time: {formatTime(totalSum)}
        </Text>
      </Stack>
    </Paper>
  );
}
