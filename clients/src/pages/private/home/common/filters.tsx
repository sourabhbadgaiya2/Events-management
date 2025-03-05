import { Form, Input, Button, DatePicker } from "antd";
import type { Dayjs } from "dayjs";

interface FilterState {
  searchText: string;
  date: string;
}

interface FiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onFilter: (filters: FilterState) => void;
}

const Filters: React.FC<FiltersProps> = ({
  filters,
  setFilters,
  onFilter,
}: {
  filters: any;
  setFilters: any;
  onFilter(filters: any): void;
}) => {
  return (
    <Form layout='vertical' className='grid grid-cols-3 gap-5 items-center'>
      <Form.Item label='Event Name'>
        <Input
          value={filters.searchText}
          onChange={(e) =>
            setFilters({ ...filters, searchText: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item label='Date'>
        <Input
          type='date'
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
      </Form.Item>

      <div className='flex mt-1 gap-3'>
        <Button
          onClick={() => {
            setFilters({ searchText: "", date: "" });
            onFilter({ searchText: "", date: "" });
          }}
        >
          Clear Filters
        </Button>
        <Button
          type='primary'
          disabled={!filters.searchText && !filters.date}
          onClick={() => onFilter(filters)}
        >
          Apply Filters
        </Button>
      </div>
    </Form>
  );
};

export default Filters;
