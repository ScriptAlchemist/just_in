import { format, parseISO } from "date-fns";

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  return (
    <time
      dateTime={dateString}
      className="text-[hsl(var(--foreground))]"
    >
      {format(date, "LLLL d, yyyy")}
    </time>
  );
};

export default DateFormatter;
